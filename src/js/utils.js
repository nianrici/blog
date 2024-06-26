export function slugify(text) {

  if (!text) {
    return '';
  }

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(pubDate) {
  return new Date(pubDate).toLocaleDateString('es-ES', {
    timeZone: "UTC",
  })
}