---
layout: post
author: jtt
---

SensorFleet Sensor can contain multiple Instruments. One of the primary design
goals for Sensor was to keep Instruments separated. This means that while
allowing the Instruments to interconnect with each other when necessary,
Instruments should not be able to interfere with each other or with the Sensor
platform itself.

Furthermore, Instruments should have as little access to network as is necessary
for them to function. For example, passive Instruments should only be able to
receive network traffic, they should not be able to send any packets to the
protected network.

Instruments should be able to store persistent data on Sensor platform, but they
should not be able to access data stored by other Instruments or any data of the
Sensor itself.

While isolated, the Instruments should still be able to provide user interface
or API endpoints using HTTP. These should be available through Fleet Management
UI.

In the next chapters we'll go through how this isolation has been implemented in
SensorFleet Sensor platform.

## Instruments within Sensor

The whole idea of having a common Sensor platform is to be able to run multiple
Instruments within same Sensor. These Instruments can do a multiple different
tasks from running a honeypot to hosting an IDS to check internet traffic.

For Sensor operation it is vital to keep Instruments contained and not allow
them to interfere with each other or the Sensor itself. This way, a
malfunctioning Instrument can not bring down the whole platform and/or other
Instruments running on it. Also, if there is a security breach in one of the
Instruments, the attacker should be contained in the affected Instrument and
will not be able to cause harm to other Instruments or to the platform.

### Containers

The primary way to separate Instruments is to run them in different containers.
SensorFleet platform uses `lxd` (https://linuxcontainers.org/lxd/introduction/)
containers, each Instrument is run on its own lxd container. This will separate
the processes run for each instrument from other Instruments, while all are
still running on the same Operating System kernel. Containers are more
lightweight than virtual machines, while still providing the separation for
processes and network that is needed by the Sensor to securely run multiple
Instruments. Within Instrument containers we are running tasks with as little
privileges as possible to function.

When designing Instruments for SensorFleet use, we keep the Instruments as
simple as possible. For example, we use the `Alpine Linux`
(https://alpinelinux.org/) as base image for Instruments as it has a small
footprint and does not contain any unnecessary services running by default. This
allows us to build the Instruments to contain only necessary components and will
make it easier to verify the Instruments operation.

### Network interfaces

Instruments have different kinds of networking requirements. Some instruments,
like IDS or Netflow need to be able to read network traffic, but do not need to
send data. This kind of instruments are called passive and can be configured to
have `mirror-bridge` network interface which will only receive mirrored traffic
from the actual physical interface (see Helper Instruments for further
information). This will allow to keep passive Instruments from sending traffic
to (possibly critical network segments) they are monitoring in case of
malfunction or attacker getting access to the Instrument.

For Instruments requiring network access, like honeypot Instrument, user can
either dedicate physical network interface available on platform or create
bridged interface to physical interface shared with multiple Instruments. This
allows the user to control which network segments Instruments have access to and
the degree of access.

Further, if Instrument needs to periodically download resources from remote
location (IDS rules, for example), but does not need read-write access to
network otherwise, the Sensor platform provides dedicated Instrument which can
be used to download the resources (see Helper Instruments for further details).
This is done to allow instrument only the minimum network access they really
need for their core operation.

### Filesystems

Instruments normally need to store data during their operation. Sensor platform
provides instruments with two different filesystem stores, transient and
persistent. Neither of these filesystems can be accessed by other instruments,
disallowing other Instruments from reading the possibly sensitive information
stored. The filesystems are encrypted [FIXME: elaborate] at rest.

Each instrument has its own time-based retention policy and is responsible for
deleting any data that is older than set retention policy. [FIXME: do we have
quotas for persistent/transient storage so that one instrument can not fill the
disk for everybody else].

#### Transient data

Transient storage is initialized when Instrument is started and deleted when
Instrument is stopped or removed and, like the name suggests, can be used by the
Instrument to store runtime data that does not need to be stored after
Instrument is no longer running.

#### Persistent data

Persistent data can be used by the Instrument to store databases or any other
artifacts created by the Instrument operation. This data is kept after
instrument has stopped running. Each Instrument is required to make sure
persistent data does not contain data older than set by its data retention
policy.

### Instrument interconnections

Since Instruments can not connect with each other using network or shared
filesystem, the platform provides Instruments a communication bus where they can
either produce direct messages to each other or provide events which other
Instruments can act upon or augment further.

Using this message bus it is further possible to create manager instruments
which can operate, or command, other Instruments. One example of this is to have
Instrument which can create rules for IDS. The IDS Instrument itself does not
need to have all the application logic or UI to allow creation of IDS rules, the
Rule Manager [FIXME: is this how we call it] can handle that and use the message
bus to send rulesets to the IDS.

#### Messages

Messages are either sent from the Sensor platform or other Instrument to one
Instrument to command or configure it. Messages are only seen by the intended
recipient and permissions can be configured to specifically allow messaging
between intended Instruments.

#### Events

Instruments can also provide events to indicate some action has occurred. Some
of these events are directly aimed for users (IDS alerts, for example), but some
events are aimed for other Instruments to trigger some action.

For example, using DNS events produced by IDS instrument whenever name
resolution is detected in protected network allows Passive DNS Instrument to
collect passive DNS database without actually needing access to network or do
any of the complex DNS message parsing itself.

### Helper Instruments

Sensor provides some Instruments whose purpose is to provide operations for
other Instruments. These Instruments allow to reduce privileges from Instruments
doing network packet analysis or other parsing of non-trusted data.

#### Downloader

Downloader Instrument can be configured to periodically download resources from
network. The download operation is isolated to single Instrument which will need
access to network. This network can then be isolated from the actual protected
network. Using downloader allows to download IDS rule updates from providers
periodically, but the actual IDS Instrument or even the rule manager does not
need to have write access to network.

Furthermore, this also reduces code duplication since the download functionality
does not need to be implemented on all the Instruments.

Downloader instrument will download resources to its persistent storage and then
uses Sensor platform services to distribute the data to other Instruments. This
way, the downloader Instrument itself does not need access to other Instruments
filesystems making sure compromising downloader still does not provide access
data of other Instruments running on platform.

#### Capco

Capco provides network packet access to passive Instruments. Any Instrument
doing packet analysis can be configured with a read-only bridge interface to
which Capco Instrument then mirrors packets from actual physical interface
connected to protected network.

Capco Instrument is designed to be efficient in copying and does not do any
packet analysis itself, reducing the attack surface as the packet analysis is
normally the crucial part and should be run with as low priorities as possible.

### Instrument UI

Some instruments can provide their own UI or HTTP API for users. This access is
provided Sensor UI and can not be accessed directly through other channels. All
HTTP access is reverse proxied by Sensor UI and thus can be access-controlled on
Sensor if needed. This allows the Sensor platform have a single point through
which all user interfaces and APIs are accessed.
