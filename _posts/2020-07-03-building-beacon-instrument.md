---
layout: post
author: jtt
og_image: /img/posts/building-beacon-instrument/building-beacon-instrument.png
tag: Blog post
description:
  SensorFleet Platform provides an easy way to deploy Beacons without the need
  to add new machines to the network.
excerpt:
  Across the hall from SensorFleet office is another cyber security startup,
  SensorFu, and they have an awesome product called Beacon. Beacon is deployed
  inside an isolated network segment and it continuously tries to escape out
  from it. A successful escape is an indication of misconfiguration or malice
  and getting alert as soon as possible helps the network owner find the leak
  and fix it.
---

## Introduction

Across the hall from SensorFleet office is another cyber security startup,
[SensorFu](https://www.sensorfu.com/), and they have an awesome product called
Beacon. Beacon is deployed inside an isolated network segment and it
continuously tries to escape out from it. A successful escape is an indication
of misconfiguration or malice and getting alert as soon as possible helps the
network owner find the leak and fix it.

After a while it became obvious that implementing SensorFleet Instrument which
runs Beacon would benefit both companies. SensorFleet Sensors would provide an
easy way to deploy Beacons without the need to add new machines (virtual or
real) to the network. SensorFleet platform would allow easy configuration and
monitoring of running Beacons.

## Instrument

SensorFleet Instrument is an isolated execution environment which allows one to
run, for example, IDS software with the capabilities it needs to function (see
[Keeping your security monitoring tools and tasks safely
separated]({% post_url 2020-03-03-keeping-your-security-monitoring-tools-and-tasks-safely-separated %})
blog post for details.)

SensorFleet platform provides following capabilities for Instruments:

- **Execution.** As instruments are lxd containers, the Platform takes care of
  managing the lifetime of Instruments.
- **Network interfaces**. These can be configured from Fleet Management and are
  provided to the Instrument.
- **Messaging.** Instruments can use SensorFleet messaging to send and receive
  messages to other Instruments and to send Events containing alerts or other
  information of value to other Instruments or end users.
- **Configuration.** SensorFleet platform provides unified configuration for
  Instruments through Fleet Management. Platform takes care of versioning and
  storing the configuration.
- **Storage.** Platform provides Instruments with persistent and transient
  storage which the Instrument can use, for example, for storing databases and
  such. Platform also enforces time-based **retention** policies by commanding
  Instruments to remove data older than given retention period.
- **Health checks**. Platform will query the Instrument periodically to check
  its status. This status is shown to user on Fleet Management UI.

A skeleton Instrument needs to implement message handlers for retention and
health checks and configuration updates in addition to the actual Instrument
logic. The Instrument is then packaged into an Alpine Linux -based container.
This container is run by the Sensor platform.

More complex Instruments can use the platform to communicate with other
Instruments, or listen for events from other Instruments and act on them.
Instrument architecture allows to build functionality around existing software,
integrating for example open source components to SensorFleet platform.

![Instrument architecture](/img/posts/instrument-architecture.png)

## Implementing Beacon Instrument

Beacon is wonderfully simple software. It only needs to know the name of the
interface it is supposed to use. Thus the design of Beacon Instrument is pretty
easy: On startup, read configuration and ensure network interface is available.
Then start the Beacon application.

For health checks, we need to be able to determine that the Beacon is running
and, in addition to merely running, actually _doing_ something. Luckily the
Beacon will print a line of information every time it tries an escape. Thus, the
Instrument can monitor the Beacon by checking that it prints out information
periodically.

Beacon does not need any local storage, thus there is no need to implement any
data retention checks.

Furthermore, Beacon binary is self-contained static binary and requires no
external libraries or other dependencies. This makes it easy to run it on Alpine
-based containers.

## Providing updates for Beacon binary

SensorFu provides updates for Beacon binary through their home portal. Since
SensorFleet Sensor platform provides Downloader Instrument for downloading
resources from the Internet, it was easy to use it to update Beacon binary.

User can configure Beacon Instrument to request periodic checks for updates to
Beacon binary and the platform will download updated binaries automatically. If
Beacon binary has changed, the Instrument will restart to use the latest binary.
This allows user to deploy multiple Beacons without the need to worry about
updating them manually.
