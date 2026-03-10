const BookingController = require("../controllers/booking.controller");
const BookingMiddleware = require("../middlewares/booking.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post("/mba/api/v1/booking",
        AuthMiddleware.isAuthenticated,
        BookingMiddleware.validateBookingCreateRequest ,
        BookingController.createBooking);
}

module.exports = routes;