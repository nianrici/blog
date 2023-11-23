---
title: "Banderas del protocolo TCP/IP"
description: 'Introducción a las banderas del protocolo TCP/IP'
pubDate: 2022-10-24
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/fun-with-flags.png'
    alt: ""
tags: ["security", "networking", "tcp-ip"]
---
 
Las banderas del protocolo TCP son bits que se utilizan para controlar el comportamiento de los paquetes durante su transmisión a través de la red. Hay seis banderas principales: URG (Urgente), ACK (Reconocimiento), PSH (Push), RST (Reset), SYN (Sincronización) y FIN (Finalización).

-   **URG**: Indica que el paquete contiene datos urgentes que deben ser procesados inmediatamente.
-   **ACK**: Indica que el paquete es un reconocimiento de un paquete recibido anteriormente.
-   **PSH**: Indica que el emisor quiere que los datos sean entregados al receptor lo antes posible.
-   **RST**: Indica que la conexión debe ser reiniciada.
-   **SYN**: Indica que el emisor quiere establecer una conexión con el receptor.
-   **FIN**: Indica que el emisor ha terminado de enviar datos y quiere cerrar la conexión.


<a id="org3507cb5"></a>

# **Numeración de los paquetes**

La numeración de los paquetes es importante para asegurar que todos los fragmentos de un paquete lleguen a su destino y puedan ser reensamblados correctamente. Cada fragmento de un paquete tiene un número de secuencia que indica su posición en el paquete original.

El protocolo TCP utiliza un mecanismo llamado “ventana deslizante” para controlar el flujo de datos entre el emisor y el receptor. La ventana deslizante indica cuántos bytes puede enviar el emisor antes de recibir un reconocimiento del receptor. El tamaño de la ventana deslizante puede variar dinámicamente en función de las condiciones de la red.

Cuando el emisor envía un paquete, aumenta su número de secuencia en función del tamaño del paquete enviado. Cuando el receptor recibe un paquete, envía un reconocimiento al emisor con el número de secuencia del siguiente byte que espera recibir. Si el emisor no recibe un reconocimiento en un tiempo determinado, retransmite el paquete.


<a id="org5220960"></a>

# **Información que se puede extraer del TTL**

El TTL (Time To Live) es un campo en el encabezado IP que indica cuántos saltos (enrutadores) puede atravesar un paquete antes de ser descartado. Cada vez que un paquete pasa por un enrutador, el valor del TTL se reduce en uno. Si el valor del TTL llega a cero, el paquete es descartado y se envía un mensaje ICMP de &ldquo;Tiempo excedido&rdquo; al emisor.

El valor del TTL puede ser útil para determinar la distancia entre dos dispositivos en una red. También puede ser utilizado para detectar bucles de enrutamiento y otros problemas en la red.

Además, el valor del TTL nos puede ayudar a determinar el sistema operativo del equipo emisor. Cada sistema operativo tiene un valor predeterminado para el TTL de los paquetes que envía. Por ejemplo, los sistemas Windows suelen utilizar un TTL de 128, mientras que los sistemas Linux utilizan un TTL de 64. Al analizar el valor del TTL de un paquete recibido, podemos hacer una estimación del sistema operativo del equipo emisor.


<a id="orgee742fd"></a>

# **Referencias**

-   [RFC 9293](https://datatracker.ietf.org/doc/html/rfc9293): Transmission Control Protocol
-   [RFC 792](https://datatracker.ietf.org/doc/html/rfc792): Internet Control Message Protocol
-   [RFC 1812](https://datatracker.ietf.org/doc/html/rfc1812): Requirements for IP Version 4 Routers

