import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'dist';
const prefix = '/stanford-cs329z/';
const expected = [
  'index.html',
  'search/index.html',
  'pagefind/pagefind.js',
  ...Array.from({ length: 6 }, (_, index) => `slides/original/lecture${String(index + 1).padStart(2, '0')}.pdf`),
];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  }));
  return children.flat();
}

for (const path of expected) await access(join(root, path));
const pages = await htmlFiles(root);
if (pages.length !== 8) throw new Error(`Expected 8 HTML pages, found ${pages.length}`);

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  if (!html.includes('<html lang="zh-CN">')) throw new Error(`Missing Chinese language metadata: ${page}`);
  const urls = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((match) => match[1]);
  for (const url of urls) {
    if (!url.startsWith(prefix)) throw new Error(`URL missing GitHub Pages base path in ${page}: ${url}`);
    const clean = decodeURIComponent(url.split(/[?#]/)[0]).slice(prefix.length);
    const relative = clean.endsWith('/') ? join(clean, 'index.html') : clean;
    await access(join(root, relative));
  }
}

console.log(`Checked ${pages.length} pages and all local asset links.`);
