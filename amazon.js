var amazon = require('amazon');

var client = amazon.createClient({
  awsId: "aws ID",
  awsSecret: "aws Secret",
  awsTag: "aws Tag"
});

client.itemSearch({
  director: 'Quentin Tarantino',
  actor: 'Samuel L. Jackson',
  searchIndex: 'DVD',
  audienceRating: 'R',
  responseGroup: 'ItemAttributes,Offers,Images'
}, function(err, results, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(results);  // products (Array of Object) 
    console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.) 
  }
});

//https://docs.aws.amazon.com/AWSECommerceService/latest/DG/becomingAssociate.html