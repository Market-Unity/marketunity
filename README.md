## [Armadillo Search](https://damp-badlands-35259.herokuapp.com/)
Armadillo Search is an open source web application that lists products from eBay and Best Buy. Users can easily search for products, add them to a favorites list, and visit the website to purchase.

### [Live App](https://damp-badlands-35259.herokuapp.com/) 

### Team
- __Product Owner:__ [Phillip](https://github.com/th0s)
- __Scrum Master:__ [Amogh](https://github.com/akambale)
- __Lead Developer:__ [Eric](https://github.com/erichoonpark)
- __Software Engineering:__ Eric, Phillip, Amogh


### Requirements
- Node.js
- Express
- React
- MongoDB
- Amazon/Ebay APIs

## Development

### Best Buy API
[Get Best Buy API key](https://developer.bestbuy.com/)
   
[Test the Best Buy query](https://bestbuyapis.github.io/bby-query-builder/#/productSearch)

### eBay API
[Register for an eBay developer account and request an API key](https://developer.ebay.com/DevZone/account/)
   
For eBay, be sure to request a PRODUCTION API key. Sandbox will not work. The key needed is the App ID.
   
Using the eBay npm package is the easiest way to make calls to the eBay API and receive JSON data refer to [this page for more information.](https://www.npmjs.com/package/ebay)

### Save API Keys in separate file
   A file named "apiKeys.js" with the following schema should be added to the "server/searchHelpers/" directory. 

```sh
module.exports = {
  bestBuy: 'api key string',
  ebay: 'api key string'
}
```

### Starting Database 
Install mongodb to your system if you have not already. Then run the following command in your terminal:

```sh
mongod
```

### Installing Dependencies 

From within the root directory:

```sh
npm install
```

### NPM Scripts
npm scripts are provided for starting development server. From within the root directory:

Start Webpack:
```sh
npm run webpack
```

Start Server:
```sh
npm start
```



## Routes Diagrams

![Alt text](https://github.com/Market-Unity/marketunity/blob/master/Routes.png?raw=true)

![Alt text](https://github.com/Market-Unity/marketunity/blob/master/Routes2.png?raw=true)
