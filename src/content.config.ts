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
    tags: z.array(z.union([z.string().min(1), bilingual])),
    order: z.number().int(),
    featured: z.boolean(),
    art: z.enum(['rubbings', 'reading', 'family', 'schedule']).optional(),
    code: z.url({ protocol: /^https$/, hostname: /^github\.com$/ }).optional(),
  }),
});

export const collections = { projects };
