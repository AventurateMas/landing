// Solo lógica pura: la carga de los JSON vive en getPropuestas.ts para que
// este módulo se pueda correr con `node --test` sin tocar el bundler.
// Sin rosa: la sección de propuestas es rosa y una tarjeta rosa se perdería en el fondo
export const COLOR_TOKENS = ['navy', 'amarillo', 'verde', 'azul'] as const;
export type ColorToken = (typeof COLOR_TOKENS)[number];

export type Audiencia = 'personas' | 'empresas';

export type Propuesta = {
  titulo: string;
  descripcion: string;
  puntos: string[];
  imagen?: { src: string; alt: string };
  cta: { texto: string; href: string };
  color: ColorToken;
};

/**
 * Paleta cerrada: el CMS elige un nombre, no un color. Cada combinación ya tiene
 * el contraste resuelto.
 */
export const PALETTE: Record<
  ColorToken,
  { bg: string; fg: string; accent: string; rule: string }
> = {
  navy: {
    bg: 'var(--color-navy)',
    fg: 'var(--color-text-light)',
    accent: 'var(--color-amarillo)',
    rule: 'rgba(254, 246, 240, 0.2)',
  },
  amarillo: {
    bg: 'var(--color-amarillo)',
    fg: 'var(--color-navy)',
    // rosa sobre amarillo da 2.3:1, ilegible en el número de la tarjeta
    accent: 'var(--color-azul)',
    rule: 'rgba(51, 56, 109, 0.2)',
  },
  verde: {
    bg: 'var(--color-verde)',
    fg: 'var(--color-navy)',
    accent: 'var(--color-navy)',
    rule: 'rgba(51, 56, 109, 0.2)',
  },
  azul: {
    bg: 'var(--color-azul)',
    fg: 'var(--color-text-light)',
    accent: 'var(--color-amarillo)',
    rule: 'rgba(254, 246, 240, 0.2)',
  },
};

/** Destino cuando el CMS todavía no tiene un link de Google Forms cargado. */
export const FALLBACK_HREF = '/#contacto';

const SAFE_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * El href lo escribe una persona desde el panel. Solo pasan enlaces internos y
 * esquemas conocidos: un `javascript:` pegado ahí ejecutaría código en el sitio.
 */
export function safeHref(raw: unknown): string | null {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return null;
  // `//host` es externo aunque empiece con barra
  if (value.startsWith('//')) return null;
  if (value.startsWith('/') || value.startsWith('#')) return value;

  try {
    const url = new URL(value);
    return SAFE_SCHEMES.includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export type RawPropuesta = Record<string, unknown>;

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export function normalizePropuesta(raw: RawPropuesta): Propuesta | null {
  const titulo = asString(raw.titulo);
  if (!titulo) return null;

  const color = COLOR_TOKENS.includes(raw.color as ColorToken) ? (raw.color as ColorToken) : 'navy';
  const imagenSrc = asString(raw.imagen);
  const puntos = Array.isArray(raw.puntos) ? raw.puntos.map(asString).filter(Boolean) : [];

  return {
    titulo,
    descripcion: asString(raw.descripcion),
    puntos,
    // Sin alt cargado usamos el título: nunca sale una imagen sin descripción
    imagen: imagenSrc ? { src: imagenSrc, alt: asString(raw.imagenAlt) || titulo } : undefined,
    cta: {
      texto: asString(raw.ctaTexto) || 'Hablemos',
      href: safeHref(raw.ctaHref) ?? FALLBACK_HREF,
    },
    color,
  };
}

export function normalizeLista(items: RawPropuesta[]): Propuesta[] {
  return items
    .filter(item => item.visible !== false)
    .map(normalizePropuesta)
    .filter((item): item is Propuesta => item !== null);
}

/**
 * Camino serpenteante para la "ruta" de propuestas, en un viewBox 0–100.
 * Pasa por x=50 justo a la altura del centro de cada parada (filas de igual
 * alto), así los pines quedan siempre sobre la línea; entre parada y parada
 * se curva hacia un lado distinto.
 */
export function rutaPath(paradas: number): string {
  const ys = [0, ...Array.from({ length: paradas }, (_, i) => ((i + 0.5) / paradas) * 100), 100];
  let d = 'M50 0';
  for (let k = 1; k < ys.length; k++) {
    const [a, b] = [ys[k - 1], ys[k]];
    const x = k % 2 ? 85 : 15;
    const r = (n: number) => +n.toFixed(2);
    d += ` C${x} ${r(a + (b - a) * 0.25)} ${x} ${r(a + (b - a) * 0.75)} 50 ${r(b)}`;
  }
  return d;
}
