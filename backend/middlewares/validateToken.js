const jwt = require("jsonwebtoken");
const jwtSecretKey = "tutmealite";

const validateToken = (request, response, next) => {
  const token = request.header("authToken");
  if (!token) {
    response.status(401).send("Use a valid Token");
  }

  try {
    data = jwt.verify(token, jwtSecretKey);
    request.user = data.user;
    next();
  } catch (error) {
    response.status(401).send("Use a valid Token");
  }
};

module.exports = validateToken;
