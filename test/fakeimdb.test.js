const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const Scraper = require('../index');

describe('Fake IMDBScraper', () => {
  it('is able to get film info', () => {
    const URL = 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1';
    const expectedTitle = 'Papillon (2017)';
    const expectedRating = '7.1';

    var callback = sinon.fake();
    const scrape = new Scraper.IMDB(URL);
    sinon.stub(scrape, 'action')
      .callsFake(() =>{
          return {title: expectedTitle, rating: expectedRating};
      });
    const film = scrape.action();

    expect(film.title.trim()).to.equal(expectedTitle);
    expect(film.rating).to.equal(expectedRating);
  });
});

describe('Fake IMDBScraper Request Method', () => {
  it('is able to get film info', () => {
    const URL = 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1';
    const expectedTitle = 'Papillon (2017)';
    const expectedRating = '7.1';
    const genres = [ 'Adventure', 'Biography', 'Crime' ];

    var callback = sinon.fake();
    const scrape = new Scraper.RequestMethodIMDB(URL);
    sinon.stub(scrape, 'action')
      .callsFake(() =>{
          return {title: expectedTitle, rating: expectedRating, genres: genres};
      });
    const film = scrape.action();

    expect(film.title.trim()).to.equal(expectedTitle);
    expect(film.rating).to.equal(expectedRating);
    expect(film.genres).to.equal(genres);
  });
});

describe('Fake IMDBScraper Array of urls', () => {
  it('is able to get films info', () => {
    const URLS = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];
    const expectedTitle = ['Papillon (2017)', 'In the Name of the Father (1993)'];
    const expectedRating = ['7.1', '8.1'];
    const genres = [['Adventure', 'Biography', 'Crime'], ['Biography', 'Drama']];

    var callback = sinon.fake();
    const scrape = new Scraper.RequestMethodIMDB(URLS);
    sinon.stub(scrape, 'action')
      .callsFake(() =>{
          return [
                    {title: expectedTitle[0], rating: expectedRating[0], genres: genres[0]},
                    {title: expectedTitle[1], rating: expectedRating[1], genres: genres[1]},
                 ];
      });
    const films = scrape.action();

    expect(films[0].title.trim()).to.equal(expectedTitle[0]);
    expect(films[0].rating).to.equal(expectedRating[0]);
    expect(films[0].genres).to.equal(genres[0]);
    expect(films[1].title.trim()).to.equal(expectedTitle[1]);
    expect(films[1].rating).to.equal(expectedRating[1]);
    expect(films[1].genres).to.equal(genres[1]);
  });
});

describe('Fake IMDBScraper Array of urls', () => {
  it('is able to download posters', () => {
    const URLS = [ 'https://www.imdb.com/title/tt5093026/?ref_=nv_sr_1?ref_=nv_sr_1',
                  'https://www.imdb.com/title/tt0107207/?ref_=nv_sr_1?ref_=nv_sr_1'
                ];
    const expectedTitle = ['Papillon (2017)', 'In the Name of the Father (1993)'];
    const expectedRating = ['7.1', '8.1'];
    const posters = ['https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_UX182_CR0,0,182,268_AL_.jpg',
                     'https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg'];

    var callback = sinon.fake();
    const scrape = new Scraper.RequestMethodIMDB(URLS);
    sinon.stub(scrape, 'action')
      .callsFake(() =>{
          return [
                    {title: expectedTitle[0], rating: expectedRating[0], poster: posters[0]},
                    {title: expectedTitle[1], rating: expectedRating[1], poster: posters[1]},
                 ];
      });
    const films = scrape.action();

    expect(films[0].title.trim()).to.equal(expectedTitle[0]);
    expect(films[0].rating).to.equal(expectedRating[0]);
    expect(films[0].poster).to.equal(posters[0]);
    expect(films[1].title.trim()).to.equal(expectedTitle[1]);
    expect(films[1].rating).to.equal(expectedRating[1]);
    expect(films[1].poster).to.equal(posters[1]);
  });
});
describe('Fake IMDBScraper with CSRF-TOKEN', () => {
  it('is able to log in', () => {
    const logged = true;
    const loggedCookie = 'asflsdjfsk';
    var callback = sinon.fake();
    const scrape = new Scraper.TokenIMDB(
                      "http://quotes.toscrape.com/login",
                      "http://quotes.toscrape.com/login",
                      "admin", "admin");
    sinon.stub(scrape, 'action')
      .callsFake(() =>{
          return {nextCookie: loggedCookie, loggedIn: true};
      });
    const login = scrape.action();

    expect(login.loggedIn).to.equal(logged);
    expect(login.nextCookie).to.equal(loggedCookie);
  });
});
