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

  //if image url is undefined, then it will return a broken link
  const nullImage = function (imageUrl) {
    if (imageUrl === undefined) {
      return 'https://www.underconsideration.com/brandnew/archives/google_broken_image_00_b_logo_detail.gif';
    } else {
      return imageUrl[0];
    }
  };

  //The API will sometimes return a different class of product that does not have
  //item.condition array. This helper function fixes that problem
  const descriptionChecker = function(obj) {
    if (!obj) {
      return 'No description available';
    } else {
      return obj[0].conditionDisplayName[0];
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
        
        //create results variable to return. This will change if items variable is valid
        let results = [];

        //sometimes, the results returned are invalid. This condition checks to see that
        //if so, map the items as per the plan. If not, return an empty array
        if (items) {
        //takes the above array and returns an array of items 
        //refactored to our data structure schema
          results = items.map(item => {
            return {
              name: item.title[0],
              url: item.viewItemURL[0],
              price: ebayPriceFormat('$' + item.sellingStatus[0].currentPrice[0].__value__),
              image: nullImage(item.galleryURL),
              description: descriptionChecker(item.condition)
            };
          });
        }

        //fulfills the promise with the refactored array of items
        resolve(results);
      }
    });
  });
};