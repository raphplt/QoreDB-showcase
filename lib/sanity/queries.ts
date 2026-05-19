import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current) && (!defined(language) && $language == 'fr' || language == $language)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title}
}`);

export const LATEST_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current) && (!defined(language) && $language == 'fr' || language == $language)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title}
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug && (!defined(language) && $language == 'fr' || language == $language)][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  "author": author->{name, image, bio},
  "categories": categories[]->{title},
  "related": related[]->{
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->{name}
  }
}`);

