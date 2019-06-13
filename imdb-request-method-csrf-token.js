const request = require('request-promise');
const cheerio = require('cheerio');

class IMDBScraper{
  constructor(get, post, name, pass){
    this.get = get;
    this.post = post;
    this.name = name;
    this.pass = pass;
    this.result = {};
  }
  async action() {
    console.log('Doing the get request...');
    const getRequest = await request({
      uri: this.get,
      method: 'GET',
      gzip: true,
      resolveWithFullResponse: true
    });
    const cookie = getRequest.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');
    const $ = cheerio.load(getRequest.body);
    const csrfToken = $('input[name="csrf_token"]').val();

    console.log('Doing the post login request...');

    const loginRequest = await request({
      uri: this.post,
      method: 'POST',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'quotes.toscrape.com',
        'Referer': 'http://quotes.toscrape.com/login',
        'Upgrade-Insecure-Requests': '1',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64;rv:60.0) Gecko/20100101 Firefox/60.0'
      },
      form: {
        'csrf_token': csrfToken,
        'password': this.pass,
        'username': this.name
      },
      resolveWithFullResponse: true,
      gzip: true
    }).catch(response => {
      let nextRequestCookie = response.response.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');
      this.result = {
        loggedIn: (response.statusCode == '302') ? true : false,
        nextCookie: nextRequestCookie
      }
    });
    return this.result;
  }
}

module.exports = IMDBScraper;
