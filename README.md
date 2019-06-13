## Web Scraping

*   When we scrape a website we need to check if this website ommit no web scraping use
*   You need respect the client data
*   No do spam like in test mode
*   Use real test only when you want to ensure the website has no modify the interface

### Launch test

*   test: `npm test`
*   real test: `npm run test-real`
*   focustest test: `npm run test-focus` #with focustest word in the it string parameter of the test

### Login with csrf-token

We use the website [toscrape](www.toscrape.com)
We need to do get request to get the cookie an the token, after that we do the postLogin with the method request.
