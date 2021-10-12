const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signupUser = async (req, res) => {
    const UserModel = require("./models/User");
    const { username, email, password } = req.body;

  try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ success: false, error: err });
        } else {
          console.log(hash);
          const userCreds = new UserModel({
            name:username,
            email: email,
            password: hash
          });
          
          const user = await userCreds.save();
          res.status(201).json({
            success: true,
            message: "Acount Created Successfully"
          });
        }
      });

  } catch (error) {
    res.json({ success: false, message: "some error occured: " + error });
  }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const UserModel = require("./models/User");
      const foundUser = await UserModel.findOne({ email: email });
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication Failed"
          });
        }

        if (result) {
          const token = jwt.sign(
            { userId: foundUser._id },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
  
          const user = {
            token,
            name: foundUser.name
          };
  
          return res
            .status(200)
            .json({ success: true, message: "Auth Successful", user });
        }
  
        res
          .status(401)
          .json({ success: false, message: "Password is Incorrect !" });
      });
    } catch (error) {
      res.status(401).json({ success: false, message: "Authentication Failed" });
    }
  };