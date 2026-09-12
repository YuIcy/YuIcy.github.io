import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const bilingual = z.object({ en: z.string().min(1), zh: z.string().min(1) });

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: bilingual,
    summary: bilingual,
    role: bilingual.optional(),
    note: bilingual.optional(),
    category: bilingual,
    period: z.string().min(1),
    order: z.number().int(),
    featured: z.boolean(),
    code: z.url({ protocol: /^https$/, hostname: /^github\.com$/ }).optional(),
    screenshot: z.object({
      src: z.string().startsWith('/images/projects/'),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: bilingual,
      caption: bilingual,
      source: z.url({ protocol: /^https$/ }).optional(),
    }).optional(),
  }),
});

export const collections = { projects };
