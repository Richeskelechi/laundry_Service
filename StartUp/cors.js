const cors = require("cors");

module.exports = function (app) {
    const corsOptions = {
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200,
    }
  app.use(cors(corsOptions));
};
