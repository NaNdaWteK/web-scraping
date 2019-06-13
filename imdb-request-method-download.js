const requestPromise = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class IMDBScraper{
  constructor(urls){
    this.urls = urls;
    this.info = [];
  }
  async action() {
    for(let movieURI of this.urls){
      const response = await requestPromise({
        uri: movieURI,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-GB,en;q=0.5',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Host': 'www.imdb.com', // remove host in download file because es3 is the host
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64;rv:60.0) Gecko/20100101 Firefox/60.0'
        },
        gzip: true
      });
      const $ = cheerio.load(response);

      let title = $('div[class="title_wrapper"] > h1').text();
      let rating = $('span[itemprop="ratingValue"]').text();
      let poster = $('div[class="poster"] > a > img').attr('src');
      this.info.push({
        title: title.trim(),
        rating: rating,
        poster: poster
      });
      this._downloadFile(title, poster);
    }

    return this.info;
  }

  async _downloadFile(title, poster) {
    let directory = 'images';
    this._createDirectory(directory);
    let image = `${this._removedSpaces(title)}.png`;
    let filePath = path.join(directory, image );
    let file = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      let stream = request({
        uri: poster,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-GB,en;q=0.5',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64;rv:60.0) Gecko/20100101 Firefox/60.0'
        },
        gzip: true
      }).pipe(file)
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  _removedSpaces(string){
    return string.replace(/\s+/g, '');
  }

  _createDirectory(dir){
    if (!fs.existsSync(`./${dir}`)){
        fs.mkdirSync(`./${dir}`);
    }
  }

}

module.exports = IMDBScraper;
