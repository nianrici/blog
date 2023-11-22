---
title: "FFMPEG (Work In Progress)"
description: '¿Y eso que es?'
pubDate: 2022-12-14
author: 'Nicolas Riquelme'
image: 
    url: '/src/assets/images/pixel-art-bat-signal-.png'
    alt: ""
tags: ["CLI", "video", "knowledge base"]
---

## Recortar la duración de un video:

Este comando recortará el video de la posición 00:00:30 (es decir, 30 segundos después del inicio del video) hasta la posición 00:01:00 (es decir, 1 minuto después del inicio del video), y guardará el resultado en un nuevo archivo llamado output.mp4.

    ffmpeg -i input.mp4 -ss 00:00:30 -to 00:01:00 -c copy output.mp4

Si quieres especificar solo el inicio o solo el final del clip a recortar, puedes usar -ss para especificar el inicio y omitir -to, o usar -to para especificar el final y omitir -ss.

