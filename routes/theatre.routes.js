const TheatreController = require('../controllers/theatre.controller');
const TheatreMiddleware = require('../middlewares/theatre.middleware');
const AuthMiddleware = require("../middlewares/auth.middleware");

const routes = (app) => {
    app.post('/mba/api/v1/theatres', 
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrClient,
        TheatreMiddleware.validateTheatreCreateRequest,TheatreController.createTheatre);
    app.delete('/mba/api/v1/theatres/:theatreId',
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        TheatreController.deleteTheatre);
    app.get('/mba/api/v1/theatres/:theatreId',TheatreController.getTheatre);
    app.put('/mba/api/v1/theatres/:theatreId', 
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner,
        TheatreController.updateTheatre);  
    app.patch('/mba/api/v1/theatres/:theatreId', 
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner, 
        TheatreController.updateTheatre);
    app.get('/mba/api/v1/theatres', TheatreController.getTheatres);
    app.patch('/mba/api/v1/theatres/:theatreId/movies', 
        AuthMiddleware.isAuthenticated,
        AuthMiddleware.isAdminOrOwner, 
        TheatreMiddleware.validateUpdateMovies,
        TheatreController.updateMoviesTheatre);
    app.get('/mba/api/v1/theatres/:theatreId/movies',TheatreController.getMoviesTheatre);
    app.get('/mba/api/v1/theatres/:theatreId/movie/:movieId',TheatreController.checkMovieTheatre);
}

module.exports = routes;