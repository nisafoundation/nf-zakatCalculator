const { capitalizeName } = require("../common");

module.exports = function (error, req, res, next) {
  try {
    console.log(`Error Message: ${error.message}`);
    console.log(`Error Name: ${error.name}`);

    switch (error.name) {
      case "BadRequest": {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
      case "MongoServerError": {
        if (error.message.includes("duplicate")) {
          return res.status(409).json({
            error: `duplicate key ${Object.keys(error.keyValue)[0]}`,
            message: `${capitalizeName(
              Object.keys(error.keyValue)[0]
            )} already in use`,
          });
        } else {
          return res.status(400).json({
            error: `${error.name}`,
            message: `${error.message}`,
          });
        }
      }
      case "validation_error": {
        return res.status(400).json({
          error: "validation_error",
          message: error.message,
        });
      }

      case "Error": {
        return res.status(400).json({
          error: error.name.toLowerCase(),
          message: error.message.toLowerCase(),
        });
      }
      default: {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
