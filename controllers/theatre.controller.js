const theatreService = require('../service/theatre.service');
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');
/*
    Controller for theatre resource, it receives the request and sends response to the client.
    It calls the service layer to process the request and send the response back to the client.
    same as movie.controller.js
    {
        name: "PVR Cinemas",
        description: "PVR Cinemas is a leading multiplex chain in India, known for its state-of-the-art facilities and exceptional movie-watching experience.",
        city: "Mumbai",
        pinCode: 400001,
        address: "123 Main Street, Mumbai, Maharashtra, India"
    }
*/

const createTheatre = async (req, res) => {
    try{
        const response = await theatreService.createTheatre(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Theatre created successfully";
        res.status(201).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create theatre";
        res.status(500).json(errorResponseBody); 
    }
};

module.exports = {
    createTheatre
}