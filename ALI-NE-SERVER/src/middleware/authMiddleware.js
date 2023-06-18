const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token,"rca_ne_prep", (err, user) => {
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
