// Single source for every outbound contact link on the site.
export const CONTACT = {
  email: 'info@aventuratemas.com',
  instagram: 'https://www.instagram.com/aventuratemas',
  instagramHandle: '@aventuratemas',
  linkedin: 'https://www.linkedin.com/in/maritzarodr%C3%ADguezacero/',
  linkedinPrograma: 'https://www.linkedin.com/company/avent%C3%BArate-m%C3%A1s/',
  // Formulario del Coaching individual (primera sesión sin costo): destino del botón del nav
  primeraSesion: 'https://forms.gle/kiLVHXCec11kgwwh9',
} as const;

export const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  'Quiero agendar una sesión'
)}`;
