// Single source for every outbound contact link on the site.
export const CONTACT = {
  email: 'info@aventuratemas.com',
  instagram: 'https://www.instagram.com/aventuratemas',
  instagramHandle: '@aventuratemas',
  linkedin: 'https://www.linkedin.com/in/maritzarodr%C3%ADguezacero/',
} as const;

export const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  'Quiero agendar una sesión'
)}`;
