const ShowController = require("../controllers/show.controller");
const ShowMiddleware = require("../middlewares/show.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post("/mba/api/v1/shows",
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrClient,
        ShowMiddleware.validateCreateShowRequest,
        ShowController.createShow
    )
    app.get("/mba/api/v1/shows",
        ShowMiddleware.validateGetShowRequest,
        ShowController.getShows
    )
};

module.exports = routes;
