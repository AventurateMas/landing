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
  - `sections/`: Bloques principales de la landing page (`Hero`, `Team`, `Services`, `CTA`, etc.).
- `src/styles/`: Constantes y utilidades globales de CSS.
- `src/hooks/`: Custom hooks de React (como `useScrollReveal`).
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

## ✨ Diseño y Rendimiento

El proyecto cuenta con animaciones fluidas y está fuertemente optimizado para garantizar un rendimiento óptimo de carga (LCP) y uso de procesador. Se evitan grandes cantidades de JavaScript delegando las animaciones e interacciones mediante CSS animations o utilizando APIs nativas eficientes como IntersectionObserver.
