module.exports = function (err, req, res, next) {
    let status = err.statusCode
    let msg = err.message

    res.status(status).json({msg: msg})
}

// Catch template = { statusCode: 404, message: 'ini error message' }