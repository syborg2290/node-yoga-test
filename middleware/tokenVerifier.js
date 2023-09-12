const jwt = require("jsonwebtoken");

// Middleware for verifying Bearer token in authorization header
verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(res.status(404).json("Unauthorized: Bearer token missing."));
  }

  try {
    // Verify the JWT token using the retrieved client secret
    jwt.verify(
      token,
      "fdsjfh3865474jfdshjfhskdhf3484riseafd#^$%Yrefjgsef",
      (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return next(
              res.status(400).json("Bad Request: Token has expired.")
            );
          }
          return next(res.status(403).json("Forbidden: Invalid token."));
        }

        // Token is valid, continue with the request
        next();
      }
    );
  } catch (error) {
    console.error(error);
    return next(res.status(500).json("Internal Server Error"));
  }
};

module.exports = verifyToken;
