# Aventúrate Más - Landing Page

Bienvenido al repositorio de la landing page para **Aventúrate Más**, un programa vocacional de coaching y desarrollo personal diseñado para acompañar a personas y equipos a descubrir su talento.

## 🚀 Tecnologías

Este proyecto está construido con las siguientes tecnologías:
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **CSS Modules** para estilos mantenibles, de alto rendimiento y modulares.

## 📦 Estructura del Proyecto

- `src/app/`: Rutas de la aplicación según convención de App Router de Next.js.
- `src/components/`: Componentes de la interfaz clasificados en:
  - `animations/`: Componentes wrapper para la intercesión y animaciones (ej. `Reveal`).
  - `decor/`: Elementos visuales decorativos como los divisores de secciones (`SectionDivider`).
  - `layout/`: Estructura principal y general (`Nav`, `Footer`, etc.).
  - `primitives/`: Botones y pills de uso general.
  - `sections/`: Bloques principales de la landing page (`Hero`, `Propuestas`, `Team`, `CTA`, etc.).
    `Propuestas` es un selector de audiencia: muestra las tarjetas de personas o
    las de empresas según la pestaña elegida.
- `src/styles/`: Constantes y utilidades globales de CSS.
- `src/hooks/`: Custom hooks de React (como `useScrollReveal`).
- `src/lib/`: Lógica compartida (datos de contacto, carga y validación de propuestas).
- `content/`: Contenido editable desde el panel (`personas.json`, `empresas.json`).
- `public/admin/`: Panel de contenido (Sveltia CMS).
- `public/assets/`: Imágenes de diseño y recursos estáticos.

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/AventurateMas/landing
   cd landing
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

## 🧹 Scripts Disponibles

- `npm run dev`: Inicia el modo desarrollo.
- `npm run lint`: Ejecuta el linter (ESLint) para garantizar la calidad del código.
- `npm run build`: Construye la aplicación optimizada lista para producción.
- `npm run start`: Inicia la aplicación usando el build de producción.
- `npm test`: Corre los chequeos de `src/**/*.test.ts` (requiere Node 22, ver `.nvmrc`).

## ✏️ Panel de contenido

Las propuestas de **personas** y **empresas** se editan desde `/admin` sin tocar código.
Cada cambio se guarda como un commit en este repositorio y el sitio se redespliega
solo; tarda un minuto o dos en verse en vivo.

### Qué se puede editar

Título, descripción, puntos, imagen, texto y link del botón, color y visibilidad de
cada propuesta, además del orden (se arrastran en la lista). El resto de los textos
de la web vive en el código.

### Cómo entrar

1. Ir a `https://<dominio>/admin`.
2. Elegir **Sign In with Token** y pegar un [Personal Access Token de GitHub](https://github.com/settings/tokens)
   con permiso de escritura sobre este repositorio.

Para que el ingreso sea con usuario y contraseña de GitHub en vez de un token, hay
que levantar un cliente OAuth (por ejemplo *Sveltia CMS Authenticator* en Cloudflare
Workers, gratuito) y descomentar `base_url` en `public/admin/config.yml`.

### Links de los formularios

Los formularios son de Google Forms. En el campo **Link del botón** va la URL del
formulario. Conviene usar un solo formulario con un campo "programa" y pegar el
link prellenado de cada propuesta, así todas las respuestas caen en la misma planilla
ya identificadas:

```
https://docs.google.com/forms/d/e/<ID>/viewform?usp=pp_url&entry.<CAMPO>=Coaching+individual
```

Si el campo queda vacío, el botón lleva a la sección de contacto de la web. Nunca
queda un botón muerto.

### Reglas que impone el sistema

- Solo se aceptan links `https://` o anclas internas (`#personas`). Cualquier otra
  cosa se descarta al renderizar.
- El color se elige de una lista cerrada de cinco: cada combinación de fondo y texto
  ya tiene el contraste resuelto.
- Si se sube una imagen sin descripción, se usa el título como texto alternativo.
- Una propuesta sin título no se publica.
- Si una sección se queda sin propuestas visibles, muestra un mensaje con enlace a
  contacto en vez de un hueco vacío.

## ✨ Diseño y Rendimiento

El proyecto cuenta con animaciones fluidas y está fuertemente optimizado para garantizar un rendimiento óptimo de carga (LCP) y uso de procesador. Se evitan grandes cantidades de JavaScript delegando las animaciones e interacciones mediante CSS animations o utilizando APIs nativas eficientes como IntersectionObserver.
