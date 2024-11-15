import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from 'astro-icon';


import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // site: 'https://example.com',
  integrations: [tailwind(), react(), mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons':  ['*'],
    },
  })],
  srcDir: './theme'
});