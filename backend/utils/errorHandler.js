const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
        return sendDevError(err, res);
    } else {
        return sendProdError(err, res);
    }
}

function sendDevError(err, res) {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;
    res.status(statusCode).json({
        status,
        message
    })
}

function sendProdError(err, res) {
    if (!err.isOperational) {
        return res.status(500).json({
            status: 'err',
            message: 'Opps! Something went wrong'
        })
    }
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;
    res.status(statusCode).json({
        status,
        message
    })
}