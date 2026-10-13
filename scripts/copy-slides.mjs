import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const destination = join('public', 'slides', 'original');
await mkdir(destination, { recursive: true });

for (let lecture = 1; lecture <= 6; lecture += 1) {
  const name = `lecture${String(lecture).padStart(2, '0')}.pdf`;
  await copyFile(join('slides', name), join(destination, name));
}
