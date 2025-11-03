# Guía de Configuración del Entorno de Desarrollo

## Introducción

Esta guía proporciona una configuración completa del entorno de desarrollo para proyectos de Gorba Studio. Cubre el desarrollo web, aplicaciones Android, backends en Python y aplicaciones híbridas para Windows. Está diseñada para ser amigable para principiantes mientras ofrece detalles técnicos para desarrolladores experimentados. Todos los pasos incluyen compatibilidad multiplataforma (Windows, macOS, Linux) y mejores prácticas.

## Requisitos del Sistema

### Requisitos Mínimos
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+ o distribuciones Linux equivalentes
- **RAM**: 8 GB mínimo, 16 GB recomendado
- **Espacio en Disco**: 20 GB libres para herramientas y proyectos
- **Conexión a Internet**: Requerida para descargas e instalación de paquetes

### Requisitos Recomendados para Desarrollo Avanzado
- **Procesador**: Intel Core i5/AMD Ryzen 5 o superior
- **RAM**: 16 GB o más
- **SSD**: Para mejor rendimiento
- **Monitor**: 1920x1080 o superior

## Instalación de Herramientas de Desarrollo

### Desarrollo Web
```bash
# Node.js (versión LTS recomendada)
# Windows/macOS: Descargar desde https://nodejs.org/
# Linux (Ubuntu/Debian):
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version

# Yarn (alternativa a npm)
npm install -g yarn
```

### Desarrollo Android
```bash
# Java Development Kit (JDK)
# Windows/macOS: Descargar desde https://adoptium.net/
# Linux:
sudo apt update
sudo apt install openjdk-11-jdk

# Android Studio
# Descargar desde https://developer.android.com/studio
# Para Linux, extraer y ejecutar:
tar -xf android-studio-*.tar.gz
cd android-studio/bin
./studio.sh

# Configurar variables de entorno (agregar a ~/.bashrc o ~/.zshrc)
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Backend Python
```bash
# Python 3.8+
# Windows/macOS: Descargar desde https://python.org/
# Linux:
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Verificar instalación
python3 --version
pip3 --version

# Virtualenv para entornos aislados
pip3 install virtualenv
python3 -m venv myproject
source myproject/bin/activate  # Linux/macOS
# myproject\Scripts\activate    # Windows
```

### Aplicaciones Híbridas Windows
```bash
# .NET SDK
# Windows: Descargar desde https://dotnet.microsoft.com/
# Linux/macOS:
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-6.0

# Verificar instalación
dotnet --version

# Windows App SDK (solo Windows)
# Instalar desde Microsoft Store o Visual Studio Installer
```

## Configuración del IDE

### Visual Studio Code (Recomendado)
```bash
# Instalar VS Code
# Descargar desde https://code.visualstudio.com/

# Extensiones esenciales
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension ms-python.python
code --install-extension ms-dotnettools.csharp
code --install-extension flutter.flutter
code --install-extension ms-vscode.vscode-json
code --install-extension eamodio.gitlens
code --install-extension ms-vscode-remote.remote-containers
```

### Configuración del Workspace
Crear un archivo `.vscode/settings.json` en la raíz del proyecto:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "python.defaultInterpreterPath": "python3",
  "dotnet.defaultSolution": "GorbaStudio.sln"
}
```

### Android Studio
- Instalar plugins: Flutter, Dart
- Configurar emulador con API 30+
- Habilitar HAXM en Windows para mejor rendimiento

## Configuración de Control de Versiones

### Git
```bash
# Instalar Git
# Windows/macOS: Descargar desde https://git-scm.com/
# Linux:
sudo apt install git

# Configuración inicial
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
git config --global core.autocrlf input  # Linux/macOS
git config --global core.autocrlf true   # Windows

# Generar clave SSH
ssh-keygen -t rsa -b 4096 -C "tu.email@ejemplo.com"
# Agregar la clave pública a GitHub/GitLab
```

### GitHub/GitLab
- Crear cuenta en la plataforma preferida
- Configurar autenticación SSH
- Clonar repositorio:
```bash
git clone git@github.com:GorbaStudio/proyecto.git
cd proyecto
```

## Gestores de Paquetes

### NPM/Yarn (JavaScript)
```bash
# Inicializar proyecto
npm init -y
# o
yarn init -y

# Instalar dependencias
npm install react vue express
# o
yarn add react vue express

# Instalar dependencias de desarrollo
npm install -D typescript eslint jest
# o
yarn add -D typescript eslint jest
```

### Pip (Python)
```bash
# Crear requirements.txt
echo "flask==2.0.0
requests==2.25.1
pytest==6.2.0" > requirements.txt

# Instalar dependencias
pip install -r requirements.txt

# Usar pipenv para mejor gestión
pip install pipenv
pipenv install
pipenv shell
```

### NuGet (.NET)
```bash
# Restaurar paquetes
dotnet restore

# Agregar paquete
dotnet add package Microsoft.EntityFrameworkCore
```

## Frameworks de Pruebas

### JavaScript/TypeScript
```bash
# Jest para testing
npm install -D jest @types/jest
# Configurar en package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### Python
```bash
# pytest
pip install pytest pytest-cov

# Ejecutar pruebas
pytest
pytest --cov=mi_app
```

### .NET
```bash
# xUnit
dotnet add package xunit
dotnet add package xunit.runner.visualstudio

# Ejecutar pruebas
dotnet test
```

## Herramientas de Despliegue

### Docker
```bash
# Instalar Docker
# Descargar desde https://docker.com/

# Dockerfile básico para Node.js
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel/Netlify (Web)
```bash
# Instalar CLI
npm install -g vercel
# o
npm install -g netlify-cli

# Desplegar
vercel --prod
# o
netlify deploy --prod
```

### Heroku (Backend)
```bash
# Instalar Heroku CLI
# Descargar desde https://devcenter.heroku.com/

# Login y despliegue
heroku login
heroku create mi-app-gorba
git push heroku main
```

## Solución de Problemas Comunes

### Problemas con Node.js
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install
```

### Errores de Python
```bash
# Actualizar pip
python -m pip install --upgrade pip

# Resolver conflictos de dependencias
pip install --upgrade --force-reinstall paquete-problematico
```

### Problemas de Android Studio
- Verificar variables de entorno ANDROID_HOME
- Actualizar SDK Manager
- Limpiar cache del IDE: File > Invalidate Caches / Restart

### Errores de Git
```bash
# Resolver conflictos de fusión
git status
# Editar archivos conflictivos
git add archivo-resuelto
git commit
```

### Rendimiento del Sistema
- Cerrar aplicaciones innecesarias
- Aumentar RAM si es posible
- Usar SSD para mejor I/O
- Configurar antivirus para excluir carpetas de desarrollo

## Mejores Prácticas

1. **Entornos Aislados**: Usar virtualenv, venv o contenedores Docker
2. **Control de Versiones**: Commits frecuentes con mensajes descriptivos
3. **Documentación**: Mantener README actualizado y código comentado
4. **Seguridad**: No commitear claves API o datos sensibles
5. **Actualizaciones**: Mantener herramientas y dependencias actualizadas
6. **Backup**: Regularmente hacer backup de configuraciones importantes

## Recursos Adicionales

- [Documentación Oficial de Gorba Studio](docs/README.md)
- [Guías de Desarrollo Web](docs/web_development_basic.md)
- [Desarrollo Android](docs/android_app_development.md)
- [Aplicaciones Híbridas](docs/hybrid_app_development.md)

¡Tu entorno de desarrollo está listo para crear proyectos increíbles con Gorba Studio!</content>