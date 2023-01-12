---
layout: post
author: esa
tag: Product news
og_image: /img/posts/cluster-support-to-zeek-instrument/zeek-cluster-support.png
title: Cluster support to Zeek Instrument
description:
  "Zeek is a great tool for analyzing network traffic for cyber security
  monitoring. Lately, it has been gaining more and more traction: Zeek is now a
  component of both Microsoft Windows and Defender for Endpoint. We at
  SensorFleet have seen an increased adoption at our customer base and developed
  support to run Zeek in a cluster mode for high bandwidth requirements."

excerpt:
  "Zeek is a great tool for analyzing network traffic for cyber security
  monitoring. We at SensorFleet have seen an increased adoption at our customer
  base and developed support to run Zeek in a cluster mode for high bandwidth
  requirements."
---

Zeek is a great tool for analyzing network traffic for cyber security
monitoring. Lately, it has been gaining more and more traction: Zeek is now a
component of both Microsoft Windows and Defender for Endpoint. We at SensorFleet
have seen an increased adoption at our customer base and developed support to
run Zeek in a cluster mode for high bandwidth requirements.

Zeek’s raw processing power in traditional mode is limited by the speed of a
single CPU core. Depending on the bandwidth of the processed traffic and the CPU
architecture of the hardware running SensorFleet software stack, this may or may
not be enough to reliably process all captured packets. Cluster mode bypasses
this limitation by running multiple Zeek worker processes or nodes, and dividing
network traffic between them. In our upcoming 2.5 release this is done as easily
as just setting the number of desired workers and Instrument takes care of
generating required configuration and spinning up the cluster inside the
Instrument container.

Our tests showed that with six worker nodes performance is about five times
higher compared to the single worker, and with 12 workers respectively about 9
times better. Such a high bandwidth processing of course generates load to the
other components as well, like Zeek cluster’s logger process and Instrument’s
event processor. As a conservative estimate, SensorFleet Sensor on hardware with
a 16-core CPU and reasonable amount of RAM can process about ten times higher
bandwidth than Zeek in non-cluster mode.

Clustering support enables ease of use for Zeek even in demanding high-bandwidth
networks. When used together with the Windows- integrated end-point Zeek
instances, customers will get an unparalleled visibility on network and security
events. Multi-layered event collection also makes it harder for an attacker to
stay hidden by disabling the logging. Pretty neat!
