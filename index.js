const IMDBScraper = require('./imdb');
const RequestMethodIMDBScraper = require('./imdb-request-method');
const TokenIMDBScraper = require('./imdb-request-method-csrf-token');
const FilmsIMDBScraper = require('./imdb-films');
const FilmsCSVIMDBScraper = require('./imdb-films-csv');
const DownloadIMDBScraper = require('./imdb-request-method-download');

const Scraper = {
  IMDB: IMDBScraper,
  RequestMethodIMDB: RequestMethodIMDBScraper,
  FilmsIMDB: FilmsIMDBScraper,
  FilmsCSVIMDB: FilmsCSVIMDBScraper,
  DownloadIMDB: DownloadIMDBScraper,
  TokenIMDB: TokenIMDBScraper
};

module.exports = Scraper;
