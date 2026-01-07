const User = require("../model/UsersModel");
// require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ status: false, message: "No token" });

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) return res.json({ status: false });

      const user = await User.findById(data.id).select("-password");
      if (!user) return res.json({ status: false });

      req.user = user;
      next(); // ✅ continue to next route if verified
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Server error" });
  }
};