const ShowController = require("../controllers/show.controller");
const ShowMiddleware = require("../middlewares/show.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post("/mba/api/v1/shows",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        ShowMiddleware.validateCreateShowRequest,
        ShowController.createShow
    )
    app.get("/mba/api/v1/shows",
        ShowMiddleware.validateGetShowRequest,
        ShowController.getShows
    )
    app.delete("/mba/api/v1/shows/:showId",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        ShowController.deleteShow
    )
    app.patch("/mba/api/v1/shows/:showId",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        ShowMiddleware.validateShowUpdateRequest,
        ShowController.updateShow
    )
};

module.exports = routes;
