'use strict';

//// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//// USE
const app = express();


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

//// MIDDLEWARE
app.use(cors());
app.use(express.json());

const Book = require('./models/book.js');
const req = require('express/lib/request');

//// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!')
});

app.get('/books', getBooks);
app.post('/books', postBooks);

async function getBooks (request, response, next) {
  try {
    let queryObject = {};
    if (request.query.location) {
      queryObject.location = request.query.location;
    }
    console.log(queryObject.location);
    let results = await Book.find(queryObject);
    response.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postBooks (request, response, next) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR HANDLING
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
