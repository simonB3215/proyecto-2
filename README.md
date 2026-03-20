# El Dorado - Alta Cocina China

Bienvenido al repositorio de **El Dorado**, una landing page premium y elegante para un restaurante exclusivo de alta cocina china. Este proyecto está diseñado para transmitir lujo e invitar a los clientes a conocer el menú, el ambiente y realizar sus reservas.

## 🚀 Tecnologías Utilizadas

- **HTML5 & CSS3 Vanilla**: Para estructura y diseño con enfoque moderno (Variables CSS, Animaciones, Grid y Flexbox).
- **Vite**: Como herramienta de construcción (bundler) y servidor de desarrollo ultra rápido.
- **JavaScript (ES Modules)**: Para interactividad.
- **Fuentes de Google**: Cinzel Decorative, Playfair Display y Montserrat.

## 📦 Instalación

Sigue estos pasos para correr el proyecto en tu entorno local:

1. Clona este repositorio.
2. Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

3. Inicia el servidor de desarrollo local:

```bash
npm run dev
```

El sitio estará disponible, por defecto, en `http://localhost:5173`.

## 🛠 Comandos Disponibles

- `npm run dev`: Inicia el entorno de desarrollo local.
- `npm run build`: Construye la versión optimizada para producción (se genera en la carpeta `/dist`).
- `npm run preview`: Sirve localmente la versión de producción para verificarla antes del despliegue.

## ☁️ Despliegue en Netlify

El proyecto ya cuenta con un archivo de configuración `netlify.toml` preparado para un despliegue automático exitoso al conectarlo a Netlify. 

Pasos a seguir:
1. Sube este repositorio a tu cuenta de GitHub, GitLab o Bitbucket.
2. Inicia sesión en [Netlify](https://app.netlify.com/).
3. Haz clic en **"Add new site"** -> **"Import an existing project"**.
4. Selecciona tu proveedor de repositorios y vincula el repositorio de este proyecto.
5. Asegúrate de que los ajustes de construcción sean los siguientes (deberían inferirse automáticamente del archivo `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Haz clic en **"Deploy site"**.

¡Listo! Netlify se encargará de construir y publicar el sitio. Cada vez que hagas un push a la rama principal (`main`/`master`), tu sitio se actualizará automáticamente.
