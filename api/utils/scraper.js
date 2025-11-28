const axios = require('axios');
const cheerio = require('cheerio');
const { getRandomUserAgent } = require('./helpers');

// Axios-based scraping for static content
async function scrapeWithAxios(url, options = {}) {
    try {
        const config = {
            method: 'GET',
            url: url,
            timeout: 15000,
            headers: {
                'User-Agent': getRandomUserAgent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        };

        const response = await axios(config);
        
        if (options.selector) {
            const $ = cheerio.load(response.data);
            const elements = [];
            $(options.selector).each((i, elem) => {
                elements.push({
                    text: $(elem).text().trim(),
                    html: $(elem).html(),
                    attributes: elem.attribs
                });
            });
            return { elements, totalFound: elements.length };
        }

        return {
            html: response.data,
            status: response.status,
            headers: response.headers,
            size: response.data.length,
            title: (() => {
                try {
                    const $ = cheerio.load(response.data);
                    return $('title').text().trim();
                } catch {
                    return '';
                }
            })()
        };

    } catch (error) {
        throw new Error(`Axios scraping failed: ${error.message}`);
    }
}

module.exports = {
    scrapeWithAxios
};