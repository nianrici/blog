---
title: 'Three-way handshake'
description: 'Breve introducción al 3whs'
pubDate: 2023-01-02
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/3-way-handshake-neon-ambiance-abstract-black-oil-gear-mecha-detailed-acrylic-grunge-intricate--456777264.png'
    alt: ""
tags: ["security", "networking", "tcp-ip"]
---

El three-way handshake es un proceso utilizado por el protocolo TCP (Transmission Control Protocol) para establecer una conexión de manera segura y confiable. Se llama así porque implica el intercambio de tres paquetes entre los dos host que desean establecer la conexión.

El three-way handshake se lleva a cabo de la siguiente manera:

1.  El host A envía un paquete con la bandera SYN (Synchronize) establecida al host B. Este paquete indica que A quiere establecer una conexión con B.
2.  El host B recibe el paquete y envía una respuesta con la bandera SYN y ACK (Acknowledge) establecidas. Esto indica que B ha recibido el paquete y está listo para establecer la conexión.
3.  El host A recibe el paquete de respuesta y envía una respuesta con la bandera ACK establecida. Esto indica que A ha recibido el paquete de respuesta y que la conexión ha sido establecida.

Una vez que se ha completado el three-way handshake, los host A y B pueden comenzar a enviar y recibir datos de manera segura y confiable a través de la conexión TCP.



