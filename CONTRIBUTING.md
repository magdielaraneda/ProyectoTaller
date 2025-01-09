# Aplicación web de apoyo a la gestión para la empresa INSERV-CHILE 🫧

*Gracias por tu interés en contribuir a este proyecto. Estamos agradecidos de contar con tu apoyo y compromiso para mejorar este software. Esperamos un ambiente colaborativo basado en el respeto mutuo, la inclusión y la profesionalidad.*


## Introducción y Agradecimientos 🤝
**Bienvenido** a nuestro proyecto. Queremos expresar nuestra más sincera gratitud por tu interés en contribuir. Este proyecto se basa en la colaboración, y tu ayuda es fundamental para su éxito. Nuestro deseo es fomentar una cultura inclusiva y de respeto, donde cada idea cuenta y cada contribución es valorada, no temas en dar tu valioso aporte.


## Código de Conducta 🚨

#### Nuestro Compromiso
Con el interés de fomentar una comunidad abierta y acogedora, nosotros, como colaboradores y responsables de este proyecto, nos comprometemos a hacer de la participación en nuestro proyecto y comunidad una experiencia libre de acoso para todos, independientemente de su edad, tamaño corporal, discapacidad visible o invisible, etnia, características sexuales, identidad y expresión de género, nivel de experiencia, educación, estatus socioeconómico, nacionalidad, apariencia personal, raza, religión, identidad y orientación sexual.
Nuestros Estándares
Ejemplos de comportamiento que contribuyen a crear un ambiente positivo:
- **Usar un lenguaje acogedor e inclusivo.**
- **Ser respetuoso con los diferentes puntos de vista y experiencias.**
- **Aceptar con gracia las críticas constructivas.**
- **Centrarse en lo que es mejor para la comunidad.**
- **Mostrar empatía hacia otros miembros de la comunidad.**

#### Ejemplos de comportamiento inaceptable:
- **Uso de lenguaje o imágenes sexualizadas y atención o avances sexuales no deseados.**
- **Comentarios insultantes/trolls, ataques personales o políticos.**
- **Acoso público o privado.**
- **Publicar información privada de otros sin su consentimiento explícito.**
- **Otras conductas que puedan considerarse razonablemente inapropiadas en un entorno profesional.**

#### Responsabilidades
Los responsables del mantenimiento del proyecto son responsables de aclarar los estándares de comportamiento aceptable y se espera que tomen medidas correctivas apropiadas y justas en respuesta a cualquier instancia de comportamiento inaceptable.

#### Alcance
Este código de conducta se aplica tanto en los espacios del proyecto como en los espacios públicos cuando un individuo representa al proyecto o a su comunidad.

#### Aplicación
Las instancias de comportamiento abusivo, acosador o inaceptable pueden reportarse contactando al equipo del proyecto en [magdiel.araneda2001@alumnos.ubiobio.cl](magdiel.araneda2001@alumnos.ubiobio.cl) Todas las quejas serán revisadas e investigadas y resultarán en una respuesta que se considere necesaria y apropiada según las circunstancias. El equipo está obligado a mantener la confidencialidad con respecto al reportero de un incidente.

