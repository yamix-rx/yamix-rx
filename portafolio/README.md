# RX · Portafolio de desarrollo de software

Sitio web personal de **RX (@yamix-rx)**, estudiante de Ingeniería de Sistemas Computacionales en Perú.

**Producción:** https://yamix-rx-portafolio.vercel.app/

## Contenido

- Presentación profesional y enlaces de contacto.
- Seis proyectos públicos: asistencia, gestión de ventas, monitoreo de incubadora, China House y dos sistemas de escritorio.
- Filtros funcionales de proyectos por categoría.
- Stack técnico organizado en frontend, backend/datos y software/herramientas.
- Sección de enfoque de trabajo, acerca de mí y contacto por correo.
- Diseño responsivo, modo claro/oscuro con preferencia persistente, animaciones reducidas cuando así lo solicita el sistema y navegación por teclado.

## Tecnologías

**HTML5 + CSS3 + JavaScript moderno**, sin librerías de ejecución ni proceso de compilación. Las fuentes se solicitan a Google Fonts con alternativas locales.

## Desarrollo local

Puedes abrir `index.html` directamente para revisar el contenido. Para ejecutar desde un servidor local:

```bash
python -m http.server 8000
```

Luego visita http://localhost:8000.

## Vercel

Conecta el repositorio `yamix-rx/yamix-rx` y establece:

- **Root Directory:** `portafolio`
- **Framework Preset:** `Other`
- **Build Command:** ninguno
- **Production Branch:** `main`

Cada push a la rama principal genera un despliegue automático. El README del perfil se mantiene en la raíz del repositorio.

## Mantenimiento

Los proyectos y enlaces están escritos en `index.html`. Los filtros, tema y efectos están en `script.js`, y el diseño se modifica en `styles.css`. Al agregar proyectos, actualiza también el contador del filtro “Todos”.

No introduzcas secretos ni información privada en el código público.
