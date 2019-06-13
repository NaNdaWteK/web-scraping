const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const Scraper = require('../index');
chai.use(require('chai-fs'));

describe('Real IMDBScraper', () => {
  it('is able to get film info', async () => {
    const URL = 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1';
    const expectedTitle = 'Papillon (2017)';
    const expectedRating = '7.1';
    const expectedGenres = [ 'Adventure', 'Biography', 'Crime' ];

    const scrape = new Scraper.IMDB(URL);
    const film = await scrape.action();

    expect(film.title.trim()).to.equal(expectedTitle);
    expect(film.rating).to.equal(expectedRating);
    expect(film.genres).to.eql(expectedGenres);

  });
});

describe('Real IMDBScraper', () => {
  it('is able to get film info with request method', async () => {
    const URL = 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1';
    const expectedTitle = 'Papillon (2017)';
    const expectedRating = '7.1';

    const scrape = new Scraper.RequestMethodIMDB(URL);
    const film = await scrape.action();

    expect(film.title.trim()).to.equal(expectedTitle);
    expect(film.rating).to.equal(expectedRating);
  });
});

describe('Real IMDBScraper', () => {
  it('is able to get films info', async () => {
    const urls = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];
    const expectedTitle = ['Papillon (2017)', 'En el nombre del padre (1993)'];
    const expectedRating = ['7.1', '8.1'];
    const genres = [[ 'Adventure', 'Biography', 'Crime' ], [ 'Biography', 'Drama' ]];

    const scrape = new Scraper.FilmsIMDB(urls);
    const films = await scrape.action();

    expect(films[0].title.trim()).to.equal(expectedTitle[0]);
    expect(films[0].rating).to.equal(expectedRating[0]);
    expect(films[0].genres).to.eql(genres[0]);
    expect(films[1].title.trim()).to.equal(expectedTitle[1]);
    expect(films[1].rating).to.equal(expectedRating[1]);
    expect(films[1].genres).to.eql(genres[1]);
  });

  it('create films.json in root path', async () => {
    const files = ['films.json'];
    const path = './';
    const jsonPath = './films.json';
    const data = '[{"title":"Papillon (2017)","rating":"7.1","genres":["Adventure","Biography","Crime"]},{"title":"En el nombre del padre (1993)","rating":"8.1","genres":["Biography","Drama"]}]';
    const urls = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];

    const scrape = new Scraper.FilmsIMDB(urls);
    const films = await scrape.action();

    expect(path).to.be.a.directory().and.include.files(files);
    expect(jsonPath).to.be.a.file().with.content(data);
  });

  it('create films.csv in root path', async () => {
    const files = ['films.csv'];
    const path = './';
    const jsonPath = './films.csv';
    const urls = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];

    const scrape = new Scraper.FilmsCSVIMDB(urls);
    const films = await scrape.action();

    expect(path).to.be.a.directory().and.include.files(files);
    expect(jsonPath).to.be.a.file().with.contents.that.match(/"title","rating"/g);
  });
});

describe('Real IMDBScraper', () => {
  it('download images has images urls', async () => {
    const urls = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];
    const expectedUrls = ['https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_UX182_CR0,0,182,268_AL_.jpg',
                          'https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg'];

    const scrape = new Scraper.DownloadIMDB(urls);
    const films = await scrape.action();

    expect(films[0].poster).to.equal(expectedUrls[0]);
    expect(films[1].poster).to.equal(expectedUrls[1]);
  });

  it('download images in images folder', async () => {
    const files = ['IntheNameoftheFather(1993).png', 'Papillon(2017).png'];
    const path = './images';
    const urls = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];

    const scrape = new Scraper.DownloadIMDB(urls);
    const films = await scrape.action();

    expect(path).to.be.a.directory().and.include.files(files);
  });
});
describe('Real IMDBScraper with CSRF-TOKEN', () => {
  it('focustest is able to log in', async () => {
    const logged = true;
    const scrape = new Scraper.TokenIMDB(
                      "http://quotes.toscrape.com/login",
                      "http://quotes.toscrape.com/login",
                      "admin", "admin");
    const login = await scrape.action();

    expect(login.loggedIn).to.equal(logged);
    expect(login.nextCookie).to.be.a('string');
  });
});
