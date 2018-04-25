const api = require('./apiKeys.js');
const Ebay = require('ebay');

module.exports = function(searchString) {

  const ebay = new Ebay({
    app_id: api.ebay
  });

  var params = {
    'OPERATION-NAME': 'findItemsByKeywords',
    'paginationInput.entriesPerPage': 10,
    'paginationOutput.totalPages': 1,
    'keywords': searchString
  };

  //A promise is needed here to ensure that the aggregate search function waits for this api search resolve
  return new Promise((resolve, reject) => { 
  //returns array of 10 products in appropriate format
    ebay.get('finding', params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        //finds the path to the array of items
        let items = data.findItemsByKeywordsResponse[0].searchResult[0].item;

        //returns an array of items refactored to our data structure schema
        let results = items.map(item => {
          return {
            name: item.title[0],
            url: item.viewItemURL[0],
            price: item.sellingStatus[0].currentPrice[0].__value__,
            image: item.galleryURL[0],
            description: item.condition[0].conditionDisplayName[0]
          };
        });
        resolve(results);
      }
    });
  });
};