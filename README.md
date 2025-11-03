# Gorba Studio Website

**Sitio web estático y modular para Gorba Studio, empresa especializada en desarrollo de software web, Android y Windows. Construido con HTML5, CSS3 y JavaScript puro, ofrece una experiencia responsiva y profesional para mostrar servicios de desarrollo full-stack.**

Sitio web estático para Gorba Studio, empresa especializada en desarrollo de software web, Android y Windows.

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modulares con variables temáticas
- **JavaScript ES6+**: Funcionalidades interactivas sin frameworks
- **Arquitectura Modular**: Templates separados cargados dinámicamente

## 📁 Estructura del Proyecto

```
gorba/
├── index.html                    # Redirección a templates/home.html
├── scripts/
│   ├── index.js                 # Punto de entrada principal (ES6 modules)
│   ├── modules/
│   │   ├── android.js          # Integración Android WebView
│   │   ├── navigation.js       # Navegación responsive y menú
│   │   └── utils.js            # Utilidades generales
│   └── generate-docs-tree.js   # Generador de árbol de documentación
├── styles/
│   ├── styles.css              # Archivo maestro (imports)
│   ├── theme.css               # Variables de color y tema
│   ├── base/
│   │   ├── base.css           # Reset, tipografía, contenedores
│   │   └── utilities.css      # Clases atómicas
│   ├── layout/
│   │   └── layout.css         # Navbar, footer, navegación
│   ├── components/
│   │   ├── buttons.css        # Estilos de botones
│   │   └── ui.css             # Cards, tags, métricas, etc.
│   └── pages/
│       ├── home.css           # Estilos específicos de home
│       ├── contact.css        # Estilos específicos de contacto
│       └── docs.css           # Estilos específicos de docs
├── templates/                   # Templates HTML
│   ├── home.html               # Página principal
│   ├── about.html              # Sobre nosotros
│   ├── services.html           # Servicios
│   ├── projects.html           # Proyectos
│   ├── team.html               # Equipo
│   ├── clients.html            # Clientes
│   ├── roadmap.html            # Roadmap
│   ├── contact.html            # Contacto
│   ├── docs.html               # Portal de documentación
│   └── components/
│       ├── header.html         # Header compartido
│       └── footer.html         # Footer compartido
├── docs/                        # Documentación técnica (Markdown)
│   ├── getting-started/
│   ├── guides/
│   ├── architecture/
│   └── examples/
└── README.md
```

## 🛠️ Instalación y Desarrollo Local

### Prerrequisitos

- Navegador web moderno
- Servidor HTTP local (recomendado: VS Code Live Server, Python, Node.js)

### Ejecutar Localmente

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/gorbastudio/gorba.git
   cd gorba
   ```

2. **Inicia un servidor local:**
   - **VS Code Live Server**: Abre `index.html` y ejecuta "Live Server"
   - **Python 3:** `python -m http.server 8000`
   - **Node.js:** `npx serve .`

3. **Abre en navegador:**
   ```
   http://localhost:8000
   ```

## 🎨 Personalización

### Tema de Color

Los colores están centralizados en variables CSS. Para cambiar el tema, edita `:root` en `styles/theme.css`.

### Estilos

La arquitectura CSS está modularizada:
- **`styles/theme.css`**: Variables de color y fuentes
- **`styles/base/`**: Reset, tipografía, utilidades
- **`styles/layout/`**: Navbar, footer, navegación responsive
- **`styles/components/`**: Botones, cards, tags, UI components
- **`styles/pages/`**: Estilos específicos por página (home, contact, docs)
- **`styles/styles.css`**: Archivo maestro que importa todos los módulos

### JavaScript

El código JavaScript está organizado en módulos ES6:
- **`scripts/index.js`**: Punto de entrada que orquesta la inicialización
- **`scripts/modules/android.js`**: Integración con Android WebView
- **`scripts/modules/navigation.js`**: Navegación colapsable y responsive
- **`scripts/modules/utils.js`**: Funciones utilitarias (debounce, throttle, etc.)

### Contenido

Edita los archivos en `templates/` para modificar secciones.

### Documentación

La sección de documentación (`docs.html`) se genera dinámicamente a partir de los archivos en la carpeta `/docs`.

**Para agregar o modificar documentación:**

1.  **Crea o edita archivos**: Añade o modifica archivos `.md` o carpetas dentro del directorio `/docs`.
2.  **(Opcional) Personaliza el orden y los títulos**:
    -   Crea un archivo `_meta.json` dentro de cualquier carpeta para definir un título personalizado para esa categoría o para establecer un orden específico de sus elementos.
    -   **Ejemplo de `_meta.json` en `docs/guides/`**:
        ```json
        {
          "title": "Guías de Desarrollo",
          "order": {
            "web": 1,
            "mobile": 2,
            "desktop": 3
          }
        }
        ```
3.  **Regenera el árbol de navegación**: Ejecuta el siguiente comando en tu terminal. Necesitas tener Node.js instalado.
    ```bash
    node ./scripts/generate-docs-tree.js
    ```
4.  **Verifica los cambios**: Recarga `docs.html` en tu navegador para ver el menú lateral actualizado.

## 📱 Características

- ✅ **Diseño responsivo**: Adaptable a todos los dispositivos
- ✅ **Menú colapsable**: Navegación optimizada para móviles y tablets
- ✅ **Arquitectura modular**: CSS y JS organizados en módulos (~250 líneas/archivo)
- ✅ **ES6 Modules**: JavaScript moderno con imports/exports
- ✅ **Compatible con Android WebView**: Integración nativa con app Android
- ✅ **Portal de documentación**: Sistema dinámico de docs con Markdown
- ✅ **SEO optimizado**: Meta tags y estructura semántica
- ✅ **Performance**: CSS modular, lazy loading, sin frameworks pesados
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado

## 🚀 Despliegue

Opciones: GitHub Pages, Netlify, Vercel, Firebase Hosting.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Propiedad de Gorba Studio.

## 📞 Contacto

- **Email**: contacto@gorbastudio.com
- **GitHub**: [@gorbastudio](https://github.com/gorbastudio)

**Desarrollado por Gorba Studio**
