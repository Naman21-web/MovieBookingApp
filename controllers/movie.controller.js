const Movie = require('../models/movie.model');

/*
    @desc: Create a new movie
    @route: POST /api/v1/movies
    @access: Public
    @params: name, description, casts, trailerUrl, language, releaseDate, director
    @returns: 201 - Created, 400 - Bad Request, 500 - Internal Server Error

    request body example:
    {
    "name": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "casts": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    "trailerUrl": "https://www.youtube.com/watch?v=YoHD9XEInc0",
    "language": "English",
    "releaseDate": "2010-07-16",
    "director": "Christopher Nolan"
    }
*/
const createMovie = async (req, res) => {
    try{
        console.log(req.body);
        const {name, description, casts, trailerUrl, language, releaseDate, director} = req.body;

        if(!name || !description || !casts || !trailerUrl || !language || !releaseDate || !director){
            return res.status(400).json({message: "All fields are required"});
        }
        const movie = new Movie({
            name, description, casts, trailerUrl, language, releaseDate, director
        });
        await movie.save();
        res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: "Movie created successfully",
        });
    }
    catch(error){
        res.status(500).json({
            success: true,
            error: error.message,
            data: null,
            message: "Failed to create movie"
        });
    }
}

module.exports = {
    createMovie
};