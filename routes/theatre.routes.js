const theatreController = require('../controllers/theatre.controller');
const TheatreMiddleware = require('../middlewares/theatre.middleware')

const routes = (app) => {
    app.post('/mba/api/v1/theatres', TheatreMiddleware.validateTheatreCreateRequest,theatreController.createTheatre);
}

module.exports = routes;