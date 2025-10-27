---
layout: default
title: HAVARO Elementary
---

{% assign email = "havaro@sensorfleet.com" %}

{% assign lang-link-href = "./fi" %}
{% assign lang-link-text = "🇫🇮 In Finnish" %}

{% assign traficom-logo = "../img/traficom-kyber-en.svg" %}

{% capture traficom-lead %}
HAVARO Elementary service, an early warning service provided by Traficom
NCSC-FI, alerts Finnish companies and organisations about the critical cyber
threats. HAVARO monitors an organisation's Internet facing network traffic to
detect attacks and malicious activity endangering the cyber security of the
organisation.
{% endcapture %}

{% capture sensorfleet-lead %}
SensorFleet is a technical solution provider and partner of NCSC-FI in
producing the HAVARO Elementary service. We provide customers with a sensor
that transfers network metadata for NCSC-FI analysis and a portal for receiving
the alerts from the NCSC-FI. We will also be responsible for deployment and
maintenance of the sensors and portal.
{% endcapture %}

{% assign deployment-title = "Service deployment" %}

{% capture deployment %}
A sensor will be deployed on a network egress point, typically between the
Firewall and Internet, and network traffic will be mirrored to the sensor.
Sensor filters data from the network traffic and sends it to NCSC-FI for
analysis. NCSC-FI will deliver alerts to a customer specific Fleet Insight
portal instance.
{% endcapture %}

{% assign content-title = "Content of the service" %}

{% capture content %}
NCSC-FI and SensorFleet produce the service in co-operation. SensorFleet
provides the customer facing technical solutions and NCSC-FI produces the
curated alerts and notifications to customers.
{% endcapture %}

{% capture content-sensorfleet %}
We provide customers with either virtual or hardware based sensors, depending
on the customer network. Base fee covers traffic processing up to 1 Gbps.
<br><br>
Customer specific Fleet Insight portal will be deployed in a Finnish
datacenter. Besides SaaS usage, the portal supports export of data to
customer's SIEM.
<br><br>
We will be deploying and maintaining the sensors and portal as a turn-key
service.
{% endcapture %}

{% assign content-traficom-title = "NCSC-FI" %}

{% capture content-traficom %}
NCSC-FI analyses the data produced by the sensors to detect cyber security
threats. Data will be retained for a fixed time period to also enable later
detections as new Threat Intelligence becomes available.
<br><br>
Alerts and notifications will be sent to Fleet Insight portal for customer’s
attention.
<br><br>
In the case of serious cyber threats, the experts of NCSC-FI will provide
support for the customer.
{% endcapture %}

{% assign protection-title = "HAVARO protecting customers" %}

{% capture protection %}
HAVARO enhances customers protection against the cyber threats that can impact
business continuity and critical business data, augmenting the other cyber
security mechanisms deployed. Service is enhanced by the unique national and
international Threat Intelligence available to NCSC-FI.
{% endcapture %}

{% assign protection-subtitle = "Benefits of the HAVARO Elementary service:" %}

{% assign protection-bullets = "" | split: ',' %}
{% assign protection-bullets = protection-bullets | push: "NCSC-FI brings 20 years of experience on analysing network data for the threats, enhanced by unique Threat Intelligence" %}
{% assign protection-bullets = protection-bullets | push: "Customer will receive curated alerts that are deemed by the NCSC-FI to be significant, making the response easier" %}
{% assign protection-bullets = protection-bullets | push: "NCSC-FI support will be available for the serious cyber threats" %}
{% assign protection-bullets = protection-bullets | push: "Full maintenance for the technical solutions by SensorFleet makes the usage of service easy" %}

{% assign additional-services-title = "Additional services from SensorFleet" %}

{% capture additional-services %}
In addition to HAVARO Elementary service, SensorFleet NDR platform with the
comprehensive set of supported cyber security tools for IT, OT and SDN will be
available for the monitoring of customer’s internal networks. Sensors inside
the perimeter extend cyber visibility from North-South, provided by HAVARO, to
East-West visibility. Additional sensors will plug seamlessly with the Fleet
Insight portal.
<br><br>
Data from the sensors used for the internal network monitoring will not be
transmitted to, nor processed by, NCSC-FI. Extended visibility and forensic
data collection may, however, help with the investigation of cyber security
breaches.
{% endcapture %}

{% assign interested-title = "Interested?" %}

{% capture interested %}
Please contact us: <a href="mailto:{{email}}">{{email}}</a>. We’ll be happy
to provide more information.
{% endcapture %}

{% include havaro-template.html %}
