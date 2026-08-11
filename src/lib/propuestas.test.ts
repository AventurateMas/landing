// node --test --experimental-strip-types src/lib/propuestas.test.ts
import assert from 'node:assert/strict';
import test from 'node:test';

import { FALLBACK_HREF, normalizePropuesta, safeHref } from './propuestas.ts';

test('safeHref acepta lo que el panel debería producir', () => {
  assert.equal(safeHref('https://docs.google.com/forms/d/e/ABC/viewform'), 'https://docs.google.com/forms/d/e/ABC/viewform');
  assert.equal(safeHref('  /#contacto  '), '/#contacto');
  assert.equal(safeHref('#personas'), '#personas');
  assert.equal(safeHref('mailto:info@aventuratemas.com'), 'mailto:info@aventuratemas.com');
});

test('safeHref rechaza esquemas peligrosos y externos disfrazados', () => {
  assert.equal(safeHref('javascript:alert(1)'), null);
  assert.equal(safeHref('java\nscript:alert(1)'), null);
  assert.equal(safeHref('data:text/html,<script>alert(1)</script>'), null);
  assert.equal(safeHref('//evil.example'), null);
  assert.equal(safeHref(''), null);
  assert.equal(safeHref(undefined), null);
});

test('normalizePropuesta rellena los huecos que deja el panel', () => {
  const propuesta = normalizePropuesta({
    titulo: '  Coaching individual  ',
    descripcion: 'Sesiones 1:1.',
    puntos: ['8 sesiones', '', '  Plan personalizado  '],
    imagen: '/assets/propuestas/foto.webp',
    imagenAlt: '',
    ctaTexto: '',
    ctaHref: 'javascript:alert(1)',
    color: 'fucsia',
  });

  assert.ok(propuesta);
  assert.equal(propuesta.titulo, 'Coaching individual');
  assert.deepEqual(propuesta.puntos, ['8 sesiones', 'Plan personalizado']);
  // alt vacío cae al título, nunca queda una imagen sin describir
  assert.equal(propuesta.imagen?.alt, 'Coaching individual');
  assert.equal(propuesta.cta.texto, 'Hablemos');
  assert.equal(propuesta.cta.href, FALLBACK_HREF);
  // color inválido cae al token por defecto en vez de romper la paleta
  assert.equal(propuesta.color, 'navy');
});

test('normalizePropuesta descarta una fila sin título', () => {
  assert.equal(normalizePropuesta({ descripcion: 'huérfana' }), null);
  assert.equal(normalizePropuesta({ titulo: '   ' }), null);
});
