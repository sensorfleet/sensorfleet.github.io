---
layout: post
author: sami
title: Quick start for network security monitoring
og_image: /img/posts/quick-start-for-monitoring/quickstart.png
tag: Blog post
description:
  "Starting a network security monitoring project from scratch, or augmenting
  the existing solutions, can be a daunting task. Common questions include
  setting the monitoring objectives, selecting the monitoring tools for the
  task, planning and resourcing the deployment, and last but not least: What to
  do with the results."
excerpt:
  "Starting a network security monitoring project from scratch, or augmenting
  the existing solutions, can be a daunting task. Common questions include
  setting the monitoring objectives, selecting the monitoring tools for the
  task, planning and resourcing the deployment, and last but not least: What to
  do with the results."
---

Starting a network security monitoring project from scratch, or augmenting the
existing solutions, can be a daunting task. Common questions include setting the
monitoring objectives, selecting the monitoring tools for the task, planning and
resourcing the deployment, and last but not least: What to do with the results.

SensorFleet solution provides a comprehensive toolbox for security monitoring.
That ticks an important box on our list above: One can combine multiple
monitoring tools on a single platform and flexibly deploy new tools, or retire
old ones. To tick the rest of boxes, we have launched a service that provides
three pre-packaged sensor configurations and 6-month full service for the use
cases.

With a 6-month quick-start network monitoring service, customers can choose one
or more Sensor packages to meet their monitoring objectives. SensorFleet will
either help with the deployment, or take care of it altogether, depending on
customer preferences. We will host the results collection back-end for you,
including the Fleet Management, interfaced with the Azure Sentinel as a SIEM.
Service includes a weekly review and report of the events and alerts by
SensorFleet security experts.

## Hosted Security Monitoring Service

Hosted service combines a dashboard for managing the detection capabilities,
collecting and analyzing the results and reporting the findings to the customer.
SensorFleet security experts will take care of operating the service and
reporting the findings, but an access to Fleet Management and SIEM is also
available for the customer. Contents of the service:

- Hosted Fleet Management and Azure Sentinel as a SIEM.
- Weekly analysis and reports on the findings with the recommendations on
  remediation.
- E-mail alerts to the customer about the critical events (optional).

## Sensor Packages

Sensor packages come in three different configurations to cover the common
network security monitoring objectives.

### Package 1 - Server networks integrity

A low-noise sensor configuration suitable for the server networks, DMZ and
similar environments where the network assets are relatively fixed. Sensor
requires only a regular access port for the monitored network. Included
Instruments:

- **[Honeypot](/instruments/cowrie/)** - Detect lateral movement and unexpected
  SSH/Telnet login attempts.
- **[PortDiff](/instruments/portdiff/)** - Periodic and automated port scanning
  to detect unexpected services, such as IRC, SSH, Telnet etc.

### Package 2 - Industrial Internet integrity

Passive sensor configuration suitable for the Industrial Internet / Operational
Technology networks. Traffic mirroring to sensor is recommended for the optimal
detection accuracy, but regular access port can also be used. Capabilities:

- **[Asset Guard](/instruments/assetguard/)** - Automated inventory of the
  network's assets and alerting about the unexpected assets entering the
  network. Connections inventory and alerting also available for the restricted
  networks.

### Package 3 - Network Based Attack Detection

Passive sensor configuration suitable for any type of network. Attack detection
is based on the IDS technology and curated IoC’s for low noise on the alerts.
Traffic mirroring to sensor is required. Capabilities:

- **[Suricata IDS](/instruments/suricata/)** - Widely used IDS engine with
  curated IoC feed for detecting the malicious activity, such as Command and
  Control connections, in the network.
- **[NetFlow](/instruments/netflow/)** - Collection of the NetFlow data for the
  further investigation of the alerts.

## After the quick-start service

A typical duration of the quick-start service is six months. After that,
customers can make informed decisions on their network security monitoring
strategy, development and whether to run security operations in-house or
outsource them to a service provider. If the customer chooses to continue with
the SensorFleet solution, we will migrate the results collection backend to the
customer's own environment, to their preferred service provider, or refer the
customer to our service partners. Naturally, based upon a joint review with the
customer, we will also be happy to consult in expanding the quick-start sensor
packages with more of our [Instruments](/instruments/) as appropriate.
