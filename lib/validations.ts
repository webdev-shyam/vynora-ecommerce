import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, hyphenated"),
  description: z.string().min(20, "Description at least 20 chars"),
  image: z.string().url("Must be valid URL"),
  price: z.coerce.number().positive(),
  category: z.string().min(2),
  categoryId: z.string().optional().nullable(),
  niche: z.string().min(2),
  commission: z.coerce.number().min(0).max(100),
  rating: z.coerce.number().min(0).max(5).default(4.5),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional().default([]),
});

export type ProductInput = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export type CategoryInput = z.infer<typeof categorySchema>;
