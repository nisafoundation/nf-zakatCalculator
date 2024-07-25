const { compareSync } = require("bcrypt");
const { checkPermission } = require("../../utils/common");
const {
  getBasicTokenByClientId,
  getUserDetailsById,
} = require("../../services/userService/user.helper");
const authorizer = async (req, res, next) => {
  try {
    const authToken = req.headers.Authorization || req.headers.authorization;
    if (!authToken)
      return res.status(401).json({
        message: "Authentication Token Not Found",
      });
    const token = authToken.split(" ");
    if (token[0].trim() === "Basic") {
      if (req.originalUrl.includes("/api/prices"))
        return await handleAuthRoutes({
          token: token[1].trim(),
          req,
          res,
          next,
        });
    }
    return res.status(401).json({
      message: "Unauthorized",
    });
  } catch (error) {
    next(error);
  }
};

const handleAuthRoutes = async ({ token, req, res, next }) => {
  try {
    const decodedToken = Buffer.from(token, "base64").toString();
    const usernamePassword = decodedToken.split(":");
    if (usernamePassword.length !== 2) throw Error("unauthorized");
    const client = { secret: "1234567890" };
    if (!client) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    let passwordIsValid = usernamePassword[1] == client?.secret;
    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Authentication Failed, Invalid Token",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizer };
