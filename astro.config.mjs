// @ts-check
import { defineConfig } from 'astro/config';

// Keep the Astro 6 whitespace behavior while migrating to Astro 7.
// Astro 7 defaults to compressHTML: 'jsx', which can remove spaces
// between adjacent inline elements.
export default defineConfig({
  compressHTML: true,
});
