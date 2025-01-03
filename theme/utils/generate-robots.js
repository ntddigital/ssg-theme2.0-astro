import fs from "fs";
import path from "path";
import { sitemapConfig } from '../../../sitemap.config.js';

function generateRobots() {
  if (!sitemapConfig?.site) return;

  // get sitemap URL
  function getSitemapUrl() {
    return `${sitemapConfig?.site}/sitemap.xml`;
  }

  function generateRobotsTxt() {
  
    // const robotsTxtContent = `User-agent: *\nDisallow: /\n${allowRules}\nAllow: /robots.txt\nAllow: /sitemap.xml\nSitemap: ${getSitemapUrl()}`;
    const robotsTxtContent = `User-agent: *\nDisallow: \nSitemap: ${getSitemapUrl()}`;

    return robotsTxtContent.trim();
  }

  function writeRobotsTxtToFile() {
    const robotsTxtContent = generateRobotsTxt();
    const publicPath = path.join(process.cwd(), "public", "robots.txt");
    fs.writeFileSync(publicPath, robotsTxtContent, "utf-8");
  }

  writeRobotsTxtToFile();
}
generateRobots();
