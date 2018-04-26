const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helpers = require('../data/db/helpers.js');
const User = require('../data/db/models/newUser.js');
const searchHelper = require('./searchHelpers/searchHelper.js');
const connection = require('../data/db/connection.js');
const jwt = require('jsonwebtoken');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //if objects return empty, switch to http parsing thing

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(1337, function () {
  console.log('App listening on port 1337');
});

/***********************************************************************/
/***************************** Search Route ****************************/
/***********************************************************************/

app.get('/search', function(req, res) {
  let searchTerm = req.body.searchTerm;
  //returns sorted array of search results
  let searchResults = searchHelper(searchTerm);
  //TODO respond with searchResultsArray
});



/***********************************************************************/
/************************* Register Route ******************************/
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
/************************* Login Route *********************************/
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
  helpers.verifyToken(req.headers, (err, data) => {
    if (err) { res.end(JSON.stringify('Unable to verify token: ', err)); }
    res.end(JSON.stringify(data));
  });
});

/***********************************************************************/
/************************* Logut Route ********************************/
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
<<<<<<< HEAD

app.post('/fav', function(req, res) {

  for (i in req.body) {
    console.log(req.body[i]);
  }
  // helpers.verifyToken(req.headers, (err, data) => {
  //   if (err) { res.end(JSON.stringify('Unable to verify token: ', err)); }
  //   currentUser.username = data;
  //   helpers.insertFav(currentUser, (err, data) => {

  //   });
  // });
});
=======
>>>>>>> 770972b33a82b6e23a5b4119e5de60fbd85c668b
