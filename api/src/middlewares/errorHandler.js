const { STATUS_CODES } = require("http");

module.exports=(err, req, res, next)=>{
    const status = err.status ||500;
    const message= err.message || 'Internal Server Error In Error Handler';


    console.error(`[ERROR]${status}: ${message}`,err);

    res.status(status).json({error: message, details:err.stack});
};