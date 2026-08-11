import personasData from '../../content/personas.json';
import empresasData from '../../content/empresas.json';
import { normalizeLista, type Audiencia, type Propuesta, type RawPropuesta } from './propuestas';

export function getPropuestas(audiencia: Audiencia): Propuesta[] {
  const data = audiencia === 'personas' ? personasData : empresasData;
  return normalizeLista((data.items ?? []) as RawPropuesta[]);
}
