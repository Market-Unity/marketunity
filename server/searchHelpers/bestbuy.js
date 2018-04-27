var apiKey = require('./apiKeys.js');
var axios = require('axios');


module.exports = function(searchString) {

  //this method splits search terms into the appropriate url format
  var searchTerms = 'search=' + searchString.split(' ').join('&search=');

  //this url is how the api is called
  var url = 'https://api.bestbuy.com/v1/products((' +
            searchTerms + 
            '))?apiKey=' + 
            apiKey.bestBuy +
            '&format=json';
  
  //A promise is needed here to ensure that the aggregate search function waits for this api search resolve
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      
      //takes the object returned by the API and isolates the products array
      let arr = res.data.products;

      //returns an array of items refactored to our data structure schema
      let results = arr.map(function(item) {
        return {
          name: item.name,
          url: item.url,
          price: item.salePrice,
          image: item.largeFrontImage,
          description: item.shortDescription
        };
      });

      //with the promise fullfilled, the data is returned
      resolve(results);
    }).catch(error => {
      reject(err);
    });
  });
};