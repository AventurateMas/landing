import { NextResponse } from 'next/server';

/**
 * Modo Mantenimiento.
 *
 * Activado por la variable de entorno `MAINTENANCE_MODE`.
 * Cuando vale "true" o "1", el middleware intercepta TODAS las peticiones
 * antes de renderizar la landing y responde con una página de mantenimiento
 * autocontenida (503). Ningún componente ni dato de la landing se carga ni se
 * expone mientras el modo esté activo.
 */

const isMaintenanceMode = (): boolean => {
  const flag = process.env.MAINTENANCE_MODE?.trim().toLowerCase();
  return flag === 'true' || flag === '1';
};

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>En mantenimiento</title>
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: #faf7f2;
      color: #2b2620;
      text-align: center;
    }
    main { max-width: 32rem; }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.9rem;
      border-radius: 999px;
      background: #f0e7da;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }
    h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); line-height: 1.15; margin-bottom: 1rem; }
    p { font-size: 1.05rem; line-height: 1.6; opacity: 0.8; }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1714; color: #f3ede3; }
      .badge { background: #2c2620; }
    }
  </style>
</head>
<body>
  <main>
    <span class="badge">En mantenimiento</span>
    <h1>Volvemos enseguida</h1>
    <p>Estamos realizando mejoras en este momento. Por favor, vuelve a intentarlo en otro momento.</p>
  </main>
</body>
</html>`;

export function middleware() {
  if (isMaintenanceMode()) {
    return new NextResponse(MAINTENANCE_HTML, {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': '3600',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Intercepta TODAS las rutas, incluidos los bundles de _next (contienen el
  // código y los textos de la landing). La página de mantenimiento es
  // autocontenida (CSS inline), así que no necesita ningún asset.
  matcher: ['/:path*'],
};