##### Atribución
Este Código de Conducta está adaptado del [Contributor Covenant](https://www.contributor-covenant.org/), versión 2.1. 


---
## ¿Cómo Contribuir? 
#### Reportar Errores

 **1.** Verifica que el error no haya sido reportado previamente buscando en la sección de Issues.
 
 **2.** Si es un nuevo error, crea un Issue detallando:
 - Una descripción clara del problema.
 - Los pasos para reproducirlo.
 - El comportamiento esperado.
 - Información adicional, como capturas de pantalla o registros de error.

#### Sugerir Mejoras
1. Abre un Issue describiendo la mejora propuesta.
2. Explica cómo esta mejora beneficiaría al proyecto.
3. Proporciona ejemplos o referencias si es posible.

#### Desarrollar Nuevas Funcionalidades
**1.** Haz un fork del repositorio haciendo clic en el botón "Fork" en la parte superior de la [página del repositorio](https://github.com/magdielaraneda/ProyectoTaller). 

**2.** Clona tu copia del repositorio a tu equipo:

```
git clone https://github.com/tu_usuario/ProyectoTaller.git
```

**3.** Crea una nueva rama para tu contribución:
```
git checkout -b feature/nueva-funcionalidad
```

**4.** Realiza los cambios necesarios en tu rama.Asegúrate de documentar adecuadamente el código y seguir los estándares de estilo del proyecto.

**5.** Confirma tus cambios y envíalos a tu repositorio remoto:
```
git add .
git commit -m "Agrega descripción de los cambios realizados"
git push origin feature/nueva-funcionalidad
```

**6.** Dirígete al repositorio original y crea un pull request desde tu rama. Asegúrate de proporcionar:

- Un título descriptivo.
- Una descripción detallada de los cambios realizados.
- Referencias a Issues relacionados si aplica.

**7.** Los responsables del proyecto analizarán tu contribución y proporcionarán retroalimentación si es necesario.

---

## Estándares de Estilo y Formato de Código 🖥️
**Para mantener un código uniforme y fácil de mantener, sigue estas pautas:**

#### Convenciones de Nombres
- Usa nombres descriptivos y consistentes para variables, métodos y clases. Por ejemplo, utiliza el formato *camelCase* para variables y funciones.
- Los nombres deben ser autoexplicativos y reflejar claramente su propósito dentro del código.

#### Formato de Código
- Indenta el código correctamente siguiendo la configuración estándar (2 espacios para JavaScript).
- Usa líneas de código cortas, evitando superar los 80-100 caracteres por línea.
- Separa bloques de código con líneas en blanco para mejorar la legibilidad.
- Utiliza comentarios claros para describir partes complejas del código. Prefiere comentarios concisos y precisos.

#### Estructura de Archivos
- Organiza los archivos en carpetas lógicas. Por ejemplo: `components/`, `services/`, `utils/`.
- Usa nombres consistentes para los archivos, reflejando su contenido. Ejemplo: `LoginForm.jsx` para un componente de formulario de inicio de sesión.
#### Estructura del Codigo

El proyecto está organizado de la siguiente manera:
```
/proyectotesis
├── backend/                  # Código fuente del backend
│   ├── src/                  # Lógica principal
│   │   ├── config/           # Archivos de configuración
│   │   ├── constants/        # Variables constantes
│   │   ├── controllers/      # Controladores de la lógica de negocio
│   │   ├── middlewares/      # Middlewares personalizados
│   │   ├── models/           # Definición de esquemas y modelos de datos
│   │   ├── routes/           # Definición de rutas de la API
│   │   ├── schema/           # Validación de datos
│   │   ├── services/         # Servicios y lógica reutilizable
│   │   ├── tests/            # Pruebas unitarias y funcionales
│   │   ├── uploads/          # Almacenamiento temporal de archivos subidos
│   │   └── utils/            # Funciones auxiliares
│   ├── index.js              # Punto de entrada del servidor
│   ├── package.json          # Dependencias y scripts del backend
│   ├── package-lock.json     # Bloqueo de dependencias
│   ├── dockerfile            # Dockerfile para contenedores del backend
│   └── .gitignore            # Archivos y carpetas ignorados en el backend
│
├── frontend/                 # Código fuente del frontend
│   ├── src/                  # Lógica principal del cliente
│   │   ├── assets/           # Archivos estáticos como imágenes e íconos
│   │   ├── components/       # Componentes reutilizables de la UI
│   │   ├── context/          # Manejo del estado global
│   │   ├── helpers/          # Funciones auxiliares
│   │   ├── routes/           # Definición de rutas del cliente
│   │   ├── services/         # Servicios que interactúan con la API
│   │   ├── App.css           # Estilos globales de la aplicación
│   │   ├── App.jsx           # Punto de entrada principal de React
│   │   ├── index.css         # Estilos globales adicionales
│   │   └── main.jsx          # Montaje de React en el DOM
│   ├── public/               # Archivos públicos (favicon, index.html)
│   ├── cypress/              # Pruebas end-to-end con Cypress
│   ├── package.json          # Dependencias y scripts del frontend
│   ├── package-lock.json     # Bloqueo de dependencias
│   ├── dockerfile            # Dockerfile para contenedores del frontend
│   ├── .env                  # Variables de entorno del frontend
│   ├── vite.config.js        # Configuración de Vite
│   ├── tailwind.config.js    # Configuración de Tailwind CSS
│   ├── eslint.config.js      # Configuración de ESLint
│   └── .gitignore            # Archivos y carpetas ignorados en el frontend
│
├── .gitattributes            # Configuración global de atributos Git (saltos de línea, binarios, etc.)
├── docker-compose.yml        # Orquestación de servicios Docker
├── LICENSE                   # Archivo de licencia del proyecto
└── README.md                 # Documentación principal del proyecto


```
## Estructura del Proyecto 📝

**El proyecto está desarrollado utilizando una arquitectura MERN (MongoDB, Express, React, Node.js), complementada con Docker para la orquestación de servicios. A continuación, se detalla cómo está organizada su estructura:**

### 1. Carpetas principales

#### /backend/

- Almacena toda la lógica y funcionalidad del servidor (API REST).

##### Subcarpetas y archivos:

- src/: Lógica principal del backend.

   - config/: Archivos de configuración (base de datos, JWT, etc.).

   - constants/: Variables constantes usadas en todo el proyecto.

   - controllers/: Controladores que manejan la lógica de negocio.

   - middlewares/: Middleware personalizado (autenticación, validación, etc.).

   - models/: Definición de esquemas y modelos de datos utilizando Mongoose.

   - routes/: Definición de rutas y puntos finales de la API.

   - schema/: Validaciones de datos mediante Joi u otras bibliotecas.

   - services/: Servicios que encapsulan lógica reutilizable.

   - tests/: Pruebas unitarias y funcionales del backend.

   - uploads/: Archivos subidos temporalmente.

   - utils/: Funciones auxiliares reutilizables.

- index.js: Punto de entrada de la aplicación.
- tests/: Pruebas unitarias y funcionales del backend.

- package.json: Dependencias y scripts del backend.

- dockerfile: Archivo Docker para contenedores del backend.

- .gitignore: Archivos y carpetas ignoradas en el control de versiones.

#### /frontend/

- Almacena todo el código fuente del cliente.

##### Subcarpetas y archivos:

- src/: Lógica principal del frontend.

   - assets/: Archivos estáticos como imágenes e íconos.

   - components/: Componentes reutilizables de la interfaz de usuario.

   - context/: Manejo de estado global utilizando Context API.

   - helpers/: Funciones auxiliares para operaciones comunes.

   - routes/: Definición de rutas de la aplicación.

   - services/: Servicios que interactúan con la API del backend.

- App.css: Estilos generales de la aplicación.

- App.jsx: Punto de entrada de React.

- index.css: Estilos globales del proyecto.

- main.jsx: Punto de montaje de React en el DOM.

- public/: Archivos públicos (favicon, index.html, etc.).

- cypress/: Pruebas end-to-end con Cypress.

- package.json: Dependencias y scripts del frontend.

- vite.config.js: Configuración del bundler Vite.

- tailwind.config.js: Configuración de Tailwind CSS.

- eslint.config.js: Configuración de ESLint.

- dockerfile: Archivo Docker para contenedores del frontend.

- .env: Variables de entorno para la configuración del cliente.

- .gitignore: Archivos y carpetas ignoradas en el control de versiones.

#### Otros Archivos y Carpetas Principales:

- .gitattributes: Configuración global de atributos Git (saltos de línea, binarios, etc.).

- docker-compose.yml: Archivo para la orquestación de contenedores Docker.

- README.md: Documentación principal del proyecto.

## 2. Guía para Scripting y Convenciones

### 2.1 Backend

##### Estructura de los scripts

- Config/: Manejo de variables de entorno y configuraciones generales.

- Middlewares/: Incluye autenticación y validación.

- Rutas: Organizadas por entidad (e.g., /users, /reports).

- Controladores: Cada controlador se encarga de la lógica específica de su entidad correspondiente.

##### Estilo de código

- Nombres: Utiliza camelCase para variables y funciones.

- Comentarios: Documenta cada método con JSDoc. Ejemplo:
```
/**
 * Método para autenticar usuarios.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const authenticateUser = (req, res) => {
  // Lógica de autenticación
};
```

- Pruebas: Todas las nuevas funcionalidades deben incluir pruebas unitarias o funcionales.

##### Reglas para agregar nuevas funcionalidades:

- Asegúrate de que la lógica sea modular.

- Actualiza las rutas en routes/ y los controladores en controllers/.

- Realiza pruebas exhaustivas antes de crear un pull request.

### 2.2 Frontend

#### Estructura de componentes

##### Components:

- Componentes atomizados reutilizables.

- Organiza los componentes en subcarpetas si son específicos para una vista.

##### Pages:

- Cada vista completa tiene su propia carpeta.

- Incluye componentes y lógica específicos para esa vista.

##### Convenciones de código

- Nombres:

   - Componentes: PascalCase (e.g., UserProfile.jsx).

   - Archivos y carpetas: kebab-case (e.g., user-profile).

- Estilo:

  - Utiliza Tailwind CSS para el diseño.

  - Define clases utilitarias en tailwind.config.js si es necesario.

- Pruebas

  - Escribe pruebas con Cypress para la integración de componentes.

  - Utiliza React Testing Library para pruebas unitarias.

### 3. Convenciones Generales

##### Documentación

- JSDoc: Documenta funciones y métodos complejos.

- README.md: Mantén actualizada la documentación del proyecto.

##### Estilo de código

- Configura ESLint y Prettier para mantener un estilo uniforme.

- Indenta con 2 espacios.

##### Compatibilidad

- Asegúrate de que las nuevas funcionalidades sean compatibles con las herramientas existentes.

- Realiza pruebas cruzadas para garantizar el correcto funcionamiento en todo el sistema.

*Gracias por seguir estas pautas y ayudar a mantener el proyecto organizado y funcional. Si tienes preguntas, no dudes en contactarnos en* [magdiel.araneda2001@alumnos.ubiobio.cl](magdiel.araneda2001@alumnos.ubiobio.cl)



#### Herramientas de Estilo
- **JavaScript**: Configura y usa `ESLint` con las reglas recomendadas para mantener un código limpio y uniforme.
```
  npx eslint .
```
  

**CSS/SCSS:** Organiza las clases y estilos utilizando metodologías como BEM (Block Element Modifier) para nombrar clases de manera clara y estructurada.

**Documentación:** Usa JSDoc para documentar funciones, métodos y clases. Ejemplo:

```
/**
 * Calcula la suma de dos números.
 * @param {number} a - Primer número.
 * @param {number} b - Segundo número.
 * @returns {number} - Suma de a y b.
 */
function sumar(a, b) {
  return a + b;
}
```

##### Verificación de Estilo

Antes de enviar tus cambios, ejecuta las herramientas de verificación para asegurarte de que el código cumple con los estándares establecidos:
```
npm run lint
npm run format
```
Estas herramientas te ayudarán a identificar y corregir errores de estilo automáticamente.
## Configuración del Entorno de Desarrollo 
Sigue estos pasos para configurar tu entorno:
1. **Clona el repositorio**:
```bash
  git clone https://github.com/magdielaraneda/ProyectoTaller.git
  cd ProyectoTaller
```

#### Backend

Crea un archivo **`.env`** en la carpeta **`config/`** que esta dentro de la carpeta src del backend con las siguientes variables:
- **Accede primero a la carpeta config:**
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


### Ejecución del Proyecto 🚀
#### Instalación del Backend

##### 1. Navega a la carpeta backend e instala las dependencias:
```
cd backend
npm install
```

##### 2. Inicia el servidor del backend:
```
npm start
```
El backend estará disponible en: http://localhost:3000.

#### Instalación del Frontend

##### 1. Navega a la carpeta frontend e instala las dependencias:
```
cd frontend
npm install
```

##### 2. Inicia el servidor del frontend:
```
npm run dev
```
El frontend estará disponible en: http://localhost:5173.

## Pruebas de Código ✅
Es fundamental garantizar la calidad del código mediante pruebas exhaustivas. Antes de enviar un *pull request*:

**1.** Ejecuta las pruebas unitarias:
```bash
   npm run test
```
**2.** Si realizas cambios significativos, incluye pruebas nuevas o actualiza las existentes.

**3.** Verifica la cobertura de pruebas para asegurar que todas las funcionalidades estén probadas:
```bash
   npm run test:coverage
```
**4.** Asegúrate de que todas las pruebas pasen antes de enviar tus cambios.


## ¿Cómo Enviar un Pull Request? 🪜
1. **Revisa los cambios**: Asegúrate de que tu código cumple con los estándares y que las pruebas han sido ejecutadas correctamente.
2. **Especifica la rama de destino**: Por defecto, utiliza **`main`** o **`develop`**, según las instrucciones del proyecto.
3. **Proporciona una descripción clara**: Detalla qué cambios realizaste, por qué son necesarios y cómo fueron probados.
4. **Espera revisión**: Un miembro del equipo revisará tu contribución y proporcionará comentarios si es necesario.

#### Ejemplo Práctico para Enviar un Pull Request
Supongamos que queremos agregar una nueva funcionalidad al sistema de reportes en nuestro proyecto.

##### 1. Crea una nueva rama para los cambios

Primero, asegúrate de estar en la rama principal (**`main`** o **`develop`**) y 
crea una nueva rama para trabajar en tus cambios:
```
git checkout main            # Cambiar a la rama principal
git pull origin main         # Asegúrate de tener la última versión de la rama
git checkout -b feature/agregar-reportes  # Crear y cambiar a una nueva rama
```

##### 2. Realiza los cambios necesarios
Haz las modificaciones requeridas en el código (por ejemplo, agregar nuevas funciones, actualizar componentes o corregir errores). Por ejemplo:

- Agregar validaciones en **`controllers/reportsController.js.`**
- Actualizar las rutas en **`routes/reportsRoutes.js.`**
- Añadir pruebas unitarias en **`tests/reports.test.js.`**

##### 3. Confirma los cambios realizados

Verifica qué archivos han sido modificados:
```
git status
```
Agrega los cambios al área de preparación:

```
git add .   # Agregar todos los archivos modificados
```
Haz un commit con un mensaje claro y descriptivo:

```
git commit -m "feat: agregar validaciones al sistema de reportes"
```

##### 4. Envía la rama al repositorio remoto

Sube tu nueva rama al repositorio remoto:

```
git push origin feature/agregar-reportes
```

##### 5. Crea el Pull Request en GitHub

1. Ve al repositorio en GitHub: [https://github.com/magdielaraneda/ProyectoTaller](https://github.com/magdielaraneda/ProyectoTaller)

2. Verás un mensaje que dice algo como: *"You’ve recently pushed branches. Do you want to create a pull request?"*. Haz clic en el botón **"Compare & pull request".**

3. Llena los detalles del Pull Request:

- Título: feat: agregar validaciones al sistema de reportes.
- Descripción:
```
Este Pull Request agrega validaciones al sistema de reportes para garantizar que los datos enviados por los usuarios sean correctos y seguros.

Cambios realizados:
	- Se agregaron validaciones en el controlador de reportes (`reportsController.js`).
	- Se añadieron mensajes de error personalizados para los datos inválidos.
	- Se realizaron pruebas unitarias en `tests/reports.test.js`.

Este PR cierra el issue #45.

Pasos para probar:
	1. Ejecutar `npm run test` para verificar que todas las pruebas pasen correctamente.
	2. Enviar una solicitud POST al endpoint `/api/reports` con datos válidos e inválidos.
```
 4. Adjunta capturas de pantalla o GIFs si los cambios afectan la interfaz de usuario.


##### 6. Espera revisión
Una vez creado el Pull Request, los miembros del equipo serán notificados. Ellos:

- Revisarán el código.
- Proporcionarán comentarios, si es necesario.
- Aprobarán y fusionarán el Pull Request cuando esté listo.
##### 7. Actualiza tu rama local
Después de que el Pull Request sea aprobado y fusionado, actualiza tu rama local:

```
git checkout main
git pull origin main
```
##### 8. Elimina la rama usada
Una vez fusionado, elimina la rama local y remota:

```
git branch -d feature/agregar-reportes          # Elimina la rama local
git push origin --delete feature/agregar-reportes  # Elimina la rama remota
```


##### Gracias por tu interés en contribuir a este proyecto. Tus aportes ayudan a mejorar la calidad y funcionalidad del software para todos los usuarios. 🙌


