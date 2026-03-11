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
    app.get("/mba/api/v1/bookings",
        AuthMiddleware.isAuthenticated,
        BookingController.getBookings
    );      
    app.get("/mba/api/v1/bookings/all",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdmin,
        BookingController.getAllBookings
    );
    app.get("/mba/api/v1/bookings/:bookingId",
        AuthMiddleware.isAuthenticated,
        BookingController.getBookingById
    );
}

module.exports = routes;