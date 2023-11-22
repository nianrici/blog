---
title: 'El maravilloso comando Find'
description: 'Introducción al comando Find y cosas que puede hacer a parte de bustar archivos o carpetas'
pubDate: 2023-11-22
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/find.png'
    alt: ""
tags: ["find", "posix", "tips", "linux", "basics" ]
---

El comando find es una herramienta muy poderosa que te permite encontrar archivos y directorios de forma "relativamente" sencilla (ya entenderás el entrecomillado a medida quelo vayas usando). Algunos de los comandos que puedes usar para buscar archivos y carpetas en Linux son:

### Buscar un archivo recursivamente
```bash
find . -type f -name "loquesea"
```

### Buscar una carpeta con un nombre determinado (case insensitive)
```bash
find . -type d -iname "nombre de la carpeta"
```

El manual de find es casi insondable y ofrece una cantidad de posibilidades de locura:

### Buscar un archivo por sus permisos
```bash
find . -type f -perm 644 2>/dev/null
```
Lo del ***2>/dev/null*** es para enviar los errores de permisos de la salida estándar a ***/dev/null*** que es el equivalente a un agujero negro dentro del sistema. Básicamente lo que hacemos con ello es que no nos muestre los errores, sólo las coincidencias.

### Buscar archivos por su tamaño
```bash
find . -type f -size X
```
Si pones le pones un ***+*** l tamaño, buscará archivos de ***X*** o mayor tamaño y si pones le pones un ***-*** hará lo mismo, pero a la inversa. Por otro lado, se debe indicar la magnitud (G,M,b,B,c, etc...).

Pero aparte de buscar, se puede usar para muchas otras cosas, como por ejemplo:

### Renombrado de archivos
```bash
find . -name "archivo*" -exec rename loquebuscas lamodificacion {} \;
```

### Borrado de archivos que no cumplan con cierta condición
```bash
find . ! -name "lo que desaeas mantener" -delete
```

### Hacer copias de seguridad
```bash
find . -type f -name "lo que quieras archivar" -exec tar czf nombredelbackup.tar.gz {} +
```

Al final nuestra imaginación es el límite para esta herramienta, ya que con el ***-exec*** le puedes especificar que hacer con cada archivo que encuentra. Una maravilla, la verdad.
