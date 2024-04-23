function errorHandling() {
    return (err, req, res, next) => {
        console.error(err.stack);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        const code = err.code || 'INTERNAL_ERROR';
        const details = err.details || {};

        res.status(statusCode).json({
            error: {
                message,
                code,
                details,
            },
        });
    };
}

export default errorHandling;