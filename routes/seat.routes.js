const SeatController = require("../controllers/seat.controller");
const SeatMiddleware = require("../middlewares/seat.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post("/mba/api/v1/seats",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        SeatMiddleware.validateCreateSeatRequest,
        SeatController.createSeats
    );
    app.get("/mba/api/v1/seats/:theatreId",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        SeatController.getSeats
    );
    app.patch("/mba/api/v1/seats/:seatId/:theatreId",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        SeatController.updateSeat
    );
    app.delete("/mba/api/v1/seats/:seatId/:theatreId",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        SeatController.deleteSeat
    );
};

module.exports = routes;