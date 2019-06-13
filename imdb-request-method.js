const request = require('request-promise');
const cheerio = require('cheerio');

class IMDBScraper{
  constructor(url){
    this.url = url;
    this.info = {};
  }
  async action() {
    const response = await request({
      uri: this.url,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.imdb.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64;rv:60.0) Gecko/20100101 Firefox/60.0'
      },
      gzip: true //content-encodign response headers needs able gzip
    });
    const $ = cheerio.load(response);

    this.info.title = $('div[class="title_wrapper"] > h1').text();
    this.info.rating = $('span[itemprop="ratingValue"]').text();
    return this.info;
  }

}

module.exports = IMDBScraper;
