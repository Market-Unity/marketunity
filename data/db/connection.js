const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/marketunity');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to Database!');
})
  .on('error', console.error.bind(console, 'Connection error: '));
