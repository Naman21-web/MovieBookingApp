const BookingController = require("../controllers/booking.controller");
const BookingMiddleware = require("../middlewares/booking.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post("/mba/api/v1/bookings",
        AuthMiddleware.isAuthenticated,
        BookingMiddleware.validateBookingCreateRequest ,
        BookingController.createBooking);
    app.patch('/mba/api/v1/bookings/:bookingId',
        AuthMiddleware.isAuthenticated,
        BookingMiddleware.canChangeStatus,
        BookingController.updateBooking
    );       
}

module.exports = routes;