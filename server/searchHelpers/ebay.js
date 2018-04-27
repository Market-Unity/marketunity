const api = require('./apiKeys.js');
const Ebay = require('ebay');

module.exports = function(searchString) {

  //function for consistantly formatting the variety of price formats that the API returns
  const ebayPriceFormat = function(priceString) {
    let priceArr = priceString.split('.');

    if (priceArr.length === 1) {
      return priceString + '.00';
    }

    let cents = priceArr[1];

    if (cents.length === 0) {
      return priceString + '00';
    } else if (cents.length === 1) {
      return priceString + '0';
    } else {
      return priceString;
    }
  };

  //This NPM package creates Ebay class object with your API key
  const ebay = new Ebay({
    app_id: api.ebay
  });


  var params = {
    //The ebay API has several functions. The one we are using is findItemsByKeywords
    'OPERATION-NAME': 'findItemsByKeywords',
    //The below line limits results to 10
    'paginationInput.entriesPerPage': 10,
    //The line below limits one page of resutls
    'paginationOutput.totalPages': 1,
    //this is the acutaly query
    'keywords': searchString
  };

  //A promise is needed here to ensure that the aggregate search function waits for this api search resolve
  return new Promise((resolve, reject) => { 

  //returns array of 10 products in appropriate format
    ebay.get('finding', params, function (err, data) {
      if (err) {
        reject(err);
      } else {

        //data is the API response in the form of an object
        //the line below accesses the array of items from the data object received
        let items = data.findItemsByKeywordsResponse[0].searchResult[0].item;

        //takes the above array and returns an array of items 
        //refactored to our data structure schema
        let results = items.map(item => {
          return {
            name: item.title[0],
            url: item.viewItemURL[0],
            price: ebayPriceFormat('$' + item.sellingStatus[0].currentPrice[0].__value__),
            image: item.galleryURL[0],
            description: item.condition[0].conditionDisplayName[0]
          };
        });

        //fulfills the promise with the refactored array of items
        resolve(results);
      }
    });
  });
};