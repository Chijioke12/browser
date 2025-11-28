const { scrapeWithAxios } = require('./utils/scraper');
const { validateUrl, sanitizeInput } = require('./utils/helpers');

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Handle both GET and POST requests
        const { url, selector } = req.method === 'POST' ? req.body : req.query;

        // Validation
        if (!url) {
            return res.status(400).json({
                error: 'Missing required parameter',
                message: 'URL parameter is required'
            });
        }

        if (!validateUrl(url)) {
            return res.status(400).json({
                error: 'Invalid URL',
                message: 'Please provide a valid HTTP/HTTPS URL'
            });
        }

        const sanitizedUrl = sanitizeInput(url);
        
        const result = await scrapeWithAxios(sanitizedUrl, {
            selector: selector ? sanitizeInput(selector) : null
        });

        res.status(200).json({
            success: true,
            url: sanitizedUrl,
            method: 'axios',
            timestamp: new Date().toISOString(),
            data: result
        });

    } catch (error) {
        console.error('Scraping error:', error);
        
        res.status(500).json({
            success: false,
            error: error.name || 'ScrapingError',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
}