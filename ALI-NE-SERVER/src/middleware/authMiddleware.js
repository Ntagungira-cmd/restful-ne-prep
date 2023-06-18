const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const key = process.env.JWT_KEY;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    //console.log(user);
    // Attach the authenticated user to the request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
