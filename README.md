# Resumen

El proyecto Reporte de ventas, esta realizado para la gestion de las misma, para asi facilitar la visualizacion de las ventas realizadas dentro de la tienda. Realizado con tecnologias estable y eficientes.

## Tecnologias

#### Backend 
- Python 3.9
- Framework Flask

#### FrontEnd
- React.ts
- Vite
- Typescript
- Tailwind css

#### Base de datos.
- Postgresql.

## Usabilidad

- Descargar node.js

```bash
 https://nodejs.org/en/download/package-manager
```

- Clonar el repositorio.

```bash
  git clone "https://github.com/MiguelZea12/Management-Sales.git"
```

- Abrir la carpeta en un editor de video. 

- Crear un entorno virtual con la version de python 3.9.

```bash
 python -m venv venv
```
- Crear un entorno de desarrolo .env en la raiz del proyecto. Un ejemplo

```bash
ENVIRONMENT = "DEV"
DEV_DATABASE_URI = "postgresql+psycopg2://postgres:contraseña@localhost:5432/nombreDeLaBaseDeDatos"
PROD_DATABASE_URI = ""
```

- Activar el entorno virtual.

```bash
 cd /venv/Script/activate.bat
```

- Volver a la raiz del proyecto.

```bash
 cd..
```

- Instalar todos las dependencias del backend desde la raiz y con el archivo requirements.txt.

```bash
 pip install -r requirements.txt
```

#### Instalar todas las dependencias de frontEnd.

- Entramos a la carpeta del frontend.

```bash
 cd app_front
```
- Instalamos la dependencia.

```bash
 npm install
```

- Puede darse el caso que les falte instalar esta dependencias.

```bash
 npm install @fortawesome/free-solid-svg-icons

 npm install @fortawesome/react-fontawesome
```

## Inicializacion.

Para la inicializar la app, debe de inicializarse el backend y el frontend para usarse.

- En el proyecto raiz se inicializa el backend.

```bash
 python .\run.py
```

- En la carpeta de frontend se inicializa el frontend.

- Se entra a la carpeta
```bash
 cd app_front
```

- Se inicializa con npm.
 ```bash
 npm run dev
 ```

# Autor

- [@Alejandro Zea](https://github.com/MiguelZea12)
- [@Aldair Toala](https://github.com/Aldair2003)