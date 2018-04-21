var amazon = require('amazon-product-api');
var apiKey = require('/.apiKeys.js');

var client = amazon.createClient({
  awsId: apiKey.amazon.awsId,
  awsSecret: apiKey.amazon.awsSecret,
  awsTag: ''
});

client.itemSearch({
  keywords: 'Harry Potter'
}).then(function(results) {
  console.log(results);
}).catch(function(err) {
  console.log('------>', err);
});
