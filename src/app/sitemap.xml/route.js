export async function GET() {
    const articles = await fetch('http://localhost:5000/api/articles').then(res => res.json());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://yourdomain.com</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${articles.map(article => `
      <url>
        <loc>https://yourdomain.com/article/${article.slug}</loc>
        <lastmod>${new Date(article.createdAt).toISOString()}</lastmod>
      </url>
    `).join('')}
  </urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
  