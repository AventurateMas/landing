import partnersData from '../../content/partners.json';
import { safeHref } from './propuestas';

export type Partner = {
  nombre: string;
  area: string;
  descripcion: string;
  foto?: string;
  link: string | null;
  /** Texto al pie de la tarjeta: rótulo del link, o una línea suelta si no hay link */
  pie: string;
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function getPartners(): Partner[] {
  return (partnersData.items as Record<string, unknown>[])
    .filter(item => item.visible !== false && str(item.nombre))
    .map(item => ({
      nombre: str(item.nombre),
      area: str(item.area),
      descripcion: str(item.descripcion),
      foto: str(item.foto) || undefined,
      // El link lo carga una persona desde el panel: mismo filtro que las propuestas
      link: safeHref(item.link),
      pie: str(item.pie) || (safeHref(item.link) ? 'Ver perfil' : ''),
    }));
}
