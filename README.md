# ProyectoTesis
Este repositorio contiene un sistema completo que integra un **backend** con Express y MongoDB y un **frontend** con React y Vite. El proyecto utiliza Docker para simplificar el despliegue y ejecución de todos los servicios.


## Tecnologías Utilizadas 🌐

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Joi, Socket.IO
- **Frontend**: React, Vite, JS-Cookie
- **Base de datos**: MongoDB
- **Docker**: Para contenedores y orquestación de servicios con Docker Compose.


## Requisitos Previos

### Clona el repositorio:
```
git clone https://github.com/magdielaraneda/ProyectoTaller.git
cd ProyectoTesis
```
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas en tu máquina:

1. **Node.js** (versión 16 o superior): [Descargar aquí](https://nodejs.org/)
2. **Docker y Docker Compose**: [Instalar Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. **MongoDB Atlas** (opcional si no deseas usar la instancia local).


## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:
```
/proyectotesis
├── backend/                  # Código fuente del backend
│   ├── src/                  # Lógica principal
│   ├── package.json          # Dependencias del backend
│   ├── package-lock.json     # Bloqueo de dependencias del backend
│   ├── dockerfile            # Dockerfile para el backend
│   └── .gitignore            # Archivos ignorados del backend
│
├── frontend/                 # Código fuente del frontend
│   ├── src/                  # Componentes y lógica
│   ├── public/               # Archivos públicos
│   ├── package.json          # Dependencias del frontend
│   ├── package-lock.json     # Bloqueo de dependencias del frontend
│   ├── dockerfile            # Dockerfile para el frontend
│   ├── .env                  # Variables de entorno del frontend
│   ├── vite.config.js        # Configuración de Vite
│   ├── tailwind.config.js    # Configuración de Tailwind CSS
│   └── .gitignore            # Archivos ignorados del frontend
│
├── .gitattributes            # Configuración global de atributos Git (saltos de línea, binarios, etc.)
├── docker-compose.yml        # Orquestación de servicios Docker
└── README.md                 # Documentación principal del proyecto

```

## Configuración del Proyecto ⚙️

### Variables de Entorno

#### Backend

Crea un archivo **`.env`** en la carpeta **`config/`** que esta dentro de la carpeta src del backend con las siguientes variables:
- accede primero a la carpeta config:
```
cd backend/
cd src/
cd config/
```
#### .env  

```
PORT=3000
HOST=localhost
DB_URL=mongodb+srv://magdielaraneda2001:QU97Ocnl2R4sjHFi@usodesalas.j9dgbj3.mongodb.net/?retryWrites=true&w=majority&appName=UsoDeSalas
ACCESS_JWT_SECRET=EXNLX1KT2AJAMXM19G4CBHY16GI8AL6S4DKC6VLNH1UV2E9K1GR43YMXZFAF2XGCIUJBUUA11ETGSRMCM
REFRESH_JWT_SECRET=YLWGP3X1HED396SRWFGNTXYJX1ZU6L9K27VWTG7UE8JES7I2ACV2RJL2GWA3AQJRCC200FHKBEX95DJV7
API_KEY=re_MvmsG22A_Gh5idqBTzjAkb6aJS8qa9uy4

```

#### Frontend

Crea un archivo **`.env`** en la carpeta **`frontend`** con la siguiente variable:

```
VITE_BACKEND_URL=http://localhost:3000
```


## Ejecución del Proyecto 🚀
### -Instalación del Backend

#### 1. Navega a la carpeta backend e instala las dependencias:
```
cd backend
npm install
```

#### 2. Inicia el servidor del backend:
```
npm start
```
El backend estará disponible en: http://localhost:3000.

### -Instalación del Frontend

#### 1. Navega a la carpeta frontend e instala las dependencias:
```
cd frontend
npm install
```

#### 2. Inicia el servidor del frontend:
```
npm run dev
```
El frontend estará disponible en: http://localhost:5173.

## Ejecución de Pruebas 📝
### Backend
#### Para ejecutar las pruebas del backend, usa el siguiente comando:
```
cd backend
npm run test
```
### Frontend
#### Para ejecutar pruebas con Cypress, utiliza:
```
cd frontend
npx cypress open
```

## Funcionalidades y Uso de la Aplicación
### Funcionalidades Principales:
- **Autenticación y Autorización:** Registro, inicio de sesión y roles (admin, gerente, colaborador).
- **Sistema de Reportes:** Generación, visualización y gestión de reportes.
- **Integración con MongoDB:** Base de datos con soporte a estructuras relacionales.
- **Navegación Dinámica:** UI dinámica según el rol del usuario.


## Acceso a los Servicios
Una vez que los contenedores estén levantados, accede a los servicios en los siguientes puertos:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **MongoDB:** Puerto 27017 (en contenedor)


## Base de Datos
#### El proyecto utiliza **MongoDB** como base de datos. 
Puedes usar una instancia local o una base de datos alojada en MongoDB Atlas.
- La URL de conexión actual en el archivo .env es:
```
DB_URL=mongodb+srv://magdielaraneda2001:QU97Ocnl2R4sjHFi@usodesalas.j9dgbj3.mongodb.net/?retryWrites=true&w=majority&appName=UsoDeSalas
```

## Compatibilidad de Sistema Operativo
### Este proyecto es compatible con los siguientes sistemas operativos:

- Windows 10/11
- Ubuntu 20.04 / 22.04 (Linux)
- macOS Monterey / Ventura
   
#### Requisitos previos
Para asegurar el funcionamiento del proyecto, verifica que el sistema cumpla con los siguientes requisitos:
1. Node.js (versión 16 o superior):
2. Descarga e instala desde: https://nodejs.org
3. MongoDB (local o en la nube):

- Si usas una base de datos local, asegúrate de que el servicio MongoDB esté activo.
Si prefieres MongoDB Atlas, configura las variables de entorno correspondientes en el archivo .env.

4. Navegador Web:
Cualquier navegador moderno como Chrome, Firefox, o Edge.

## Notas por Sistema Operativo

### Windows
- Instala Node.js desde el instalador oficial.
- Asegúrate de añadir node y npm al PATH durante la instalación.
- Verifica que MongoDB esté ejecutándose localmente o usa MongoDB Atlas.

### Linux (Ubuntu)
- Instala Node.js utilizando apt (o nvm si prefieres manejar versiones).
```
sudo apt update
sudo apt install nodejs npm -y
```
- Verifica la instalación con:
```
node -v
npm -v
````
- Instala MongoDB localmente o configura MongoDB Atlas.

### macOS
- Instala Homebrew si aún no lo tienes:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- Instala Node.js y npm con:
```
brew install node
```
- Verifica la instalación:
```
node -v
npm -v
```
- Configura MongoDB localmente o usa MongoDB Atlas.

## License / Licencia ©️

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this code under the terms of the license.  

Este proyecto está licenciado bajo la **Licencia MIT**.  
Eres libre de usar, modificar y distribuir este código bajo los términos de la licencia.

See the full license in the [LICENSE](./LICENSE) file.  
Consulta la licencia completa en el archivo [LICENSE](./LICENSE).
