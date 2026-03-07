const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const routes = (app) => {
    app.post('/mba/api/v1/auth/signup',
        authMiddleware.validateAuthRequest,authController.signup);
    app.post('/mba/api/v1/auth/signin',authMiddleware.validateLoginRequest,authController.signin); 
    app.patch('/mba/api/v1/auth/reset',authMiddleware.validateResetPasswordRequest,authController.resetPassword);        
}

module.exports = routes;