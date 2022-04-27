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
const { response } = require('express');
const res = require('express/lib/response');
// const req = require('express/lib/request');

//// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!')
});


app.get('/books', getBooks);
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

app.post('/books', postBooks);
async function postBooks (request, response, next) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch(err) {
    next(err);
  }
}

app.delete('/books/:id', deleteBooks);
async function deleteBooks (req, res) {
  let id = req.params.id;
  try {
    await Book.findByIdAndDelete(id);
    res.status(204).send('success');
  } catch(err) {
    console.error(error);
    res.status(404).send(`Something went wrong, could not delete Book with id of ${id}`)
  }
}

app.put('/books/:id', putBooks);
async function putBooks (req, res) {
  let id = req.params.id;
  try {
    // findByIdAndUpdate() method takes in 3 arguments
    // - 1. ID of the thing in the database to update
    // - 2. The updated data
    // - 3. An options object 
    let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, overwrite: true });
  res.status(200).send(updatedBook);
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
