import type { CollectionEntry } from "astro:content";

export const siteConfig = {
  name: "Charlotte Thornet",
  url: "https://charlotte-thornet.com",
  defaultTitle: "Charlotte Thornet",
  defaultDescription: "Autrice de fantasy, dragons, magie et ironie.",
  defaultImage: "/images/c-thornet.jpeg",
  authorImage: "/images/c-thornet.jpeg",
  sameAs: ["https://charlotte-thornet.tumblr.com"],
};

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLd = {
  [key: string]: JsonLdValue;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

function withoutEmptyValues<T extends JsonLd>(data: T): JsonLd {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.length === 0) return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }),
  );
}

export function createAuthorJsonLd(): JsonLd {
  return withoutEmptyValues({
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.authorImage),
    description: siteConfig.defaultDescription,
    sameAs: siteConfig.sameAs,
  });
}

export function createBookJsonLd(
  book: CollectionEntry<"books">,
  canonicalUrl: string,
): JsonLd {
  return withoutEmptyValues({
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.data.title,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: book.data.releaseDate?.toISOString().split("T")[0],
    image: book.data.cover ? absoluteUrl(book.data.cover) : undefined,
    description: book.data.subtitle,
    url: canonicalUrl,
  });
}
