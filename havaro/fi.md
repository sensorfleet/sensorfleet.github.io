---
layout: default
title: HAVARO Peruspalvelu
---

{% assign email = "havaro@sensorfleet.com" %}

{% assign lang-link-href = "./" %}
{% assign lang-link-text = "🇬🇧 In English" %}

{% assign traficom-logo = "../img/traficom-kyber-fi.svg" %}

{% capture traficom-lead %}
HAVARO Peruspalvelu on Liikenne- ja viestintävirasto Traficomin
Kyberturvallisuuskeskuksen tuottama palvelu, joka havainnoi suomalaisiin
yrityksiin ja organisaatioihin kohdistuvia vakavia tietoturvauhkia ja varoittaa
niistä. HAVARO havaitsee asiakkaan verkkoliikenteestä tietoturvaa vaarantavia
verkkohyökkäyksiä ja muuta tietoturvallisuuden kannalta haitallista toimintaa.
{% endcapture %}

{% capture sensorfleet-lead %}
SensorFleet toimii Kyberturvallisuuskeskuksen kumppanina ja teknisen ratkaisun
toimittajana HAVARO Peruspalvelun tuottamisessa. Toimitamme asiakkaalle
sensorin havaintodatan välittämiseksi Kyberturvallisuuskeskuksen
analysoitavaksi, sekä asiakaskohtaisen portaalin tunnistettujen uhkien
tarkasteluun. SensorFleet myös vastaa sensorin ja portaalin asennuksista ja
ylläpidosta.
{% endcapture %}

{% assign deployment-title = "Palvelun toteutus" %}

{% capture deployment %}
Palvelu toteutetaan asentamalla asiakkaan palomuurin ja Internet-rajapinnan
väliin sensori, jolle peilataan tämän rajapinnan liikenne. Sensori suodattaa
liikenteestä tietoja, jotka lähetetään Kyberturvallisuuskeskukselle
analysoitavaksi. Kyberturvallisuuskeskus välittää havainnot asiakaskohtaiseen
Fleet Insight- portaaliin.
{% endcapture %}

{% assign content-title = "Palvelun sisältö" %}

{% capture content %}
Kyberturvallisuuskeskus ja SensorFleet tuottavat palvelun yhteistyössä.
SensorFleet vastaa palvelun asiakkaalle näkyvistä teknisistä ratkaisuista ja
Kyberturvallisuuskeskus kuratoitujen havaintojen tuottamisesta.
{% endcapture %}

{% capture content-sensorfleet %}
Toimitamme asiakkaalle sensorit joko virtuaalisina että laitteistopohjaisina,
riippuen asiakkaan ympäristöstä. Perusmaksuun sisältyvillä sensoreilla voidaan
käsitellä verkkoliikennettä 1 Gbps liikennemäärään asti.
<br><br>
Asiakaskohtainen Fleet Insight- portaali asennetaan suomalaisen
palveluntarjoajan konesaliin. SaaS käytön lisäksi havainnot voidaan viedä
portaalista asiakkaan omaan SIEM- järjestelmään.
<br><br>
Huolehdimme sensoreiden ja portaalin toimituksista, asennuksista ja ylläpidosta
avaimet käteen periaatteella.
{% endcapture %}

{% assign content-traficom-title = "Kyberturvallisuuskeskus" %}

{% capture content-traficom %}
Kyberturvallisuuskeskus analysoi asiakkaan verkkoliikenteestä tuotetut tiedot
tietoturvauhkien havaitsemiseksi. Kyberturvallisuuskeskus säilyttää tietoa
määräajan, mikä mahdollistaa uuden uhkatiedon perusteella tapahtuvan
havainnoinnin myös takautuvasti.
<br><br>
Tiedot havainnoista välitetään Fleet Insight- portaaliin asiakkaan tiedoksi ja
toimenpiteitä varten.
<br><br>
Vakavissa tietoturvaloukkauksissa Kyberturvallisuuskeskuksen asiantuntijat
tarjoavat asiakkaalle tukea.
{% endcapture %}

{% assign protection-title = "HAVARO tuo asiakkaalle suojaa" %}

{% capture protection %}
HAVARO parantaa asiakkaan kykyä suojautua toiminnan jatkuvuuteen, talouteen ja
liiketoimintakriittiseen tietoon kohdistuvilta uhkilta ja täydentää muita
käytössä olevia tietoturvaratkaisuja. Palvelun havainnointikyvykkyyden
tehostamisessa hyödynnetään Kyberturvallisuuskeskuksen ainutlaatuista tietoa
kansallisista ja kansainvälisistä tietoturvauhista.
{% endcapture %}

{% assign protection-subtitle = "HAVARO Peruspalvelun keskeiset edut:" %}

{% assign protection-bullets = "" | split: ',' %}
{% assign protection-bullets = protection-bullets | push: "Kyberturvallisuuskeskus tunnistaa uhkia 20 vuoden kokemuksella ja laajan uhkatiedon tehostamana" %}
{% assign protection-bullets = protection-bullets | push: "Asiakkaalle välitetään havainnot jotka ovat Kyberturvallisuuskeskuksen mukaan tietoturvan kannalta merkittävimpiä, mikä helpottaa uhkiin reagoimista" %}
{% assign protection-bullets = protection-bullets | push: "Kyberturvallisuuskeskuksen tuki on käytettävissä vakavissa tietoturvaloukkauksissa" %}
{% assign protection-bullets = protection-bullets | push: "SensorFleet:in tarjoama teknisen ratkaisun avaimet käteen ylläpito tekee palvelun käyttämisestä vaivatonta" %}

{% assign additional-services-title = "SensorFleet:in tarjoamat lisäpalvelut" %}

{% capture additional-services %}
SensorFleet tarjoaa HAVARO Peruspalvelun lisäksi NDR alustaansa ja kattavaa
työkaluvalikoimaa verkon tietoturvavalvontaan, olipa sitten kyse IT, OT tai SDN
ympäristöistä. Asiakas voi hankkia lisäsensoreita sisäverkkonsa valvontaan ja
täydentämään HAVARO Peruspalvelun tarjoamaa North-South näkyvyyttä East-West
näkyvyydellä. Lisäsensorit voidaan liittää sujuvasti asiakkaan jo käytössä
olevaan Fleet Insight portaaliin.
<br><br>
Sisäverkon valvontaan käytettävien sensoreiden havaintotietoja ei välitetä
Kyberturvallisuuskeskukselle, eivätkä he lähtökohtaisesti käsittele niitä.
Sensoreiden tarjoama lisänäkyvyys voi kuitenkin auttaa tietoturvaloukkausten
tutkinnassa.
{% endcapture %}

{% assign interested-title = "Kiinnostuitko?" %}

{% capture interested %}
Ota yhteyttä meihin: <a href="mailto:{{email}}">{{email}}</a>. Vastaamme
mielellämme kysymyksiin.
{% endcapture %}

{% include havaro-template.html %}
