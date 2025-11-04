# Gorba Studio Website

Sitio web estático y modular para [gorba.pages.dev](https://gorba.pages.dev). Todo el contenido está construido con HTML5, CSS modular y JavaScript sin frameworks; se apoya en componentes compartidos que se cargan dinámicamente para mantener consistencia entre páginas.

## 🚀 Tecnologías principales

- **HTML5 semántico** para las vistas.
- **CSS3 modular** (variables de tema, layout, componentes y estilos por página).
- **JavaScript ES6+** usando módulos nativos para navegación, formularios y utilidades.
- **Cloudflare Pages** para el despliegue estático y Workers (opcional) para el envío del formulario de contacto.

## 📁 Estructura del proyecto

```
gorba/
├── index.html                     # Redirección inicial a templates/home.html
├── README.md
├── docs/                          # Markdown consumido por docs.html
├── docs-tree.json                 # Árbol generado para la navegación lateral
├── scripts/
│   ├── docs.js                   # Lógica específica para la sección de documentación
│   ├── generate-docs-tree.js     # Script Node para regenerar docs-tree.json
│   ├── index.js                  # Punto de entrada del frontend (ESM)
│   ├── load-components.js        # Carga header/hero/footer en páginas dinámicas
│   └── modules/
│       ├── android.js            # Detección de WebView Android
│       ├── contact.js            # Gestión del formulario de contacto
│       ├── email.js              # Cliente para Cloudflare Worker + SendGrid
│       ├── navigation.js         # Navbar colapsable y body locking
│       └── utils.js              # Utilidades comunes (debounce/throttle, etc.)
├── styles/
│   ├── styles.css                # Archivo maestro que importa el resto de módulos
│   ├── theme.css                 # Paleta y variables globales
│   ├── base/
│   │   ├── base.css              # Reset y tipografía
│   │   └── utilities.css         # Helpers atómicos
│   ├── layout/
│   │   └── layout.css            # Navbar, footer y estructura general
│   ├── components/
│   │   ├── buttons.css           # Botones y CTAs
│   │   └── ui.css                # Tarjetas, badges, métricas, etc.
│   └── pages/
│       ├── contact.css
│       ├── docs.css
│       └── home.css
└── templates/
    ├── about.html
    ├── clients.html
    ├── contact.html
    ├── docs.html
    ├── home.html
    ├── projects.html
    ├── roadmap.html
    ├── services.html
    ├── team.html
    ├── components/
    │   ├── footer.html
    │   ├── header.html
    │   └── hero.html
    └── docs/                      # Fragmentos HTML que consume docs.js
```

## 🛠️ Puesta en marcha local

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd gorba
   ```

2. **Levanta un servidor estático** (elige una opción):
   - VS Code Live Server sobre `index.html`.
   - Python 3: `python -m http.server 8000`.
   - Node.js con `npx serve .` u otra herramienta similar.

3. **Abre el sitio** en [http://localhost:8000](http://localhost:8000) (o el puerto que utilice tu servidor).

> `index.html` redirige automáticamente a `templates/home.html`; verifica que el servidor esté entregando rutas relativas correctamente.

## 🔁 Componentes compartidos y scripts

- **load-components.js** inserta `header.html`, `hero.html` (si aplica) y `footer.html` en cada página que declara los placeholders.
- **scripts/index.js** se importa como módulo y ejecuta la detección Android, la navegación colapsable y otros inicializadores.
- **navigation.js** controla el menú hamburguesa, bloquea el scroll cuando el menú está abierto y observa mutaciones cuando el header se carga de forma diferida.
- **contact.js + email.js** habilitan el formulario; la URL del Worker debe actualizarse con el subdominio real antes de producción.

## 📚 Documentación dinámica

1. Añade/edita archivos Markdown dentro de `docs/`.
2. (Opcional) añade `_meta.json` en cualquier carpeta para ordenar o renombrar categorías.
3. Ejecuta
   ```bash
   node scripts/generate-docs-tree.js
   ```
   para regenerar `docs-tree.json`.
4. Recarga `templates/docs.html` con el servidor en ejecución; `docs.js` construye el acordeón y carga el contenido usando `fetch` y `marked`.

## ⭐ Características clave

- Navegación fija con blur y menú mobile accesible.
- Layout responsivo basado en CSS Grid/Flex.
- Sección de documentación client-side con resaltado de código (`highlight.js`) y soporte para fórmulas (`KaTeX`).
- Integración opcional con Android WebView para alterar estilo/comportamiento en apps híbridas.
- Sistema de contacto preparado para delegar el envío a un Cloudflare Worker + SendGrid.

## 🚀 Despliegue

El proyecto está pensado para entornos estáticos y actualmente se publica en **Cloudflare Pages**. Cualquier plataforma que sirva archivos estáticos (Netlify, Vercel, GitHub Pages, etc.) es compatible.

## 🤝 Contribución

1. Haz fork del repositorio.
2. Crea una rama descriptiva (`feat/nueva-seccion`, `fix/navbar-responsive`, ...).
3. Realiza cambios y haz commit siguiendo un mensaje claro.
4. Sube la rama y abre un Pull Request.

## 📄 Licencia

Código y contenidos propiedad de **Gorba Studio**. Solicitar autorización antes de reutilizar.

## 📞 Contacto

- Sitio: [https://gorba.pages.dev](https://gorba.pages.dev)
- Email: [hola@gorba.studio](mailto:hola@gorba.studio)
- WhatsApp: [+506 7156 1436](https://wa.me/50671561436)
- Telegram: [@GorbaStudio](https://t.me/+50671561436)

---

**Hecho con dedicación artesanal y IA como copiloto.**
