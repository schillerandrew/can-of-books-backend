'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');
mongoose.connect(process.env.DB_URL);

async function seed() {

  await Book.create({
    title: 'The Fellowship of the Ring',
    description: 'FOTR desc',
    status: 'in print',
  });
  console.log('FOTR was added');

  await Book.create({
    title: 'The Two Towers',
    description: 'TT desc',
    status: 'in print',
  });
  console.log('TT was added');

  
  await Book.create({
    title: 'The Return of the King',
    description: 'RotK desc',
    status: 'in print',
  });
  console.log('ROTK was added');
  mongoose.disconnect();
}

seed();