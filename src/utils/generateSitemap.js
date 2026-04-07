const fs = require('fs');
const path = require('path');

const baseUrl = 'https://thibautraimond.github.io/pokedex';
const pokemonCount = 1350; // From PokeAPI

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

for (let i = 1; i <= pokemonCount; i++) {
  sitemap += `  <url>
    <loc>${baseUrl}/pokemon/${i}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

sitemap += '</urlset>';

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');

console.log('Sitemap generated at', outputPath);