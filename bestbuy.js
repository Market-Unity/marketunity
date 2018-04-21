var apiKey = require('./apiKeys.js');
var axios = require('axios');


module.exports = function(searchString) {
  var arr = [];

  var searchTerms = 'search=' + searchString.split(' ').join('&search=');

  var url = 'https://api.bestbuy.com/v1/products((' +
            searchTerms + 
            '))?apiKey=' + 
            apiKey.bestBuy +
            '&format=json';

  axios.get(url).then(res => {
    arr = res.data.products;
  }).catch(error => {
    console.log(error);
  });

  return arr.map(function(item) {
    return {
      name: item.name,
      url: item.url,
      price: item.salePrice,
      image: item.largeFrontImage,
      description: item.shortDescription
    };
  });

};