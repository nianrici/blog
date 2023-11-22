---
title: 'Ataques informáticos (Work in progress)'
description: 'Simplificación de los distintos tipos de ciberataques'
pubDate: 2023-04-16
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/attacks.png'
    alt: ""
tags: ["hacking", "knowledge base", "DDOS", "smurf", "teardrop" ]
---

## Ataques DoS
Ataques diseñados para denegar el servicio por parte de un servidor.

### Teardrop Attack
El ataque "Teardrop" explota una vulnerabilidad en la forma en que se reensamblan los paquetes de datos.

Cuando se envían datos por Internet, se dividen en fragmentos más pequeños en el sistema de origen y se vuelven a unir en el sistema de destino. Cada fragmento se divide en paquetes más pequeños, cada uno con un rango específico de datos. Estos paquetes tienen un campo OFFSET en su encabezado TCP que indica el rango de datos que lleva el paquete.

En un ataque de Teardrop, se envían paquetes de datos superpuestos al sistema de destino, lo que hace que no pueda volver a ensamblarlos correctamente y se bloquee, cuelgue o reinicie el sistema. Este ataque se logra enviando paquetes de datos con valores de OFFSET superpuestos en lugar de valores separados y distintos.

! **Nota**: cada 3 símbolos de"underscore"equivalen a un paquete de datos.
Normalmente, un sistema recibe paquetes de datos de la siguiente forma, sin valores de Offset solapados.
```ruby
_ _ _ (de 1 a 1500 bytes) _ _ _ (de 1501 a 3000 bytes) _ _ _ (de 3001 a 4500 bytes) 
```
Ahora, en un ataque Teardrop, los paquetes de datos se envían al sistema objetivo tal que así:
```ruby
_ _ _ (de 1 a 1500 bytes) _ _ _ (de 1500 a 3000 bytes) _ _ _ (de 1001 a 3600 bytes)
```

### Ping de la muerte (Ping of Death)
Esta vulnerabilidad es bastante conocida y antes se usaba comúnmente para hacer que sistemas remotos se detuvieran (o incluso para forzarlos a reiniciar) para que los usuarios no pudieran usar sus servicios. Este tipo de ataque ya no funciona, ya que casi todos los administradores de sistemas habrían actualizado sus sistemas para protegerlos de tales ataques.

En este ataque, se envía al sistema objetivo un paquete de datos que excede el máximo de bytes permitidos por TCP/IP, que es 65,536. Esto solía causar que el sistema remoto se detuviera, reiniciara o se bloqueara. Este ataque de denegación de servicio (DoS) se podía llevar a cabo incluso a través de la línea de comandos, de la siguiente manera:

El siguiente comando de ping crea un datagrama gigante del tamaño de 65540 para Ping. Esto podría hacer que la computadora de la víctima se detenga:  

```powershell
C:\windows>ping -l 65540
```

### Ataque pitufo (smurf attack)
El nombre hace gracia, pero es devastador si no se pilla a tiempo: El ataque Smurf es un tipo de ataque que se dirige a una dirección de red vulnerable. El ataque se realiza enviando muchos mensajes de solicitud de respuesta (paquetes "ICMP ECHO REQUEST") a la dirección de red vulnerable. Estos mensajes se envían desde una fuente falsificada, que parece ser la dirección de la víctima real. El objetivo de este ataque es inundar la red con tantos mensajes que la red se vuelva inaccesible para los usuarios legítimos. Es como si muchas personas intentaran entrar por la misma puerta al mismo tiempo, lo que haría que nadie pudiera entrar o salir. 

El ataque Smurf es un tipo de ataque de "reflector asimétrico" porque el atacante usa una dirección falsa para enviar mensajes a la dirección de red vulnerable. Esto hace que sea más difícil rastrear al atacante y detener el ataque.

### Ataque Fraggle (si ,fraggle attack)
El ataque Fraggle es una variante del ataque Smurf que envía paquetes UDP a puertos de "echo" o "chargen" en direcciones de transmisión y falsifica la dirección de origen de la víctima. Por lo general, los puertos de "echo" o "chargen" se utilizan para enviar datos de prueba entre computadoras, pero en este ataque, los atacantes los utilizan para inundar la red con mensajes. Los puertos de "echo" y "chargen" son puertos de red que se utilizan a menudo para transmitir datos de prueba entre dispositivos de red. El puerto 7 es el puerto estándar utilizado para el servicio "echo", mientras que el puerto 19 es el puerto utilizado para el servicio "chargen". 

Al igual que el ataque Smurf, el objetivo de este ataque es enviar tantos mensajes que la red se vuelva inaccesible para los usuarios legítimos. El ataque Fraggle es similar al ataque Smurf, pero en lugar de enviar mensajes ICMP, envía mensajes UDP. El ataque Fraggle también utiliza una dirección de origen falsa, lo que hace que sea más difícil para los investigadores rastrear al atacante y detener el ataque.



#### Referencias:
- [http://www.dankalia.com/tutor/01001/0100101077.htm](http://www.dankalia.com/tutor/01001/0100101077.htm)
