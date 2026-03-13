const PaymentController = require("../controllers/payment.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const PaymentMiddleware = require("../middlewares/payment.middleware");

const routes = (app) =>{
    app.post("/mba/api/v1/payments",
        AuthMiddleware.isAuthenticated,
        PaymentMiddleware.validateCreatePaymentRequest,
        PaymentController.createPayment
    );
    app.get("/mba/api/v1/payments/:paymentId",
        AuthMiddleware.isAuthenticated,
        PaymentController.getPaymentDetailsById
    );
};

module.exports = routes;