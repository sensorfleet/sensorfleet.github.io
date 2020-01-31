---
layout: post
title: Our approach
date: 2020-01-31
author: sami
---

Our team has long experience on developing network security sensor technology
for a national Security Operations Centre protecting the critical infrastructure
in Finland. At the inception of SensorFleet, we set out to re-imagine network
level detection and solve the pain points we had observed over the years.

The key issue we wanted to resolve was a difficulty of deploying new detection
and protection tools and limited extension options for the end users. Answer to
that one was simple enough: We decided to develop SensorFleet as an open sensor
platform that can incorporate detection-, protection- and scanning tools (that
we call instruments) from 3rd parties, whether commercial, open source or
inhouse developed. There were, after all, plenty of examples on power of
ecosystems enabling end users to flexibly deploy tools - or applications,
plugins etc. - based on their evolving requirements. The best known being the
application ecosystems that enabled smartphones to become ubiquitous devices
they are today.

Openness is reflected on the other fundamental design decisions of SensorFleet:
We won’t appropriate your data, you will have a full visibility on sensor
communication and transparency on what instruments do. More on our approach with
these areas below:

## Data

We won’t ask for your network data in exchange for providing the security
solution for you. While aspects of data sharing, such as IoC’s, are undeniably
beneficial for ecosystem at large, we believe that requirement for any sharing
should be transparent, clearly defined and limited to value add services that
inherently depend on sharing. Another aspect is that the unnecessary copies of
the data increase exposure. Therefore our preferred approach is a large network
of lightweight sensors placed into network locations where data is being
produced, instead of a single large number cruncher. Rather than raking
everything into a huge haystack and then looking for a needle, look for a needle
from smaller bales. Just to be clear, there are legitimate reasons for
collecting and storing the network data and that’s supported by SensorFleet,
just not the default mode on which overall functionality of sensor network
depends.

## Sensor communication

Many technically oriented people are familiar with a startling feeling of
observing number of connections, both inbound and outbound, that the modern
applications and devices create. Since a sealed box wouldn’t be a very efficient
sensor, SensorFleet will also need to communicate with outside world. What we
strive for is to be clear on what each of the interfaces and connections are
used for. This enables users to audit sensor and instruments based on security
policies of network segments they’re protecting.

## Instruments

Smartphones have made it easy for us to get the tooling we need in different
situations. Visit to a new city starts with installing an application for local
transport, new home appliance installation comes with remote control application
and so forth. SensorFleet has been designed with the same principle in mind,
making it easy to add and remove instruments as the monitoring requirements
evolve. Maybe, for example, your day-to-day use case involves asset tracking or
threat detection with the IDS, but when a new vulnerability emerges, you’d need
to run vulnerability scanning within the perimeter of network segments you
operate. Having SensorFleet platform in those segments enables you to quickly
run a vulnerability scanner as an instrument without extra network configuration
changes or manual work for retrieving the results.
