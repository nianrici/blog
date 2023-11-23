---
title: 'Testing para Flask'
description: 'Tutorial espartano para escribir tests con Flask'
pubDate: 2023-08-18
author: 'Nicolas Riquelme'
image: 
    url: '/public/images/python_1.png'
    alt: ""
tags: ["testing", "python", "Flask"]
---

## Importar módulos
Importamos unittest y Flask:
```python
        import unittest
        from flask import Flask
```
## Crear clase de tests
Creamos una clase que herede de unittest.TestCase:

```python
        class FlaskTests(unittest.TestCase):

          # tests aquí
```

## Inicializar la app
Inicializamos la app de Flask en el método setUp():

```python
        def setUp(self):
          self.app = Flask(__name__)
```

## Escribir tests para vistas
Escribimos tests para las vistas con el cliente de tests:

```python
        def test_index(self):
          with self.app.test_client() as client:  
            res = client.get('/')
            self.assertEqual(res.status_code, 200)
```

## Mockear partes complejas
Mockeamos con @mock.patch para reemplazar partes complejas:

```python
        @mock.patch('requests.get')
        def test_api(self, mock_get):
          # Testea API mockeada
```

## Configurar base de datos de tests
Usamos SQLite en memoria para los tests:

```python
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
```

## Ejecutar tests
Ejecutamos los tests con unittest:

```python
        python -m unittest
```

## Revisar cobertura
Vemos la cobertura de código con coverage:

```python
        coverage run -m unittest
        coverage report
```

## Configurar CI
Configuramos CI para ejecutar tests automáticamente.

1. Elige un servicio de CI como GitHub Actions, Travis CI o CircleCI.
2. Crea un archivo de configuración para ese servicio en tu repo. Por ejemplo, `.github/workflows/ci.yml` para GitHub Actions.
3. Define el trigger para ejecutar la CI. Normalmente quieres que se ejecute en cada push a tu repo.
4. Especifica los pasos de la CI:  
4.1. Haz checkout del código del repo.  
4.2. Configura el entorno virtual con pyenv, virtualenv, etc.  
4.3. Instala dependencias con pip install.  
4.4. Ejecuta los tests con un comando como `python -m unittest`.  
4.5. Opcionalmente, revisa la cobertura de código.
5. El servicio de CI ejecutará estos pasos automáticamente cada vez que hagas push.
6. Revisa los resultados de la ejecución de la CI en la interfaz del servicio. Te avisará si algún test falla.
7. Arregla los tests fallidos antes de hacer merge a la rama principal. Esto asegura que solo código testeado llegue a producción.
8. Opcionalmente, configura la CI para desplegar tu app automáticamente si los tests pasan.
