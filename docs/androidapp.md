# Guía de Integración de la Aplicación Android WebView

Estimada Desarrolladora de la Aplicación Web,

Este documento proporciona orientación sobre cómo integrar tu aplicación web Astro.js con nuestra aplicación Android WebView. La aplicación Android funciona como un contenedor para tu contenido web y proporciona información adicional del dispositivo que puede mejorar la experiencia del usuario.

## Integración con la Aplicación Android

### Interfaz de Información del Dispositivo

La aplicación Android expone una interfaz JavaScript que permite a tu aplicación web acceder a información del dispositivo. Esta interfaz está disponible a través del objeto global `AndroidInterface` cuando se ejecuta dentro de la aplicación Android.

#### Verificación de la Interfaz Android

Antes de usar la interfaz, verifica siempre si existe:

```javascript
if (typeof AndroidInterface !== 'undefined') {
  // Se está ejecutando dentro de la aplicación Android
  // Puedes usar los métodos de AndroidInterface aquí
} else {
  // No se está ejecutando dentro de la aplicación Android
  // Comportamiento alternativo para navegador
}
```

#### Obtención de Información del Dispositivo

Para recuperar información del dispositivo, usa el método `getDeviceInfo()`:

```javascript
if (typeof AndroidInterface !== 'undefined') {
  try {
    const deviceInfoString = AndroidInterface.getDeviceInfo();
    const deviceInfo = JSON.parse(deviceInfoString);
    
    console.log('Información del Dispositivo:', deviceInfo);
    
    // Información del dispositivo disponible:
    // - screenWidth: Ancho de pantalla en píxeles
    // - screenHeight: Alto de pantalla en píxeles
    // - density: Densidad de pantalla
    // - densityDpi: Densidad de pantalla en DPI
    // - androidVersion: Nivel de API de Android
    // - manufacturer: Fabricante del dispositivo
    // - model: Modelo del dispositivo
    // - brand: Marca del dispositivo
    // - device: Nombre del dispositivo
    // - product: Nombre del producto
    // - hardware: Nombre del hardware
    // - hasNavigationBar: Si el dispositivo tiene barra de navegación
    // - hasSoftNavigationBar: Si el dispositivo tiene barra de navegación virtual
    // - orientation: Orientación de pantalla (portrait/landscape)
    // - availableWidthDp: Ancho disponible en píxeles independientes de densidad
    // - availableHeightDp: Alto disponible en píxeles independientes de densidad
    // - fontScale: Escala de fuente del sistema
    // - releaseVersion: Versión de Android (ej., "11")
    // - supportedAbis: Arquitecturas de procesador soportadas
    // - isInMultiWindow: Si la aplicación está en modo multi-ventana
  } catch (error) {
    console.error('Error obteniendo información del dispositivo:', error);
  }
}
```

#### Obtención de Información de la Aplicación

Para recuperar información sobre la propia aplicación Android, usa el método `getAppInfo()`:

```javascript
if (typeof AndroidInterface !== 'undefined') {
  try {
    const appInfoString = AndroidInterface.getAppInfo();
    const appInfo = JSON.parse(appInfoString);
    
    console.log('Información de la Aplicación:', appInfo);
    
    // Información de la aplicación disponible:
    // - packageName: Nombre del paquete de la aplicación Android
    // - versionName: Nombre de la versión de la aplicación
    // - versionCode: Código de la versión de la aplicación
  } catch (error) {
    console.error('Error obteniendo información de la aplicación:', error);
  }
}
```

## Temas y Áreas Seguras

### Tematización de Color Dinámica

Para hacer que las barras de estado y navegación de Android coincidan con el tema de tu aplicación web:

1. Determina el color de fondo principal de tu aplicación web
2. Usa JavaScript para detectar este color
3. Comunica este color a la aplicación Android a través de un método de interfaz personalizado

Implementación de ejemplo:

```javascript
// Función para obtener el color de fondo de tu contenedor principal
function getBackgroundColor() {
  const bodyStyle = window.getComputedStyle(document.body);
  return bodyStyle.backgroundColor;
}

// Si se está ejecutando en la aplicación Android, enviar el color del tema
if (typeof AndroidInterface !== 'undefined' && typeof AndroidInterface.setThemeColor !== 'undefined') {
  const bgColor = getBackgroundColor();
  try {
    AndroidInterface.setThemeColor(bgColor);
  } catch (error) {
    console.error('Error estableciendo el color del tema:', error);
  }
}
```

Para que esto funcione, necesitaríamos agregar un método `setThemeColor` a nuestra interfaz `DeviceInfoInterface` en la aplicación Android.

### Manejo de Áreas Seguras

La aplicación Android ya está configurada para manejar correctamente las áreas seguras (notch, barras del sistema, etc.) mediante el uso de:

1. `WindowCompat.setDecorFitsSystemWindows(window, false)` - Permite que el contenido se dibuje bajo las barras del sistema
2. Modificadores de Compose `.statusBarsPadding()` y `.navigationBarsPadding()` - Añaden automáticamente el padding necesario para evitar que el contenido quede oculto

Como desarrolladora web, puedes usar las siguientes técnicas para manejar correctamente las áreas seguras en tu sitio Astro.js:

1. Utiliza las propiedades CSS `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)`, y `env(safe-area-inset-right)` para aplicar padding donde sea necesario:

```css
.my-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

2. Para una mejor experiencia, puedes detectar si estás en la aplicación Android y aplicar estilos específicos:

```javascript
if (typeof AndroidInterface !== 'undefined') {
  document.body.classList.add('in-android-app');
}
```

Y en tu CSS:

```css
.in-android-app .my-header {
  padding-top: env(safe-area-inset-top);
}
```

## Recomendaciones Adicionales

1. **Pruebas en múltiples dispositivos**: Asegúrate de probar tu sitio en diferentes tamaños de pantalla y dispositivos con notch.

2. **Manejo de orientación**: Utiliza la información de orientación proporcionada por `deviceInfo.orientation` para adaptar tu diseño.

3. **Optimización de rendimiento**: Considera el tamaño de pantalla y densidad para cargar recursos apropiados.

4. **Fallbacks**: Siempre proporciona estilos por defecto en caso de que la información del dispositivo no esté disponible.

Si tienes alguna pregunta sobre la integración o necesitas funcionalidades adicionales, no dudes en contactarnos.