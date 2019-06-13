const request = require('request-promise');
const cheerio = require('cheerio');

class IMDBScraper{
  constructor(url){
    this.url = url;
    this.info = {};
  }
  async action() {
    const response = await request(this.url);
    const $ = cheerio.load(response);

    this.info.title = $('div[class="title_wrapper"] > h1').text();
    this.info.rating = $('span[itemprop="ratingValue"]').text();
    this.info.genres = this.getGendres($);
    return this.info;
  }

  getGendres($){
    let genres = [];
    $('div[class="title_wrapper"] a[href^="/search/"]').each((i, element) => {
      genres.push($(element).text());
    });
    return genres;
  }

}

module.exports = IMDBScraper;
