const USER_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED"
};

const USER_ROLE = {
    customer: "CUSTOMER",
    admin: "ADMIN",
    client: "CLIENT" 
};

const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    UNPROCESSABLE: 422
}

const BOOKING_STATUS = {
    cancelled: "CANCELLED",
    successful: "SUCCESSFUL",
    processing: "IN_PROCESS" 
};

const PAYMENT_STATUS = {
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED"
};

module.exports = {
    USER_STATUS,
    USER_ROLE,
    STATUS: STATUS_CODES,
    BOOKING_STATUS,
    PAYMENT_STATUS
}