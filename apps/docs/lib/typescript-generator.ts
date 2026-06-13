import { createGenerator } from "fumadocs-typescript";
import type { Generator } from "fumadocs-typescript";

export const generator: Generator = await createGenerator({
  tsconfigPath: "./tsconfig.json",
});
