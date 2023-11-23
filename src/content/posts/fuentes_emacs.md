---
title: 'Tip: Ver como quedan las fuentes en Emacs'
description: 'Script para visualizar las fuentes en Emacs'
pubDate: 2023-03-08
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/a-computer-in-the-style-of-hayao-miyazaki-.png'
    alt: ""
tags: ["emacs", "pro-tip"]
---

El otro día me di cuenta de que mi Emacs era más soso que un plato de sopa de hospital, así que decidí cambiar algunas cosillas aquí y allá... cambié el tema, lo cual fue tan facil como cambiar un par de líneas en el `init.el y luego dije "venga, vamos a cambiar los tipos de letras". Aquí empezó un calvario por el que no quiero volver a pasar. 

Tras mucho darme contra los muros de `lisp`, al querer hacer una función para crear un buffer con un pangrama para ver todos los típos de letras y cómo quedaban, me decidí a echar mano de la IA. Craso error. O no me supe explicar (lo cual no descarto) o las que usé exageraron con sus conocimientos sobre `lisp`, porque más que avanzar, iba hacia atrás.

La frustración y el sueño pudieron conmigo, y menos mal, porque en la cama tuve una revelación: ¿no tiene emacs una wiki que está casi a la altura de la de Archlinux? Dicho y hecho, me quedé dormido (pastillas para dormir, benditas sean). Pero al día siguiente busqué y a la primera, di con el siguiente código, que hace exactamente lo que yo necesitaba:
```lisp
        (require 'cl-lib)
        (require 'cl-extra)
        (let ((str "The quick brown fox jumps over the lazy dog ´`''\"\"1lI|¦!Ø0Oo{[()]}.,:; ")
              (font-families (cl-remove-duplicates 
        		      (sort (font-family-list) 
        			    (lambda(x y) (string< (upcase x) (upcase y))))
        		      :test 'cl-equalp)))
          (dolist (ff font-families)
            (insert 
             (propertize str 'font-lock-face `(:family ,ff))               ff "\n"
             (propertize str 'font-lock-face `(:family ,ff :slant italic)) ff "\n")))
 ``` 
 Y con esto ya podía ver cómo quedaban las fuentes, escogí las que necesitaba y un comando que descubrí en la primera parte fue `counsel-fonts`, el cual te muestra en un minibuffer cómo quedan las fuentes, pero sin el pangrama, (lo cual no permitía ver si las O y los 0, o si el 1, la l y la i son fácilmente diferenciables ). Peeeeeero, si lo usas para buscar la fuente que te interesa, también verás las variaciones y al seleccionar una, pega el nombre en el buffer actual, por lo que no hace falta que te juegues la vida poniendo el nombre de la fuente de memoria. Útil a la par que conveniente. 
