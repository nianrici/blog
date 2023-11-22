---
title: "Herramientas para escaneos de red"
description: '¿Y eso que es?'
pubDate: 2023-01-22
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/a-sketch-of-a-cyberpunk-hacker-.png'
    alt: ""
tags: ["security", "herramientas", "knowledge base", "networking", "nmap", "metasploit", "hping", "fing"]
---
En este artículo hablaremos sobre las herramientas para el escaneo de redes, como Nmap, Nessus, OpenVAS, etc. Estas herramientas son esenciales para comprender el estado de seguridad de una red y detectar posibles amenazas. Veremos cómo funcionan y cómo utilizarlas de manera efectiva.

## Metasploit
Metasploit es una herramienta muy útil para los profesionales de seguridad informática, ya que les permite realizar pruebas de penetración de manera eficiente y evaluar la seguridad de los sistemas y las redes de manera detallada. También incluye una amplia variedad de módulos y herramientas que se pueden utilizar para realizar diferentes tipos de pruebas y explorar diferentes vulnerabilidades.


### Escaneo de red:
Metasploit dispone de módulos que permiten escanear un sistema para detectar vulnerabilidades. Para listarlos, basta con hacer `search portscan` en su consola.


## nmap
Nmap es un programa de escaneo de red que se utiliza para descubrir dispositivos y servicios en una red. Permite a los administradores de redes y seguridad obtener información sobre los sistemas conectados, incluyendo los sistemas operativos, puertos abiertos, servicios en ejecución y configuraciones de seguridad. También puede utilizarse para detectar dispositivos vulnerables y realizar pruebas de penetración. Nmap es una herramienta popular y es ampliamente utilizada en la comunidad de seguridad informática.

    # Escaneo de una dirección IP o nombre de host específico:
        nmap 192.168.1.1 
    
    # Escaneo de una subred:
        nmap 192.168.1.0/24
    
    # Escaneo de varias direcciones IP o nombres de host:
        nmap 192.168.1.1 192.168.1.2 192.168.1.3
    
    # Escaneo de un rango de puertos específico:
        nmap -p 1-1000 192.168.1.1
    
    # Escaneo de una lista de puertos específicos:
        nmap -p 22,80,443 192.168.1.1
    
    # Escaneo de un rango de direcciones IP:
        nmap 192.168.1.1-50
    
    # Escaneo de una lista de direcciones IP o nombres de host desde un archivo de texto:
        nmap -iL targets.txt
    
    # Escaneo de puertos con detección de servicios y versiones:
        nmap -sV 192.168.1.1
    
    # Escaneo de una red utilizando el traceroute:
        nmap --traceroute 192.168.1.0/24
    
    # Escaneo de una red utilizando la detección de sistema operativo:
        nmap -O 192.168.1.0/24


## fing

Fing es una aplicación de monitoreo de red para dispositivos Android que se utiliza para escanear y analizar la red inalámbrica a la que está conectado un dispositivo. Con Fing, los usuarios pueden ver qué dispositivos están conectados a la red y obtener información sobre ellos, como sus direcciones IP y sus nombres de host. También permite a los usuarios escanear el rango de direcciones IP de una red para buscar dispositivos ocultos o descubrir dispositivos que se han conectado sin autorización. Fing permite monitorear y analizar la red inalámbrica de manera eficiente. También es útil para obtener información sobre los dispositivos que están conectados a una red o identificar problemas de rendimiento.


## hping 2/3
Hping es una herramienta de línea de comandos para crear paquetes de red y enviarlos a través de una red. Se utiliza a menudo para probar la seguridad de una red o para realizar pruebas de rendimiento de red. También permite a los usuarios especificar aspectos de los paquetes, tales como el protocolo de red que se utiliza (TCP, UDP, &#x2026;), la dirección IP de destino, el puerto de destino y el tamaño del paquete. También permite recibir y mostrar las respuestas a los paquetes enviados.Permite realizar pruebas de seguridad y rendimiento de la red de manera eficiente. También se puede usar para llevar a cabo ataques de denegación de servicio (usando flag &#x2013;flood) o para intentar eludir la seguridad de una red (usando la flag -S &#x2013;spoof, o las flags &#x2013;xmas/ymas).

    hping -i {IP}                                               # ICMP Ping
    hping -A {IP} -p {port}                                     # Escaneo de respuesta ACK a un puerto
    hping -2 {IP} -p {port}                                     # Escaneo por protocolo UDP a un puerto
    hping {IP} -Q -p {port} -s                                  # Captura del número de secuencia de los paquetes
    hping -1 {IP acabada en x} --rand-dest -I {interfaz de red} # Escaneo de subred buscando dispositivos activos
    hping -9 HTTP -I {interfaz de red}                          # Intercepta todo el trafico HTTP de la red
    hping -S {IP spoofeada} -a {IP víctima} -p22 --flood        # Ataque de inundación