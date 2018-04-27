const bestBuy = require('./bestbuy.js');
const ebay = require('./ebay.js');

module.exports = function(searchString) {

  //bubble sort function to sort all results by highest price to lowest
  const bubbleSortByPrice = function(arr) {

    //do this loop as many times as there are elements in the array
    //Not the most efficient bubble sort implementation, but will loop long enough to sort all data
    let x = 0;
    while (x < arr.length) {

      for (var i = 0; i < arr.length - 1; i++) {
        if (parseFloat(arr[i + 1].price) > parseFloat(arr[i].price)) {
          let storage = arr[i + 1];
          arr[i + 1] = arr[i]; 
          arr[i] = storage;
        }
      }
      x++;
    }
  
    return arr;
  };

  //a promise is needed here because the search results
  //need to be ready before sending to the client
  return new Promise((resolve, reject) => {

    //async function waits on both eBay and Best Buy API promises
    async function aggregateResults(searchString) {
      let ebayResults = await ebay(searchString);
      let bestBuyResults = await bestBuy(searchString);

      //arrays are joined together and then sorted from highest price to lowest
      return bubbleSortByPrice(ebayResults.concat(bestBuyResults));
    }
    
    //the below line actually calls the function delcared on line 32
    resolve(aggregateResults(searchString));
  });
};