---
title: "Escaneo de redes"
description: ""
pubDate: 2023-01-08
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/netscan.png'
    alt: ""
tags: ["network", "ports", "puertos", "default", "tcp-ip", "scanning"]
---


El escaneo de redes es una técnica utilizada en la ciberseguridad para evaluar la seguridad de una red y determinar qué dispositivos y servicios están conectados a ella. 
El objetivo del escaneo de redes es identificar posibles vulnerabilidades o debilidades en la red que puedan ser explotadas por un atacante. 
Para llevar a cabo un escaneo de redes se utilizan herramientas especializadas, que envían paquetes de datos a los dispositivos de la red y observan las respuestas que reciben. 
Las respuestas obtenidas pueden indicar si el dispositivo está conectado a la red, qué servicios o aplicaciones están disponibles y esto dar pistas de si hay vulnerabilidades conocidas en el dispositivo. 
Al evaluar esta información, se puede obtener una idea de la seguridad de la red y determinar qué medidas de seguridad son necesarias para protegerla o para vulnerarla.

<a id="org0167dc5"></a>

# Herramientas para network scanning


<a id="org7fa0aa1"></a>

## Metasploit

Metasploit es una herramienta muy útil para los profesionales de seguridad informática, ya que les permite realizar pruebas de penetración de manera eficiente y evaluar la seguridad de los sistemas y las redes de manera detallada. También incluye una amplia variedad de módulos y herramientas que se pueden utilizar para realizar diferentes tipos de pruebas y explorar diferentes vulnerabilidades.


<a id="org3ed7e74"></a>

### Escaneo de red:

Metasploit dispone de módulos que permiten escanear un sistema para detectar vulnerabilidades. Para listarlos, basta con hacer `search portscan` en su consola.


<a id="org53669c4"></a>

## nmap

Escaneo de una dirección IP o nombre de host específico:

    nmap 192.168.1.1

Escaneo de una subred:

    nmap 192.168.1.0/24

Escaneo de varias direcciones IP o nombres de host:

    nmap 192.168.1.1 192.168.1.2 192.168.1.3

Escaneo de un rango de puertos específico:

    nmap -p 1-1000 192.168.1.1

Escaneo de una lista de puertos específicos:

    nmap -p 22,80,443 192.168.1.1

Escaneo de un rango de direcciones IP:

    nmap 192.168.1.1-50

Escaneo de una lista de direcciones IP o nombres de host desde un archivo de texto:

    nmap -iL targets.txt

Escaneo de puertos con detección de servicios y versiones:

    nmap -sV 192.168.1.1

Escaneo de una red utilizando el traceroute:

    nmap --traceroute 192.168.1.0/24

Escaneo de una red utilizando la detección de sistema operativo:

    nmap -O 192.168.1.0/24


<a id="org672c223"></a>

## fing

Fing es una aplicación de monitoreo de red para dispositivos Android que se utiliza para escanear y analizar la red inalámbrica a la que está conectado un dispositivo. Con Fing, los usuarios pueden ver qué dispositivos están conectados a la red y obtener información sobre ellos, como sus direcciones IP y sus nombres de host. También permite a los usuarios escanear el rango de direcciones IP de una red para buscar dispositivos ocultos o descubrir dispositivos que se han conectado sin autorización. Fing permite monitorear y analizar la red inalámbrica de manera eficiente. También es útil para obtener información sobre los dispositivos que están conectados a una red o identificar problemas de rendimiento.


<a id="orgee1ebd2"></a>

## hping 2/3

Hping es una herramienta de línea de comandos para crear paquetes de red y enviarlos a través de una red. Se utiliza a menudo para probar la seguridad de una red o para realizar pruebas de rendimiento de red. También permite a los usuarios especificar aspectos de los paquetes, tales como el protocolo de red que se utiliza (TCP, UDP, &#x2026;), la dirección IP de destino, el puerto de destino y el tamaño del paquete. También permite recibir y mostrar las respuestas a los paquetes enviados.Permite realizar pruebas de seguridad y rendimiento de la red de manera eficiente. También se puede usar para llevar a cabo ataques de denegación de servicio (usando flag &#x2013;flood) o para intentar eludir la seguridad de una red (usando la flag -S &#x2013;spoof, o las flags &#x2013;xmas/ymas).

    hping -i {IP}                                               # ICMP Ping
    hping -A {IP} -p {port}                                     # Escaneo de respuesta ACK a un puerto
    hping -2 {IP} -p {port}                                     # Escaneo por protocolo UDP a un puerto
    hping {IP} -Q -p {port} -s                                  # Captura del número de secuencia de los paquetes
    hping -1 {IP acabada en x} --rand-dest -I {interfaz de red} # Escaneo de subred buscando dispositivos activos
    hping -9 HTTP -I {interfaz de red}                          # Intercepta todo el trafico HTTP de la red
    hping -S {IP spoofeada} -a {IP víctima} -p22 --flood        # Ataque de inundación


<a id="org5ba3d43"></a>

# Descubrimiento de hosts


<a id="orga2ee70c"></a>

## escaneo de ICMP

    @startmindmap
    skinparam backgroundColor #EEEBDC
    skinparam lifelineStrategy solid
    title Técnicas de descubrimiento de host
    * Descubrimiento de Host
    ** Ping Scans
    *** ARP Ping
    *** UDP Ping
    *** ICMP
    **** Ping Echo
    **** Ping Sweep
    **** Ping Timestamp
    **** Ping a la máscara
    ** TCP Ping Scans
    *** SYN Scan
    *** ACK Scan
    ** IP Scans
    @endmindmap

