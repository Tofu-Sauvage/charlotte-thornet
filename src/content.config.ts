import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCategory = z.enum([
  "Actu",
  "Anecdote",
  "Abécédaire",
]);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: blogCategory,
    pubDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/books",
  }),

  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    releaseDate: z.date(),
    cover: z.string(),
    amazon: z.url().optional(),
    status: z.enum([
      "published",
      "coming-soon",
    ]),
  }),
});

export const collections = {
  blog,
  books,
};
