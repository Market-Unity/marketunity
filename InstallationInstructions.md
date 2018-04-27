# Installation Instructions #
 
## Description ##
  > Market Unity is a MERN stack appilcation that returns search product results from eBay and BestBuy and provides links to items on both of those websites

## Getting Started ##
  > After downloading the repository, run "npm install." All neccesary dependencies should be added.
  
## Best Buy API ##
  > Get Best Buy API key here: https://developer.bestbuy.com/
  > Test the Best Buy query here: https://bestbuyapis.github.io/bby-query-builder/#/productSearch

## eBay API ##
  > Register for an eBay developer account and request an API key here: https://developer.ebay.com/DevZone/account/
  > For eBay, be sure to request a PRODUCTION API key. Sandbox will not work. The key needed is the App ID
  > Using the eBay npm package is the easiest way to make calls to the eBay API and receive JSON data refer to this page for more information: https://www.npmjs.com/package/ebay

## Save API Keys in separate file ##
  > a file with the following schema should be added to the "server/searchHelpers/" directory. 

  module.exports = {
    bestBuy: 'api key string',
    ebay: 'api key string'
  };

## Starting Database ##
  > Install mongodb to your system if you have not already. Then run the command "mongod" in your terminal
  
## Start Webpack and Server ##
  > Execute the following two commands in your terminal. Both can be found in the root directory's package.json
  > "npm run webpack"
  > "npm start"
