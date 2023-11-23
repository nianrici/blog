---
title: "Nmap (Work In Progress)"
description: ""
pubDate: 2023-01-03
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/nmap.png'
    alt: ""
tags: ["network", "ports", "puertos", "nmap", "tcp-ip", "scanning", "scripts", "knowledge base"]
---


## Descubrir equipos en la red local:
```ruby
    # nmap -PE -sn {IP/subnet}
    nmap -PE -sn 10.1.1.0/24
```

**Output:**
```ruby
    Starting Nmap 7.93 ( https://nmap.org ) at 2022-12-13 20:07 CET
    Nmap scan report for +*REDACTED*+
    Host is up (0.00053s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.00029s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.0029s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.00046s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.00083s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.00027s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.022s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.000038s latency).
    Nmap scan report for +*REDACTED*+
    Host is up (0.0012s latency).
    Nmap done: 256 IP addresses (9 hosts up) scanned in 1.44 seconds
```
