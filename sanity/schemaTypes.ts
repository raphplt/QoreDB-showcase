import type { SchemaTypeDefinition } from "sanity";
import author from "./schema/author";
import category from "./schema/category";
import post from "./schema/post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category],
};
