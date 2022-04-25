'use strict';

//// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//// USE
const app = express();
app.use(cors()); //middleware

//// define PORT to validate env is working
const PORT = process.env.PORT || 3002;

//// add mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//////////////// we have to bring in a schema if we want to interact with that model
// const Cat = require('./models/cat.js');
// const req = require('express/lib/request');

//// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!')
});

app.get('/books', getBooks);

///////////// working on this function
async function getBooks(request, response, next) {
  try {
    let queryObject = {}
    if (request.query.location) {
      queryObject.location = request.query.location;
    }
    let results = await Cat.find(queryObject);
    response.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR HANDLING
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
