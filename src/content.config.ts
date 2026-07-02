import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
    amazon: z.string().url(),
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

