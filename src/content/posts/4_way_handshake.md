---
title: "Four-way handshake"
description: 'Breve introducción al 4whs'
pubDate: 2023-01-24
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/3-way-handshake-pixel-art-456777264.png'
    alt: ""
tags: ["security", "networking", "tcp-ip"]
---

Para finalizar una conexión TCP, se utiliza un proceso similar al three-way handshake llamado four-way handshake. Este proceso implica el intercambio de cuatro paquetes entre los dos host que desean finalizar la conexión.

El four-way handshake se lleva a cabo de la siguiente manera:

1.  El host A envía un paquete con la bandera FIN (Finish) establecida al host B. Este paquete indica que A ha terminado de enviar datos y quiere cerrar la conexión.
2.  El host B recibe el paquete y envía una respuesta con la bandera ACK (Acknowledge) establecida. Esto indica que B ha recibido el paquete y ha comprendido la solicitud de cierre de conexión.
3.  El host B envía un paquete con la bandera FIN establecida al host A. Este paquete indica que B ha terminado de enviar datos y quiere cerrar la conexión.
4.  El host A recibe el paquete y envía una respuesta con la bandera ACK establecida. Esto indica que A ha recibido el paquete y ha comprendido la solicitud de cierre de conexión.

Una vez que se ha completado el four-way handshake, la conexión TCP se ha cerrado de manera segura y confiable. Los host A y B dan por finalizada la transmisión de datos a través de la conexión TCP.

