const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const route = (app) => {
    app.patch("/mba/api/v1/user/:userId",
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        userController.updateUser);
}

module.exports = route;