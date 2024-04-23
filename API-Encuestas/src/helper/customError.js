class CustomError extends Error {
    constructor(statusCode, message, code = 'INTERNAL_ERROR', details = {}) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export default CustomError;