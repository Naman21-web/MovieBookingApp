const TheatreController = require('../controllers/theatre.controller');
const TheatreMiddleware = require('../middlewares/theatre.middleware')

const routes = (app) => {
    app.post('/mba/api/v1/theatres', TheatreMiddleware.validateTheatreCreateRequest,TheatreController.createTheatre);
    app.delete('/mba/api/v1/theatres/:theatreId',TheatreController.deleteTheatre);
    app.get('/mba/api/v1/theatres/:theatreId',TheatreController.getTheatre);
}

module.exports = routes;