const { STATUS_CODES } = require("http");

module.exports=(err, req, res, next)=>{
    const status = err.status ||500;
    const messsage= err.messsage || 'Internal Server Error';
    console.error(`[ERROR]${status}: ${messsage}`);

    res.status(status.json({error: message}));
};