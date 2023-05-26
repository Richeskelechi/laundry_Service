const logger = require('../StartUp/logger');

const { CrashLog } = require("../Models/CrashLogs");


module.exports = async function (err, req, res, next) {
  logger.error(err.message);

  let reqData = {
    method: req.method,
    url: req.baseUrl + req.url,
    body: req.body
  }

  let crashLog = new CrashLog({
    req: reqData,
    err: err
  })
  await crashLog.save()

  return res
    .status(500)
    .send({ ok: false, statusCode: 500, message: "Failure", data: "Something failed. Please try again after 5 minutes" });
};
