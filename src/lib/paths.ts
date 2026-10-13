const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(path = ''): string {
  const segment = path.replace(/^\/+/, '');
  return segment ? `${base}/${segment}` : `${base}/`;
}
