'use strict';

//// REQUIRES
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//// add mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

//// define PORT to validate env is working
const PORT = process.env.PORT || 3001;

//// ROUTES
app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
