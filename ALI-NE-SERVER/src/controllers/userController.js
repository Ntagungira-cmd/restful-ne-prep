const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne().or([{ username }, { email }]);

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Username or email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
      return res.status(401).json({ message: "incorrect email or password" });
    }

    const passwordMatch = await userExists.comparePasswords(password);

    if (!passwordMatch) {
      return res.status(500).json({ message: "incorrect email or password" });
    }

    const token = jwt.sign({ userId: userExists._id }, "rca_ne_prep", {
      expiresIn: "3h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "user authentication failed" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const { email } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    }

    user.email = email;
    const modified = await user.save();
    res.status(200).json({ message: "user update successful", data: modified });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json({ message: "profile fetched successfuly", user });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    }
    user.profilePicture.url = req.file.path;
    user.profilePicture.altText = req.file.originalname;
    const modified = await user.save();
    res
      .status(200)
      .json({ message: "profile picture updated successfuly", data: modified });
  } catch (error) {
    res.status(500).json(error);
  }
};
