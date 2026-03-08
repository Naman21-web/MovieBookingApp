const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

const route = (app) => {
    app.patch("/mba/api/v1/user/:userId",userMiddleware.validateUpdateUserRequest,userController.updateUser);
}

module.exports = route;