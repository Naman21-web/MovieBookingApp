const PaymentController = require("../controllers/payment.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const PaymentMiddleware = require("../middlewares/payment.middleware");

const routes = (app) =>{
    app.post("/mba/api/v1/payments",
        AuthMiddleware.isAuthenticated,
        PaymentMiddleware.validateCreatePaymentRequest,
        PaymentController.createPayment
    )
};

module.exports = routes;