import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lectures = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/lectures' }),
  schema: z.object({
    title: z.string(),
    lecture: z.number().int().min(1).max(6),
    topic: z.string(),
    slides: z.number().int().positive(),
    summary: z.string(),
  }),
});

export const collections = { lectures };
