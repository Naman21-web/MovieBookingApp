const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateMovieCreateRequest = async (req,res,next) => {

    //validate the request body
    if(!req.body || Object.keys(req.body).length === 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie name
    if(!req.body.name){
        badRequestResponse.err = "The name of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie description
    if(!req.body.description){
        badRequestResponse.err = "The description of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie casts
    if(!req.body.casts || !Array.isArray(req.body.casts) || req.body.casts.length === 0){
        badRequestResponse.err = "The casts of movie is not present in the request sent or is not a valid array";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie trailerUrl
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The trailerUrl of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie language
    if(!req.body.language){
        badRequestResponse.err = "The language of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie releaseDate
    if(!req.body.releaseDate){
        badRequestResponse.err = "The releaseDate of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie director    
    if(!req.body.director){
        badRequestResponse.err = "The director of movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
}


module.exports = {
    validateMovieCreateRequest
}