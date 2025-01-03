import fs from 'fs';
import path from 'path';
// import astroConfig from "../../../astro.config.mjs";
import { sitemapConfig } from '../../../sitemap.config.js';

function generateSiteMap() {
  if (!sitemapConfig?.site) return;

  // get the current date and format it as YYYY-MM-DD
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // generate all page paths
  function getAllPages(directory) {
    const pagePaths = [];

    function traverseDir(currentPath, baseUrl = '') {
      const files = fs.readdirSync(currentPath);

      files.forEach((file) => {
        const fullPath = path.join(currentPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverseDir(fullPath, path.join(baseUrl, file));
        } else if (file.endsWith('.astro') || file.endsWith('.md')) {
          // generate URL paths by removing the 'src/pages' part from the file paths

          const urlPath = path
            .join(baseUrl, file)
            .replace(/index\.(astro|md)$/, '') // remove the index.astro or index.md part from the paths
            .replace(/\.(astro|md)$/, ''); // remove the .astro or .md file extensions from the generated paths
          pagePaths.push(urlPath === '' ? '/' : `/${urlPath}`);
        }
      });
    }

    traverseDir(directory);
    return pagePaths;
  }

  function generateSitemap() {
    const currentDate = getCurrentDate();
    const pagesDir = path.join(process.cwd(), 'website', 'pages');
    const pages = getAllPages(pagesDir).map((url) => ({
      url,
      lastmod: currentDate,
    }));
  
    // Define excluded pages and support dynamic routes using regex
    const excludedPages = [
      /^\/privacy$/,
      /^\/terms$/,
      /^\/accessibility$/,
      /^\/blog\/.+$/, // Matches any blog subpath
    ];
  
    // Function to check if a page URL matches any excluded pattern
    const isExcludedPage = (url) =>
      excludedPages.some((pattern) => new RegExp(pattern).test(url));
  
    const videoNamespace = sitemapConfig?.videoUrl
      ? ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'
      : '';
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"${videoNamespace}>
      ${pages
        .filter((page) => !isExcludedPage(page.url))
        .map(
          (page) => `
        <url>
          <loc>${sitemapConfig.site}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
               ${
                 sitemapConfig?.videoUrl
                   ? `<video:video>
                <video:content_loc>${sitemapConfig?.videoUrl}</video:content_loc>
                <video:thumbnail_loc>${sitemapConfig?.videoThumbnailUrl}</video:thumbnail_loc>
                <video:title>${sitemapConfig?.videoTitle}</video:title>
                <video:description>${sitemapConfig?.videoDesc}</video:description>
              </video:video>`
                   : ''
               }
        </url>`
        )
        .join('')}
    </urlset>`;
  
    return sitemap;
  }
  

  function writeSitemapToPublicFolder() {
    const sitemap = generateSitemap();
    const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');

    fs.writeFileSync(publicPath, sitemap, 'utf-8');
  }

  writeSitemapToPublicFolder();
}
generateSiteMap();
