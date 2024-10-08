const { CustomError } = require('./CustomError');

function errorMiddleware(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }


    console.error("Unexpected error: ", err);
    return res.status(500).json({
        success: false,
        message: "An unexpected error occurred"
    });
}

module.exports = errorMiddleware;
