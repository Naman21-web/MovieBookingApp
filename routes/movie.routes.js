const MovieController = require('../controllers/movie.controller');

const routes = (app) => {
    app.post('/mba/api/v1/movies', MovieController.createMovie);
    app.delete('/mba/api/v1/movies/:movieId', MovieController.deleteMovie);
    app.get('/mba/api/v1/movies/:movieId', MovieController.getMovie);
}

module.exports = routes;