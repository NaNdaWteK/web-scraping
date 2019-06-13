const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const CsvParser = require('json2csv').Parser;

class IMDBScraper{
  constructor(urls){
    this.urls = urls;
    this.info = [];
  }
  async action() {
    for(let movieURI of this.urls){
      const response = await request(movieURI);
      const $ = cheerio.load(response);

      let title = $('div[class="title_wrapper"] > h1').text();
      let rating = $('span[itemprop="ratingValue"]').text();
      let genres = this.getGendres($);
      this.info.push({
        title: title.trim(),
        rating: rating,
        genres: genres
      });
    }

    const fields = ['title', 'rating'];
    const json2csvParser = new CsvParser({fields});
    const csv = json2csvParser.parse(this.info);

    fs.writeFileSync('./films.csv', csv, 'utf-8');

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
