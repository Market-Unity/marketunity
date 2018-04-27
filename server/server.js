const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helpers = require('../data/db/helpers.js');
const User = require('../data/db/models/newUser.js');
const searchHelper = require('./searchHelpers/searchHelper.js');
const connection = require('../data/db/connection.js');
const jwt = require('jsonwebtoken');
const path = require('path');



/***********************************************************************/
/*********** Establishing Server and Listening on Port *****************/
/***********************************************************************/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(1337, function () {
  console.log('App listening on port 1337');
});

/***********************************************************************/
/***************************** Search Route ****************************/
/***********************************************************************/

app.post('/search', function(req, res) {
  let searchTerm = req.body.query;

  //returns sorted array of search results
  //waits for promise of search results before sending to client
  async function sendData(searchTerm) {
    let searchResults = await searchHelper(searchTerm);
    res.end(JSON.stringify(searchResults));
  }

  //calls the async function declared five lines above
  sendData(searchTerm);
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

app.post('/login', function(req, res) {
  
  //user object is assembled from request body
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  
  //function authenticates user
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
/************************* Logout Route ********************************/
/***********************************************************************/


app.get('/logout', function(req, res) {
  //destroy session function

  res.redirect('/'); 
});

/***********************************************************************/
/************************ Save Item Route ******************************/
/***********************************************************************/

app.post('/saveitem', function(req, res) {
  let item = req.body;

  helpers.verifyToken(req.headers, (err, data) => {
    if (err) { res.end(JSON.stringify(err)); }
    helpers.uniqueListingChecker(item, (isDuplicate) => {
      if (isDuplicate === true) {
        res.end('Item already favorites!');
      }
      helpers.insertFav(item, (err, data) => {
        if (err) { res.end(err); }
        res.end(JSON.stringify(data));
      });
    });
  });

  //send array of saved items from the db back to the client
});

/***********************************************************************/
/************************* Unsave Item Route ***************************/
/***********************************************************************/

app.post('/unsaveitem', function (req, res) {
  let item = req.body;

  helpers.verifyToken(req.headers, (err, data) => {
    if (err) { res.end(JSON.stringify(err)); }
    helpers.removeFav(item, (err, data) => {
      if (err) { res.end(err); }
      res.end(JSON.stringify(data));
    });
  });

  //send array of saved items from the db back to the client
});


/***********************************************************************/
/************************* Wildcard Route ******************************/
/******************* handle all orther requests ************************/
/***********************************************************************/

app.get('/*', function (req, res) {
  res.redirect('/');  
});