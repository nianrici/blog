---
title: "Descubrimiento de hosts"
description: '¿Y eso que es?'
pubDate: 2023-01-23
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/pixel-art-hacker-.png'
    alt: ""
tags: ["security", "herramientas", "knowledge base", "networking"]
---

Esta entrada se enfocará en las herramientas para el descubrimiento de hosts en una red, como Fping, Angry IP Scanner, Advanced IP Scanner, entre otros. Estas herramientas son utilizadas para escanear un rango de direcciones IP y determinar qué dispositivos están activos y respondiendo en una red. Analizaremos cómo funcionan y cómo utilizarlas de manera efectiva para descubrir hosts en una red.


## Escaneo de ICMP

### ARP ping scan - UDP ping scan
El escaneo de ping ARP y el escaneo de ping UDP son dos técnicas de escaneo de red que se utilizan para determinar qué host están conectados a una red y cuáles son sus direcciones IP. Ambas técnicas envían paquetes de datos a los hosts de la red para determinar si están conectados y disponibles, pero lo hacen de maneras ligeramente diferentes.

El escaneo de ping ARP utiliza paquetes ARP para solicitar la dirección MAC de los hosts de la red. Si un host recibe el paquete y está disponible, responderá con su dirección MAC y su dirección IP. Esta técnica es útil para escanear redes locales y solo funciona en redes LAN.

El escaneo de ping UDP utiliza paquetes UDP para enviar solicitudes de echo a los hosts de la red. Si un host recibe el paquete y está disponible, responderá con un paquete de respuesta de echo. Esta técnica es útil para escanear redes más grandes y se puede utilizar tanto en redes LAN como WAN.

Ambas técnicas son útiles para determinar qué hosts están conectados a una red y cuáles son sus direcciones IP, y se pueden utilizar para identificar hosts desconocidos o para determinar si un host específico está disponible. Sin embargo, es importante tener en cuenta que algunos hosts pueden estar configurados para no responder a paquetes de ping, por lo que es posible que no se detecten todos los hosts disponibles con estas técnicas.


### Escaneo de ping ARP:

    nmap -PR 192.168.1.0/24

Este comando escaneará la subred 192.168.1.0/24 utilizando paquetes ARP para determinar qué hosts están conectados y cuáles son sus direcciones IP.

    nmap -PR -O -sC -p1-1024 --version-intensity 5 --max-rtt-timeout 500ms --max-retries 3 --min-hostgroup 100 --max-hostgroup 200 192.168.1.0/24

Este comando escaneará la subred 192.168.1.0/24 utilizando paquetes ARP para determinar qué hosts están conectados y cuáles son sus direcciones IP. Además, se realizará un escaneo de puertos para determinar qué servicios están disponibles en cada host y se intentará determinar el sistema operativo de cada host utilizando la opción -O. También se ejecutarán los scripts por defecto (-sC) y se escanearán los puertos del 1 al 1024. Se establecerá una intensidad de 5 para la detección de versiones (-version-intensity 5) y se establecerán un tiempo máximo de 500ms para la RTT (round-trip time, tiempo de ida y vuelta) y un máximo de 3 reintentos. Además, se establecerá un mínimo de 100 hosts por grupo y un máximo de 200 hosts por grupo para distribuir el trabajo de escaneo de manera más eficiente.

### Escaneo de ping UDP:

    nmap -sU 192.168.1.0/24

Este comando escaneará la subred 192.168.1.0/24 utilizando paquetes UDP para determinar qué hosts están conectados y cuáles son sus direcciones IP.

    nmap -sU -sV -p53,123,161,162 --script "discovery and default" scanme.nmap.org

Este comando escaneará el host scanme.nmap.org utilizando paquetes UDP para determinar si está disponible y cuál es su dirección IP. Además, se realizará un escaneo de puertos para determinar qué servicios están disponibles en el host y se intentará determinar la versión de los servicios utilizando la opción -sV. Se escanearán los puertos 53, 123, 161 y 162 y se ejecutarán los scripts de descubrimiento y los scripts por defecto ("discovery and default").

## ICMP echo ping scan
El escaneo de ping ICMP es una técnica de escaneo de red que se utiliza para determinar qué host están conectados a una red y cuáles son sus direcciones IP. Se realiza enviando paquetes de eco ICMP a los hosts de la red para determinar si están conectados y disponibles. Si un host recibe el paquete y está disponible, responderá con un paquete de respuesta de eco.

Para realizar un escaneo de ping ICMP con la herramienta nmap, puedes utilizar el siguiente comando:

    nmap -PE 192.168.1.0/24

Este comando escaneará la subred 192.168.1.0/24 enviando paquetes de eco ICMP a cada host para determinar qué hosts están conectados y cuáles son sus direcciones IP.

    nmap -PE --min-rtt-timeout 100ms --max-rtt-timeout 500ms --max-retries 3 --min-hostgroup 100 --max-hostgroup 200 192.168.1.0/24

Este comando escaneará la subred 192.168.1.0/24 enviando paquetes de eco ICMP a cada host para determinar qué hosts están conectados y cuáles son sus direcciones IP. Se establecerá un tiempo mínimo de 100ms para la RTT (round-trip time, tiempo de ida y vuelta) y un tiempo máximo de 500ms para la RTT y se realizarán un máximo de 3 reintentos. Además, se establecerá un mínimo de 100 hosts por grupo y un máximo de 200 hosts por grupo para distribuir el trabajo de escaneo de manera más eficiente.

    nmap -PE --exclude 192.168.1.5,192.168.1.10-20 scanme.nmap.org

Este comando escaneará el host scanme.nmap.org enviando paquetes de eco ICMP para determinar si está disponible y cuál es su dirección IP. Se excluirá del escaneo el host 192.168.1.5 y el rango de hosts 192.168.1.10 a 192.168.1.20.

Es importante tener en cuenta que algunos hosts pueden estar configurados para no responder a paquetes de ping, por lo que es posible que no se detecten todos los hosts disponibles con esta técnica. Además, algunos firewalls y otros dispositivos de seguridad pueden bloquear o filtrar paquetes de ping, lo que puede afectar la precisión del escaneo. Por lo tanto, es posible que sea necesario utilizar otras técnicas de escaneo de red además del escaneo de ping ICMP para obtener una visión más completa de la red.

