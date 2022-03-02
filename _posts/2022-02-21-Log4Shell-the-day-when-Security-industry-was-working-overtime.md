---
layout: post
author: keitsi
og_image: /img/posts/log4shell/logo.png
tag: Blog post
description:
  This blog is about the series of Log4Shell vulnerabilities, how they affected
  our software development and how we helped our customer to validate their
  networks. I hope this blog will give the reader an insider view of what it is
  actually like to patch and detect those vulnerabilities.
title:
  Log4Shell Vulnerability - the day when security industry was working overtime
excerpt:
  This blog is about the series of Log4Shell vulnerabilities, how they affected
  our software development and how we helped our customer to validate their
  networks. I hope this blog will give the reader an insider view of what it is
  actually like to patch and detect those vulnerabilities.
---

This blog is about the series of Log4shell vulnerabilities best known as
CVE-2021-44832, how they affected our software development and how we helped our
customer to check their networks. I hope this blog will give the reader an
insider view of what it is actually like to patch and detect those
vulnerabilities.

## Discovery and initial analysis

The vulnerability was publicly reported on December 9th, 2021. We learned about
it on December 10th, and began research and mitigations. We found out that two
components on our software stack used in our products might be vulnerable,
namely: Log Forwarder Instrument that uses 3rd party software called Logstash
Recorder Instrument that uses 3rd party software called ElasticSearch

Luckily our security architecture prevents elevating permissions from a
compromised component to the host OS level on a Sensor that runs the component
inside an instrument container. However, a typical configuration of Log
Forwarder Instrument involves giving it access to create network connections in
order to send events to external SIEM. We believed that Logstash was the more
likely component to be exploitable in the wild and gave it higher priority.
Successful exploitation of the Recorder Instrument seemed less likely at that
point, so we decided to patch it after the Log Forwarder.

In addition to our software stack using vulnerable components, our products are
used by Security Operation Centers (SOCs). In particular, they run Sensor
networks that are used to detect attacks, like the ones that exploit the
Log4Shell vulnerability.

So our work begun on two tracks:

- Patching our software to mitigate any Log4Shell vulnerabilities
- Detecting exploitation of Log4Shell and vulnerable hosts in the customer
  networks

## Patching internal components

### Logstash

Logstash is the main 3rd party component of the Log Forwarder Instrument.
Logstash is written with Java and contains a vulnerable component. At first,
there were no patches available. Then Logstash 2.16.1 appeared without any
release notes. I’m guessing they were also quite busy. :)

I looked at 2.16.1 contents and figured they upgraded to log4j 2.15.0. We
patched to Logstash 2.16.1 and started release tests. After backporting the
patch to our current stable software release, we deployed to all installations
we had access to and notified customers to update to the latest version.

SensorFleet software release 2.13.11 with the fix was released on December
14th, 2021.

### Logstash… again

Word got around that log4j 2.15.0 wouldn’t be good enough. We saw Elastic’s
announcement, and although it seemed Logstash should be fine, we wanted to patch
it just in case. We removed the vulnerable JndiLookup.class from the log4j jar
and released another fixed version of our product.

### ElasticSearch

ElasticSearch is the database backend of our Recorder Instrument and Arkime is
the main component to use the database. Recorder Instrument was a lower priority
target for patching, because in normal deployments it doesn’t have permissions
to send ethernet or IP packets to any network. This makes exploitation harder
and the impact smaller. For the current stable software release, we decided it
was easiest just to manually patch the log4j class, just like we did for
Logstash.

SensorFleet software release 2.13.12 with the fix was released on December
17th, 2021.

For the development software release, we upgraded ElasticSearch and Arkime to
the latest available stable versions. We were going to do that anyway, this just
changed the priority for the upgrade.

## Scanning customer networks

### Detection of Log4Shell exploit attempts

Many of our customer deployments use Proofpoint’s Emerging Threats rule set with
Suricata IDS. Proofpoint decided to make their Log4J vulnerability exploitation
attempt signatures public in their “Open” version of the rule set and thus it
was automatically updated to many Sensors as well. The triggered rules then
cause the Recorder Instrument to record the traffic of the exploitation attempt
and contextual recording can be used to evaluate the impact of the attempt.

With deployments that feed Sensor event data to Sentinel, it was fairly easy to
look at the Log4J exploitation attempts by searching “CVE-2021-44228” in the
signature field. This also can be used as an analytical rule to alert if
exploitation attempts occur.

### Detection of vulnerable hosts by active scanning

A customer asked us for help because they had their hands full: they wanted to
scan for the vulnerable hosts in their networks.

We started looking for ways to perform scanning. At the time, FullHunt.io’s
log4j-scan.py was the de facto open source solution for such scans. However, it
lacked features that were critical to our use case:

- OOB (Out of Band) data retrieval when using a custom interactsh-provider.
  Using interact.sh default provider on the internet was not possible, because
  not all networks have internet connections.
- Simultaneous Multi Connection scanning for larger networks. Otherwise, it
  would take forever for the size of the network.

We started improving the scanner during the Christmas holidays, in preparation
for performing actual scans on Customer’s infrastructure. My colleague Esa
rewrote the scanner to use HTTPX instead of Requests library to gain a huge
speedup with asynchronous I/O. I added features for OOB data retrieval and
scanning statistics. Our version of the script is available at GitHub.

### Out of Band data extraction

Here’s a simplified overview of how the scanner works. The complexity in the
setup comes partially from the need for Out of Bands data extraction. You need
to have a way to know if a particular DNS request was made. This is exactly what
Interactsh server does for us here.

<img src="/img/posts/log4shell/image2.png" title="Out of Band data" width=700>

Please note that log4j scanner and Interactsh server can actually share the same
host - there’s no need to separate them, they are just drawn as separate
entities here for clarity.

I performed scans to some networks and wrote instructions for the customer. They
started scanning their whole infrastructure for vulnerabilities. The Log4Shell
attempt rules from Emerging Threats started giving exploitation attempt alerts,
but luckily we can easily filter them out on the Sentinel. We could have just
added BPF rules to filter out the scanner IP addresses, but we wanted to see how
the scan works. It turned out to be a good decision, because of course the scans
didn’t actually work for some of the sites.

Here is an example of a successful scan, captured by Recorder Instrument in
trigger mode that captures only traffic that hits any Suricata rule.
<img src="/img/posts/log4shell/image1.png" title="Arkime search for exploitation" width=700>
<img src="/img/posts/log4shell/image3.png" title="Arkime sample exploitation attempt" width=700>

As can be seen, the log4-scan.py is giving the HTTP server a bunch of headers,
hoping that one of them will get through to an app that will log the request.
This is not perfect, but it’s what was available using easy open source tools at
the moment.

## Takeaways

This could have been much worse:

- We had built-in protection (Instruments run inside LXD containers) against
  many forms of known and unknown vulnerabilities on our own software, which
  mitigated the impact even before patching.
- Patching of the vulnerabilities was very simple and our CI pipeline allowed
  rapid releasing of the fixed versions.
- Community provided tools helped us to scan our customers' networks rapidly.
- In addition to real-time detection capability, deployed Sensors enabled us to
  verify the sufficient reach and coverage of the scans.
- Integration of a vulnerability scanning software as an Instrument would be
  nice for the future. Detecting this specific vulnerability may require the use
  of Out of Band data extraction, but the scanning part would make sense as an
  Instrument and this experiment validates our idea.

Customer networks are now safer and we can sleep our nights without Java
nightmares.
