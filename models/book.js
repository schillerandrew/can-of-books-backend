'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our cat objects will be structured
const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
});

// define our model
// this will give it functionality and the predefined schema to shape our data.
// params: a string and a schema
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;