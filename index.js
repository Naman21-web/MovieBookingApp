const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');
const BookingRoutes = require('./routes/booking.routes');
const ShowRoutes = require("./routes/show.routes");
const PaymentRoutes = require("./routes/payment.route");
const SeatsRoutes = require("./routes/seat.routes");
const ShowSeatRoutes = require("./routes/showSeat.routes");
const mailerCron = require("./crons/cron");
const redisClient = require("./redis/redisClient");


env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MovieRoutes(app); //Invoking movie routes
TheatreRoutes(app); //Invoking theatre routes
AuthRoutes(app); //invoking auth routes
UserRoutes(app); //invoking user routes
BookingRoutes(app);//invoking booking routes
ShowRoutes(app);//invoking show routes
PaymentRoutes(app);//invoking payment routes
SeatsRoutes(app);//invoking seat routes
ShowSeatRoutes(app);//invoking show seat routes

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Hello, World!'
  });
});

// mongoose.set('debug',true);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  const dbURL = process.env.DB_URL + '/' + process.env.DB_NAME;
  try {
    await mongoose.connect(dbURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  mailerCron();
  redisClient.connectRedis();
});