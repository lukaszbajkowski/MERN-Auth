import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(400, "Invalid credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...userData } = user._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("token", token, { httpOnly: true, expiryDate: expiryDate })
      .status(200)
      .json(userData);
  } catch (error) {
    next(error);
  }
};
