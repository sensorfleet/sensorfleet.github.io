---
layout: post
author: keitsi
description:
  A blog on how to use Zeek IDS (formerly Bro) on SensorFleet platform to plant
  a honeypot-like canary file on a file server.
title: Using Zeek to find persistent threats by using a canary file (part 2)
og_image: /img/posts/zeek-sensorfleet.png
excerpt:
  A blog on how to use Zeek IDS on SensorFleet platform to plant a honeypot-like
  canary file on a file server. Just by using network monitoring.
---

## Introduction

This is a continuation to my
[previous blog](https://sensorfleet.com/2020/09/29/Using-Zeek-to-find-persistent-threats-by-monitoring-DNS.html).
Previously we set up some monitoring for DNS anomalies, like sustained DNS
connections. This guide assumes that you read the previous one, so if you want
to try this, please read the
[previous blog](https://sensorfleet.com/2020/09/29/Using-Zeek-to-find-persistent-threats-by-monitoring-DNS.html)
first.

## Step 1: honeypot, using network monitoring only?

Do you have some server that contains confidential information? Perhaps a NAS
file server or intranet web server?

There is an effective and nearly zero-false-positive way to detect breach of
your server. Often, a honeypot software is deployed somewhere, and we would
listen to any connections to the honeypot.

There is another way as well. Let’s say you have a public directory on your file
server or webserver. Somewhere, where nobody really looks into. But it should
still be publicly available. Then you create a “canary” file in that directory,
that looks like it contains really sensitive information, like
“credit_cards.db”. You write random bytes to the file. That should get the
attention of an attacker. Naming suggests it’s a database containing credit
cards, but the bytes are not understandable by any normal CLI tool.

If the file is downloaded without encryption (e.g. over HTTP connection), you
can detect whenever it’s downloaded. Over Windows network share, email, HTTP,
doesn’t matter. Zeek will create a file event from it (and log it if logging
files is enabled).

Then, we have a special blacklist module that utilizes Zeek’s Intel Framework.

You save a file hash of your canary to zeek blacklist, and the blacklist engine
will create an alert whenever that file is seen in the network traffic. Neat,
isn’t it?

## Step 2: Prepare the canary file

This step requires the use of a Linux or other Unix shell, with access to the
/dev/urandom device and sha256 command.

- Create an interesting looking file, say _credit_cards.db_:

  ```
  dd if=/dev/urandom of=/tmp/credit_cards.db bs=1 count=1851
  ```

- Copy the file somewhere in your server. You could copy it to multiple places.
  If it leaks from anywhere, you will get an alert.
- Calculate a SHA256 sum for the file:

  ```
  sha1sum /tmp/credit_cards.db
  ```

  (or sha1 on some systems)

- Store the checksum of your file somewhere. In our case, the checksum is
  _c2c46a1f1c21d4aa77593e1f641576a068cc2afe_.

## Step 3: Add file hash to blacklist

Now you have the file hash ready and canary file is deployed.

Next, we add the file hash to Zeek Intel Framework. That process is a bit
different depending on if you’re on SensorFleet environment or generic
environment.

**Generic environment**

- Locate Zeek’s index-default.zeek script
- Edit that script

  ```
  vim /opt/zeek/share/zeek/base/init-default.zeek
  ```

- Add the following code:

  ```
  @load base/frameworks/intel
  @load policy/frameworks/intel/seen
  @load policy/frameworks/intel/do_notice
  @load policy/frameworks/files/hash-all-files
  redef Intel::read_files += { "/opt/zeek_file_blacklist.txt" };
  ```

- Create a file /opt/zeek_file_blacklist.txt, containing the sha1 hash from
  previous step, in following format:
  ```
  #fields	indicator	indicator_type	meta.source
  c2c46a1f1c21d4aa77593e1f641576a068cc2afe	Intel::FILE_HASH	canary
  ```
  Note: the columns must be tab separated.
- Restart Zeek:
  ```
  service zeek restart
  ```

**SensorFleet environment**

- Open Rule Manager UI
- Navigate to Zeek tab, blacklists and click Add blacklist:
  <img src="/img/posts/zeek_2_blog/01.png" title="add blacklist" width=500>

- Set blacklist name, add the file hash, and set blacklist type, validate and
  Save.

  <img src="/img/posts/zeek_2_blog/02.png" title="configure blacklist" width=500>

- Commit blacklist changes:

  <img src="/img/posts/zeek_2_blog/03.png" title="commit changes" width=500>

- Add a zeek script to load policy to calculate all file checksums:

  <img src="/img/posts/zeek_2_blog/04.png" title="add script" width=500>

- Set code:

  ```
  @load policy/frameworks/files/hash-all-files
  ```

- Set script name, validate and Save.

  <img src="/img/posts/zeek_2_blog/05.png" title="configure script" width=500>

- Commit script changes

  <img src="/img/posts/zeek_2_blog/06.png" title="commit changes" width=500>

## Step 4: Test downloading the canary

- Download the canary file to see if an Intel event occurs. In our case, the
  canary is downloaded using HTTP:

  ```
  curl http://my_server/path/to/canary/credit_cards.db -o /dev/null
  ```

  (you could download it by using a browser running on a Windows machine as
  well)

- See if event occurs. In our case, there is such event:

  <img src="/img/posts/zeek_2_blog/07.png" title="sample canary trigger event" width=500>

## Final words

You will now get a notification whenever someone downloads your canary file. If
you ever get such an event, the chances are that your network is compromised or
someone with legitimate access accidentally found the file and didn’t know of it
being a canary trap.

The cool thing about this is, you’re not required to modify your infrastructure.
Just plant a file, and monitor your network traffic. That’s what IDS systems
like Zeek do.
