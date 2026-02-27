const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const MovieRoutes = require('./routes/movie.routes');

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MovieRoutes(app); //Invoking movie routes

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Hello, World!'
  });
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  const dbURL = process.env.DB_URL + '/' + process.env.DB_NAME;
  try {
    await mongoose.connect(dbURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});