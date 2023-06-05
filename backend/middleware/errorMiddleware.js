const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404); // 404 is not found
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 500 is internal server error
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404; // 404 is not found
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler };