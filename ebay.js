var $ = require('jquery');
var queryWords = "Harry potter";


var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=MyAppID";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=harry%20potter";
    url += "&paginationInput.entriesPerPage=3";

// var test = function() {
//   $.ajax({
//     type:'GET',
//     dataType: 'json',
//     url: url,
//     success: function(data) {
//       console.log(data);
//     }
//   });
// }

// test();

console.log(url);

//go here http://developer.ebay.com/DevZone/account/