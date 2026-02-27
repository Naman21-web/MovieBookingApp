
const errorResponseBody = {
    err: {},
    data: {},
    message: "Something wen wrong, Can not process the request",
    success: false
}

const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully processed the request",
    success: true
}
 module.exports = {
     errorResponseBody,
     successResponseBody
 }