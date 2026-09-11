---
layout: post
author: mikko
og_image: /img/posts/open-ndr/open-ndr-banner.jpg
tag: Blog post
description:
  When a solution is described as open, the useful question for a decision-maker
  is not "is this NDR open?" but "open at which layer, and what does that
  openness buy the business?"
title: What is "Open" in NDR - There are levels
excerpt:
  When a solution is described as open, the useful question for a decision-maker
  is not "is this NDR open?" but "open at which layer, and what does that
  openness buy the business?"
---

When a solution is described as open, the useful question for a decision-maker
is not "is this NDR open?" but **"open at which layer, and what does that
openness buy the business?"**

> **In short:** For SensorFleet, "open" means data, integration interfaces and
> even platform itself. A SensorFleet Sensor is a vendor-neutral host that runs
> any capability side by side, on COTS hardware, feeding any SIEM. Openness at
> the platform layer turns security architecture from a series of lock-in
> decisions into a set of reversible choices.

---

## 01 — Three kinds of "open"

<div class="image-text-row" markdown="1">

![SensorFleet Open NDR stack](/img/posts/open-ndr/open-ndr-img-dark.png)

<div markdown="1">

Vendors use "open" at three different layers of the architecture:

1. **Open data.** The output is standards-based and portable, so it moves into
   your own tools and storage without a proprietary trap.

2. **Open detection.** The engines are open source and community-driven,
   typically Zeek, Suricata, and YARA, so detections are transparent and tunable
   rather than a black box.

3. **Open platform.** The sensor itself is a vendor-neutral host that runs any
   capability side by side, on hardware you choose.

</div>

</div>

Most of the market falls into the first two categories, and several respected
vendors do them well. But in those models the openness lives at the detection
and data layers; the platform underneath is still single-vendor and closed.

Platform openness is what makes the open data and open detection matter
long-term. It determines whether you can swap, add, or replace any capability
without rebuilding your architecture around a new vendor.

SensorFleet is open at all three layers, and treats the platform as the
foundation. The capabilities that run on a Sensor are called Instruments. They
can be open source, third-party commercial tools, SensorFleet's own, or ones
your team develops. All running together on the same fabric. The computing
platform agnosticism adds one more dimension: Users can select what best fits
their use case, whether it's SensorFleet delivered appliances, their own trusted
suppliers or virtual sensors. That is what "first truly open NDR platform"
means: the openness is **architectural**, not only a matter of which engine sits
inside.

---

## 02 — What platform-level openness delivers to the business

### Best-of-breed without re-buying the platform

Because the sensor hosts any vendor's capability, you select the best tool for
each job and run them together instead of accepting one vendor's answer for
everything. Adding a capability becomes as easy as deploying a container and not
another procurement cycle for another appliance.

### Incremental modernization instead of rip-and-replace

A layered architecture keeps changes local: add or remove a capability without
disturbing the rest of the stack. You start where the gaps are: east-west
visibility in a data center, monitoring in an OT or ICS network, and expand from
there. Around 60% of organizations still lack east-west visibility (source: NDR
market analyses, 2025), and closing that gap should not require replacing what
already works.

### Open integration: your stack, your workflows

SensorFleet forwards alerts and forensic data into the SIEM and SOAR tools your
team already uses, including Microsoft Sentinel, Splunk and Elastic. Capability
to ingest any IoC source adds value to your threat intelligence investments by
making the IoC's actionable. Security operations keep working in their standard
tools regardless of the detection products underneath; vendor dashboards are
reserved for detailed investigation when needed.

This matters because integration complexity with existing SIEM, SOAR, and EDR
tooling is one of the most common reasons NDR projects stall. The platform bends
to fit your operation, not the other way around.

### Lower, more predictable cost of ownership

High deployment and maintenance cost is consistently the leading barrier to NDR
adoption. Running on any hardware avoids forced appliance refreshes. Unit-based
licensing means expansion costs scale predictably rather than arriving as a
surprise at renewal. And because detection and forensic collection happen at the
edge, only relevant, filtered data flows into your SIEM. This directly reduces
ingestion costs, which have become a major line item for security teams.

---

## 03 — Open data: control, compliance, and AI-readiness

SensorFleet produces events in a standard JSON format through documented, open
APIs, and can run multiple forensic pipelines into storage you control. You own
the data your network generates, and you can re-use it across tools and over
time.

That matters in two directions. First, **compliance and sovereignty**:
components are on-premises compatible and can run fully isolated from a European
vendor, which is directly relevant under frameworks such as GDPR and NIS2.
Second, **AI-readiness**: AI-based detection and analytics are only as good as
the data they train on. A proprietary, siloed data format is a ceiling. Open,
structured, network-wide event data is the foundation that makes AI investment
in security actually pay off.

**Up to 90% of organizations are now using or evaluating AI for cybersecurity.**
A clean, portable, network-wide data pipeline is the prerequisite, not an
afterthought.

---

## The bottom line for the boardroom

The NDR market is projected to grow from roughly **USD 3.7 billion in 2025 to
USD 5.8 billion by 2030**. As detection engines converge and become shared
across vendors, the strategic question shifts from "which NDR detects best
today" to **"which architecture keeps our options open for the next five
years?"**

For organizations operating in both IT and OT environments, the stakes are
higher still. A platform that can monitor industrial control systems alongside
corporate networks, without requiring separate tools or separate management, is
a meaningful operational and cost advantage.

That is what "open" means in SensorFleet Open NDR. Not only open-source
detection, and not only portable data, but also an **open platform**: a
vendor-neutral foundation that lets you choose, mix, add, remove, and re-use
capabilities without re-architecting. For the buyer, open is not a feature. It
is optionality, sovereignty, and cost control, designed in from the start.

---

## Common discussions around "open" NDR

**Most NDR's are "open" nowadays, are they not?** Many use the word, usually to
mean open-source detection engines and portable data. Fewer are open at the
platform layer, able to host any vendor's capability, including your own, on
hardware you choose. That is what separates a truly open NDR from an
open-source-powered but single-vendor one.

**How is SensorFleet's "open" different from vendors like Corelight or Stamus?**
Both are strong at detection and data openness. The difference is at the
platform layer: SensorFleet's sensor is a neutral host that runs open-source,
third-party, OEM, and custom capabilities side by side. You are not constrained
to what one vendor builds or how they intend the platform to be extended.

**Does an open platform mean more complexity for my team?** No. Openness is
about where capabilities come from, not how they are managed. Fleet Management
gives centralized, one-click deployment and configuration across the entire
estate, and security operations keep working in their existing SIEM and tools.
With standard SensorFleet provided Instruments, solution deploys like any other
COTS product, but the door remains open for extensions and integrations.

**What does open NDR mean for total cost of ownership?** It tends to lower and
flatten it: standard hardware avoids forced refreshes, unit-based licensing
keeps costs predictable, and edge-side detection and forensics reduce the data
sent to the SIEM, which directly cuts ingestion costs.

**Does being open compromise detection quality?** No. Open platforms run the
same leading detection engines the rest of the market uses, and add the freedom
to combine them with other best-of-breed and custom capabilities. Detection
quality can improve over time without a platform change.

**Can SensorFleet monitor OT and ICS environments?** Yes. SensorFleet Sensors
can be deployed in operational technology and industrial control system networks
alongside IT environments, managed centrally through the same Fleet Management
interface. This makes it practical to extend visibility into OT without a
separate toolset or vendor relationship.
