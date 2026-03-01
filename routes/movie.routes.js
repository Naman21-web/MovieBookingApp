const MovieController = require('../controllers/movie.controller');
const MovieMiddleware = require('../middlewares/movie.middleware');

const routes = (app) => {
    app.post('/mba/api/v1/movies', MovieMiddleware.validateMovieCreateRequest, MovieController.createMovie);
    app.delete('/mba/api/v1/movies/:movieId', MovieController.deleteMovie);
    app.get('/mba/api/v1/movies/:movieId', MovieController.getMovie);
    app.put('/mba/api/v1/movies/:movieId', MovieController.updateMovie);  
    app.patch('/mba/api/v1/movies/:movieId', MovieController.updateMovie);
    app.get('/mba/api/v1/movies', MovieController.getMovies);
}

module.exports = routes;