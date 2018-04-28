## Armadillo Search ##
Armadillo Search is an open source web application that lists products from eBay and Best Buy. Users can easily search for products, add them to a favorites list, and visit the webstore to purchase.

MERN stack appilcation that returns search product results from eBay and BestBuy and provides links to items on both of those websites.

## Getting Started ##

## Team ##
Product Owner: Phillip
Scrum Master: Amogh
Software Engineering: Eric, Phillip, Amogh


## Requirements ##
Node.js
Express
React
MongoDB
Amazon/Ebay APIs

## Development

### Best Buy API
   Get Best Buy API key here: https://developer.bestbuy.com/
   
   Test the Best Buy query here: https://bestbuyapis.github.io/bby-query-builder/#/productSearch

### eBay API
   Register for an eBay developer account and request an API key here: https://developer.ebay.com/DevZone/account/
   
   For eBay, be sure to request a PRODUCTION API key. Sandbox will not work. The key needed is the App ID.
   
   Using the eBay npm package is the easiest way to make calls to the eBay API and receive JSON data refer to this page for more information: https://www.npmjs.com/package/ebay

### Save API Keys in separate file
   A file named "apiKeys.js" with the following schema should be added to the "server/searchHelpers/" directory. 

  > module.exports = {
  >  bestBuy: 'api key string',
  >  ebay: 'api key string'
  > };

### Starting Database 
   Install mongodb to your system if you have not already. Then run the command "mongod" in your terminal.
   
### Installing Dependencies 

From within the root directory:

```sh
npm install
```

### NPM Scripts
npm scripts are provided for starting development server

From within the root directory:

Start Webpack:
```sh
npm run webpack
```

Start Server:
```sh
npm run server-test
```
