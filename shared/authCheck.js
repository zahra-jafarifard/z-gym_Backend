const jwt = require("jsonwebtoken");
const httpError = require("./httpError");

module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  try {
    let decodedToken;
    let token = req.header("Authorization").split(" ")[1];
    console.log('ttttt' , token);
    if (!token) {
      throw new httpError("Authentication failed...", 401);
    }
    try {
      decodedToken = jwt.verify(token, "mySecretKey");
    } catch (err) {
      throw new httpError(err, 500);
    }

    if (!decodedToken) {
      throw new httpError("not authenticated", 401);
    }

    req.userId = decodedToken.userId;
    req.userMobile = decodedToken.mobile;

    next();
  } catch (err) {
    return next(new httpError(err, 401));
  }
};
