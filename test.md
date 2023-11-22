## Introducción

Suricata es un sistema de detección de intrusos de red (IDS) de alta
velocidad y de código abierto que puede analizar el tráfico de red en
busca de amenazas de seguridad. En este tutorial, se explicará cómo
instalar y configurar Suricata en un sistema basado en Debian.

## 1- Instalar Suricata {#1instalar-suricata}

Lo primero que hay que hacer es instalar Suricata. Para ello, abrimos
una terminal y ejecutamos los siguientes comandos:

``` bash
sudo apt update && sudo apt upgrade -y\nsudo apt install suricata -y
```

Esto actualizará la lista de paquetes y luego instalará Suricata junto
con sus dependencias.

## 2- Configurar Suricata {#2configurar-suricata}

Una vez que se ha instalado Suricata, es necesario configurarlo para que
pueda analizar el tráfico de red y detectar posibles amenazas de
seguridad. Para ello, se debe editar el archivo de configuración
principal de Suricata, que se encuentra en
`/etc/suricata/suricata.yaml`.

Para hacerlo, abrimos una terminal yejecutamos el siguiente comando:

``` bash
sudo nvim /etc/suricata/suricata.yaml
```

Este comando abrirá el archivo de configuración de Suricata en nuestro
editor de texto de cabecera. Una vez abierto, los creadores han tenido a
bien ordenar paso por paso la configuración, por lo que leyendo de
arriba a abajo, deberíamos ser capaces de configurarlo todo sin dejarnos
nada por el camino.

### 2.1 - Configurar la red {#21configurar-la-red}

En el archivo de configuración de Suricata, veremos que el primer paso
consiste en decirle a Suricata \"cuales son sus dominios\", es decir,
cómo tenemos estructurada la red.

### 2.2 - Configurar los outputs {#22configurar-los-outputs}

En este paso le indicaremos lo que queremos hacer con los logs que
genere (la frecuencia, ubicaciones, protocolos a vigilar, etc\...). Para
un uso doméstico y por aquello de estar en una Raspi, lo dejaremos tal y
como está, ya que en principio y si todo va bien, no le vamos a dar un
uso intensivo; en cambio, de instalarlo en la red del laboratorio para
hacer pruebas y ponerlo a prueba, ya sería otra historia.

### 2.3 - Opciones de captura {#23opciones-de-captura}

En este paso, lo primero que se debe especificar la interfaz de red que
se utilizará para analizar el tráfico. Esto se hace en la sección
`af-packet`.

Busca la siguiente línea:

``` toml
# - interface: eth0
```

Descomenta la línea eliminando el símbolo `#` y cambia `eth0` por el
nombre de la interfaz de red que desees utilizar.

Por ejemplo, si deseas utilizar la interfaz `eth1` , que no es mi caso,
la línea debería quedar de la siguiente manera:

``` toml
- interface: eth1
```

### 2.4 - Configuración de los protocolos de la capa de aplicación (capa 4 del modelo TCP/IP o capa 7 del modelo OSI) {#24configuraci%C3%B3n-de-los-protocolos-de-la-capa-de-aplicaci%C3%B3n-capa-4-del-modelo-tcpip-o-capa-7-del-modelo-osi}

El título es bastante descriptivo, seleccionaremos los protocolos que
deberán ser auditados en todo momento. La lista es extensa y no hay
mucho misterio ya que el archivo de configuración viene con toda la
información necesaria en forma de comentarios.

### 2.5 - Configuración avanzada {#25configuraci%C3%B3n-avanzada}

Llegados a este punto, sólo cabe señalar que si disponemos de VLANs u
otras configuraciones avanzadas, esta sección muy posiblemente cubra las
necesidades para mantenerla vigilada con garantías. Incluye
configuración de las capturas, optimizaciones varias del motor de
Suricata, configuraciones específicas para VLANs, etc\... Suricata
utiliza reglas de detección para identificar posibles amenazas de
seguridad. Estas reglas se encuentran en archivos `.rules` que se
encuentran en el directorio `/etc/suricata/rules/`.

Para descargar las reglas más recientes, ejecuta el siguiente comando:

``` bash
sudo suricata-update
```

Una vez que se hayan descargado las reglas, se deben agregar al archivo
de configuración deSuricata para que se utilicen durante el análisis de
tráfico.

En el archivo de configuración de Suricata
(`/etc/suricata/suricata.yaml`), busca la sección `rule-files`.
Asegúrate de que la siguiente línea esté descomentada:

``` yaml
default-rule-path: /etc/suricata/rules\n\nrule-files:\n  - *.rules
```

Esto permitirá que Suricata utilice todas las reglas de detección que se
encuentren en el directorio `/etc/suricata/rules/`.

## Paso 3: Iniciar Suricata

Una vez que se ha configurado Suricata, se puede iniciar el servicio
para que comience a analizar el tráfico de red en busca de amenazas.

Para iniciar Suricata, ejecuta el siguiente comando:

``` bash
sudo service suricata start
```

Si deseas verificar el estado de Suricata, puedes ejecutar el siguiente
comando:

``` bash
sudo service suricata status\n
```

## Conclusión {#conclusi%C3%B3n}

En este tutorial, se ha explicado cómo instalar y configurar de manera
muy básica Suricata en un sistema basado en Debian. Ahora, Suricata está
listo para analizar el tráfico de red y detectar posibles amenazas de
seguridad en el sistema.

Es importante recordar que Suricata es una herramienta poderosa que
puede generar muchos registros y alertas, por lo que es importante
revisarlos y analizarlos regularmente para asegurarse de que no se estén
pasando por alto amenazas de seguridad importantes. Además, se puede
considerar la configuración de alertas por correo electrónico o
integración con otras herramientas de seguridad para mejorar la eficacia
de Suricata en la detección de amenazas de seguridad.

------------------------------------------------------------------------

Referencias:

-   Página web del proyecto [Suricata](https://suricata.io)
-   Video de Youtube del canal
    [HackerSploit](https://www.youtube.com/watch?v=UXKbh0jPPpg)
