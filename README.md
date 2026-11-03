# PLB Reformas Premium S.L. - Sitio Web Oficial

Proyecto web moderno y ultrarrápido desarrollado con **Astro 5** y **Tailwind CSS**, diseñado a medida para la empresa de reformas y multiservicios **PLB Reformas Premium S.L.**.

---

## 🛠️ Entorno de Desarrollo Configurado

El entorno en WSL cuenta con:
- **Node.js**: `v22.23.4 (LTS)`
- **pnpm**: `v12.16.1`
- **Astro**: `v7.4.5`
- **Tailwind CSS**: `v4.3.4` (con `@tailwindcss/vite`)
- **FFmpeg**: Configurado para optimización y extracción de miniaturas de vídeo.

---

## 🚀 Comandos Rápidos

Dentro de WSL en la ruta `/home/zineb/workdir/web-project`:

```bash
# Iniciar servidor de desarrollo (accesible desde Windows en http://localhost:4321)
pnpm dev

# Construir para producción
pnpm build

# Previsualizar la versión de producción
pnpm preview
```

> **Nota:** La configuración en `astro.config.mjs` tiene `server: { host: true, port: 4321 }`, por lo que al ejecutar `pnpm dev` podrás abrir inmediatamente la web en tu navegador de Windows en [http://localhost:4321](http://localhost:4321).

---

## 📁 Estructura del Proyecto

```text
/home/zineb/workdir/web-project/
├── photos/                       # Material original (logo y vídeos de WhatsApp intactos)
├── public/
│   ├── images/
│   │   ├── logo.jpeg             # Logotipo corporativo PLB
│   │   └── thumbnails/           # Miniaturas generadas (thumb-1.jpg a thumb-7.jpg)
│   └── videos/                   # Vídeos reales listos para web (video-1.mp4 a video-7.mp4)
├── src/
│   ├── components/
│   │   ├── Navbar.astro          # Cabecera con logo y navegación
│   │   ├── Hero.astro            # Sección principal con llamadas a la acción
│   │   ├── Services.astro        # Cuadrícula completa de servicios de reforma
│   │   ├── VideoGallery.astro    # Galería interactiva con los 7 vídeos reales de obras
│   │   ├── WhyUs.astro           # Factores de confianza y garantías
│   │   ├── Contact.astro         # Formulario de presupuesto y botón de WhatsApp
│   │   └── Footer.astro          # Pie de página y botón flotante de WhatsApp
│   ├── layouts/
│   │   └── Layout.astro          # Plantilla base HTML con SEO y tipografías
│   ├── pages/
│   │   └── index.astro           # Página principal
│   └── styles/
│       └── global.css            # Estilos globales y paleta de color corporativa
├── astro.config.mjs              # Configuración de Astro y Tailwind
└── package.json                  # Scripts y dependencias
```

---

## 🎨 Identidad Visual y Colores de Marca
- **Dorado Premium**: `#b88a44` (representa elegancia, calidad y acabados de lujo).
- **Negro / Carbón Intenso**: `#10141d` (contraste profesional, moderno y limpio).
- **Verde WhatsApp**: `#10b981` (para contacto directo y conversión inmediata).
