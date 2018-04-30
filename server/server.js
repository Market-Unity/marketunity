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

  const body = {
    message: '',
    token: ''
  };

  //function authenticates user
  helpers.authCheck(user, (err, data) => {
    if (err) { console.log(err); }
    if (!data) {
      body.message = 'Login failed. Invalid Username/Password.'
      res.end(JSON.stringify(body));
    }

    var token = jwt.sign(user.username, 'secretkey');

    body.message = 'Login Successful!';
    body.token = token;

    res.end(JSON.stringify(body));

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
  helpers.verifyToken(item.token, (err, data) => {
    if (err) { res.end(JSON.stringify(err)); }
    helpers.uniqueListingChecker(item, (isDuplicate) => {
      if (isDuplicate === true) {
        res.end('Item already favorites!');
      } else {
        helpers.insertFav(item, (err, data) => {
          if (err) { res.end(err); }
          res.end(JSON.stringify(data));
        });
      }
    });
  });

  //send array of saved items from the db back to the client
});

/***********************************************************************/
/************************* Unsave Item Route ***************************/
/***********************************************************************/

app.post('/unsaveitem', function (req, res) {

  //verify token takes a token and a callback
  helpers.verifyToken(req.body.token, (err, data) => {
    if (err) { res.end(JSON.stringify(err)); }

    //remove favorite takes a username, a item/product and a callback
    helpers.removeFav(req.body.username, req.body.product, (err, favArr) => {
      if (err) { res.end(err); }
      res.end(JSON.stringify(favArr));
    });
  });

  //send array of saved items from the db back to the client
});

/***********************************************************************/
/*********************** Get Favorites Route ***************************/
/***********************************************************************/

app.post('/getfavorites', (req, res) => {
  let user = req.body.username;
  helpers.verifyToken(req.body.token, (err, data) => {
    if (err) { 
      res.end(JSON.stringify(err));
    } else {
      helpers.getFavs(user, (err, favArr) => {
        if (err) { 
          res.end(JSON.stringify(err));
        } else {
          res.end(JSON.stringify(favArr));
        }
      });
    }
  });
});

/***********************************************************************/
/************************* Wildcard Route ******************************/
/******************* handle all orther requests ************************/
/***********************************************************************/

app.get('/*', function (req, res) {
  res.redirect('/');
});
