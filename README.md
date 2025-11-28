# Web Scraper API

Advanced web scraping server optimized for Vercel deployment.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy to Vercel:
   - Push to GitHub
   - Connect repository to Vercel
   - Deploy automatically

## 📖 API Endpoints

### GET /api/health
Health check endpoint

### GET/POST /api/scrape
Web scraping endpoint

**Parameters:**
- `url` (required): The URL to scrape
- `selector`: CSS selector to extract specific elements

**Examples:**
```bash
# Basic scraping
curl "https://your-app.vercel.app/api/scrape?url=https://example.com"

# Extract specific elements
curl "https://your-app.vercel.app/api/scrape?url=https://example.com&selector=.title"
```

## 🛠️ Local Development

```bash
npm run dev
```

## ⚖️ Legal Notice

Always respect robots.txt and website terms of service.
