const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateTheatreCreateRequest = async (req,res,next) => {
    if(!req.body || Object.keys(req.body).length == 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre name
    if(!req.body.name){
        badRequestResponse.err = "The name of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre city
    if(!req.body.city){
        badRequestResponse.err = "The city of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre pinCode
    if(!req.body.pinCode){
        badRequestResponse.err = "The pinCode of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
}

const validateUpdateMovies = async (req,res,next) => {
    //validate the insert param
    if(req.body.insert == undefined){
        badRequestResponse.err = "The insert params is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movieIds
    if(!req.body.movieIds){
        badRequestResponse.err = "The movieIds is not present in the request sent to update in theatre";
        return res.status(400).json(badRequestResponse);
    }

    //Movie Id is not an array
    if(!Array.isArray(req.body.movieIds)){
        badRequestResponse.err = "Expected array of movies but found something else in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //No movie in the array
    if(req.body.movieIds.length==0){
        badRequestResponse.err = "No movie present in the array of the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovies
}