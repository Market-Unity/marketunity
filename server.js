const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helpers = require('./data/db/helpers.js');
const User = require('./data/db/models/newUser.js');
const bestBuy = require('./bestbuy.js');
const connection = require('./data/db/connection.js');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //if objects return empty, switch to http parsing thing

app.get('/', function(request, response) {
  response.send('sup');
  response.end('updog');
});

app.listen(1337, function() {
  console.log('App listening on port 1337');
});

/* 
  TO DO LIST
  1. Create function to create session
  2. Create function to check is uer exists in db
*/

/***********************************************************************/
/********************** BestBuy Search Route ***************************/
/***********************************************************************/

app.get('/search', function(req, res) {
  var searchTerm = req.body.searchTerm;
  var bestBuyArr = bestBuy(searchTerm);

});



/***********************************************************************/
/************************* Register Routes *****************************/
/***********************************************************************/

app.post('/register', function(req, res) {
  //parse the username and password
  var user = {
    username: req.body.username,
    password: req.body.password
  };


  //this function will return a boolean or error to the front end
  helpers.register(user, function(err, successfulRegister) {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(successfulRegister));
    }
  });

  //TODO: Imp Sessions

});

/***********************************************************************/
/***********************************************************************/
/************************* Login Routes ********************************/
/***********************************************************************/
/***********************************************************************/


//post username and password to db
app.post('/login', function(req, res) {

  const user = {
    username: req.body.username,
    password: req.body.password
  };

  helpers.authCheck(user, (err, data) => {
    if (err) { console.log(err); }
    if (data === false) {
      res.end('Login failed. Invalid Username/Password.');
    }

    var token = jwt.sign(user.username, 'secretkey');

    res.json({
      token: token
    });

    res.end('Login successful!');
  });

});

app.get('/login', function(req, res) {
  jwt.verify(req.headers.token, 'secretkey', function (err, data) {
    if (err) { res.end(JSON.stringify(err)); }
    res.end(JSON.stringify(data));
  });
});

/***********************************************************************/
/***********************************************************************/
/************************* Logut Routes ********************************/
/***********************************************************************/
/***********************************************************************/


app.get('/logout', function(request, response) {
  //destroy session function
  //redirect to login
});

/***********************************************************************/
/***********************************************************************/
/************************* Wildcard Route ******************************/
/******************* handle all orther requests ************************/
/***********************************************************************/

app.get('/*', function(request, response) {
  //redirect to '/'

  //not sure if anything else is needed

});

