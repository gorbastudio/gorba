# Gorba Studio Website

Sitio web estático para Gorba Studio, empresa especializada en desarrollo de software web, Android y Windows.

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modulares con variables temáticas
- **JavaScript ES6+**: Funcionalidades interactivas sin frameworks
- **Arquitectura Modular**: Templates separados cargados dinámicamente

## 📁 Estructura del Proyecto

```
gorba/
├── index.html              # Archivo principal
├── scripts/
│   └── main.js            # JavaScript principal
├── styles/
│   └── styles.css         # Estilos combinados
├── templates/             # Templates modulares HTML
│   ├── header.html
│   ├── hero.html
│   ├── about.html
│   ├── services.html
│   ├── projects.html
│   ├── roadmap.html
│   ├── contact.html
│   ├── docs.html
│   └── footer.html
├── docs/                  # Documentación
│   ├── STATUS.md
│   └── android_app_development.md
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

Los colores están centralizados en variables CSS. Para cambiar el tema, edita `:root` en `styles.css`.

### Contenido

Edita los archivos en `templates/` para modificar secciones.

## 📱 Características

- ✅ Diseño responsivo
- ✅ Menú colapsable para móviles
- ✅ Carga modular de contenido
- ✅ Compatible con app Android
- ✅ SEO básico
- ✅ Performance optimizada

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
