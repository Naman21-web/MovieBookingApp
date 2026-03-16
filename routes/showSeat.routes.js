const ShowSeatController = require('../controllers/showSeat.controller');

const routes = (app) => {
    // app.post("/mba/api/v1/showSeats",
    //     AuthMiddleware.isAuthenticated,
    //     AuthMiddleware.isAdminOrOwner,
    //     ShowMiddleware.validateCreateShowRequest,
    //     ShowController.createShow
    // )
    app.get("/mba/api/v1/showSeats/:showId",
        ShowSeatController.getShowSeats
    )
    // app.delete("/mba/api/v1/showSeats/:showId",
    //     AuthMiddleware.isAuthenticated,
    //     AuthMiddleware.isAdminOrOwner,
    //     ShowController.deleteShow
    // )
    // app.patch("/mba/api/v1/shows/:showId",
    //     AuthMiddleware.isAuthenticated,
    //     AuthMiddleware.isAdminOrOwner,
    //     ShowMiddleware.validateShowUpdateRequest,
    //     ShowController.updateShow
    // )
};

module.exports = routes;