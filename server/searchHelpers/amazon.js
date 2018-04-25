// var amazon = require('amazon-product-api');
// var apiKey = require('./apiKeys.js');

// var client = amazon.createClient({
//   awsId: apiKey.amazon.awsId,
//   awsSecret: apiKey.amazon.awsSecret,
//   awsTag: apiKey.amazon.awsTag
// });

// console.log(apiKey.amazon);

// client.itemSearch({
//   keywords: 'Harry Potter'
// }).then(function(results) {
//   console.log(results);
// }).catch(function(err) {
//   console.log('------>', err);
// });

var bubbleSortByPrice = function(arr) {

  //do this loop as many times as there are elemnts in the array
  let x = 0;
  while (x < arr.length) {
  //for loop
    for (var i = 0; i < arr.length - 1; i++) {
      console.log(arr[i+1].price);
    //compare the first index to the next index
      //if the second price is greater than the first price
      if (parseFloat(arr[i + 1].price) > parseFloat(arr[i].price)) {
        //store the value of the second
        let storage = arr[i + 1];
        //set the vaue of the second as the first
        arr[i + 1] = arr[i]; 
        //set the value of the first as the storage
        arr[i] = storage;
      }
    }
    x++;
  }

  return arr;
};

var arr = [ { name: 'adidas Pharrell Williams Tennis Hu Shoes Men\'s ',
url: 'http://www.ebay.com/itm/adidas-Pharrell-Williams-Tennis-Hu-Shoes-Mens-/152960202756?var=452745599516',
price: '49.99',
image: 'http://thumbs1.ebaystatic.com/pict/1529602027564040_4.jpg',
description: 'New with box' },
{ name: 'adidas Pharrell Williams Tennis Hu Shoes Men\'s ',
url: 'http://www.ebay.com/itm/adidas-Pharrell-Williams-Tennis-Hu-Shoes-Mens-/152960202756?var=452745599483',
price: '49.99',
image: 'http://thumbs1.ebaystatic.com/pict/152960202756404000000003_1.jpg',
description: 'New with box' },
{ name: 'adidas Pharrell Williams Tennis Hu Shoes Men\'s ',
url: 'http://www.ebay.com/itm/adidas-Pharrell-Williams-Tennis-Hu-Shoes-Mens-/152960202756?var=452745599533',
price: '49.99',
image: 'http://thumbs1.ebaystatic.com/pict/1529602027564040_4.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140499',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/2924885070904040_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140495',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000003_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140529',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000003_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140532',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000003_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140538',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000003_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140515',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000004_1.jpg',
description: 'New with box' },
{ name: 'New Balance NBG1005  Men\'s Minimus Spikeless Golf Shoe, Brand NEW',
url: 'http://www.ebay.com/itm/New-Balance-NBG1005-Mens-Minimus-Spikeless-Golf-Shoe-Brand-NEW-/292488507090?var=591331140480',
price: '45.59',
image: 'http://thumbs3.ebaystatic.com/pict/292488507090404000000003_1.jpg',
description: 'New with box' } ];

console.log(bubbleSortByPrice(arr));