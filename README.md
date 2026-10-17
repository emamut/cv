# Curriculum Vitae — Faber Vergara

Sitio web interactivo, minimalista y responsivo de currículum profesional con soporte multi-idioma, paleta de comandos, modo claro/oscuro, gestión de contenido mediante DatoCMS y generación automatizada de PDFs compatibles con ATS (Applicant Tracking System).

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/emamut)

---

## ✨ Características

- ⚡ **Astro 7**: Generación estática (SSG) de alto rendimiento, cero JavaScript innecesario y carga ultrarrápida.
- 🗄️ **Headless CMS con DatoCMS**: Contenido dinámico (información básica, experiencia laboral, educación, proyectos y habilidades) gestionado centralmente mediante la API GraphQL de DatoCMS con soporte para localización (`en` y `es`).
- 🌐 **Multi-idioma (i18n)**:
  - Versión en Inglés: `/`
  - Versión en Español: `/esp/`
- 📄 **Generación Automatizada de PDFs ATS**:
  - Script automatizado con Chrome Headless (`scripts/generate-pdf.mjs`).
  - Genera automáticamente versiones PDF limpias y legibles por ATS tanto en inglés (`cv-faber-vergara-en.pdf` / `resume.pdf`) como en español (`cv-faber-vergara-es.pdf` / `cv.pdf`) durante el build.
- ⌨️ **Command Palette (`Cmd + K` / `Ctrl + K`)**:
  - Paleta de comandos accesible basada en `hotkeypad` con detección automática de plataforma (Mac, Windows y Linux).
  - Permite descargar la versión ATS en PDF, alternar idioma, cambiar tema y acceder directamente a perfiles sociales.
- 🌓 **Modo Claro / Oscuro**:
  - Persistencia de tema en `localStorage` y detección de preferencias del sistema operativo.
  - Script de detección temprana en el `<head>` para prevenir destellos de tema sin estilo (FOUC).
- 🖨️ **CSS de Impresión Limpio (`@media print`)**:
  - Oculta widgets interactivos, barras de navegación y botones flotantes al imprimir o exportar a PDF, garantizando una disposición en formato A4 estándar.

---

## 📁 Estructura del Proyecto

```text
├── public/                 # Archivos estáticos y PDFs ATS generados
│   ├── cv-faber-vergara-en.pdf
│   ├── cv-faber-vergara-es.pdf
│   ├── cv.pdf
│   └── resume.pdf
├── scripts/
│   └── generate-pdf.mjs    # Script de generación de PDFs ATS mediante Chrome Headless
├── src/
│   ├── components/
│   │   ├── HeaderNav.astro        # Barra de navegación flotante con accesos rápidos
│   │   ├── KeyboardManager.astro  # Paleta de comandos interactiva
│   │   ├── Section.astro          # Contenedor modular de secciones
│   │   └── sections/
│   │       ├── Hero.astro         # Encabezado con nombre, contacto, avatar y estado
│   │       ├── About.astro        # Resumen y biografía profesional
│   │       ├── Experience.astro   # Trayectoria y experiencia profesional
│   │       ├── Education.astro    # Formación académica
│   │       ├── Projects.astro     # Proyectos destacados y repositorios
│   │       └── Skills.astro       # Habilidades categorizadas con iconos
│   ├── layouts/
│   │   └── Layout.astro           # Plantilla base, metaetiquetas SEO y estilos globales
│   ├── lib/
│   │   └── datocms.js             # Consultas GraphQL y cliente de DatoCMS
│   └── pages/
│       ├── index.astro            # Página principal (Inglés)
│       └── esp.astro              # Página en Español
├── astro.config.mjs
└── package.json
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

- [Node.js](https://nodejs.org/) v20 o superior
- [pnpm](https://pnpm.io/) v9 o superior
- Google Chrome o Chromium instalado (requerido para la generación de PDFs mediante `generate-pdf.mjs`)

### 1. Clonar el repositorio

```bash
git clone git@github.com:emamut/cv.git
cd cv
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto a partir de `.env.example`:

```bash
cp .env.example .env
```

Agrega tu token de API de solo lectura de DatoCMS:

```env
DATOCMS_API_TOKEN=tu_token_aqui
```

### 4. Ejecutar en modo desarrollo

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`.

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local con recarga en caliente (HMR). |
| `pnpm build` | Valida tipos (`astro check`), compila el sitio para producción y genera automáticamente los PDFs ATS. |
| `pnpm preview` | Sirve la compilación de `dist/` localmente para verificar el resultado de producción. |
| `pnpm pdf` | Ejecuta exclusivamente la generación de PDFs ATS a partir de la carpeta `dist/`. |
| `pnpm astro` | Ejecuta la CLI de Astro (ej. `pnpm astro check`). |

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE.txt).
