import Jwt from "jsonwebtoken";
import User from "../models/Users.js";

// Register user (without password hashing)
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Store the password as is in plain text (NOT RECOMMENDED).
      picturePath,
      friends,
      location,
      occupation,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logging in (without password hashing)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the plain text password directly (not recommended for production)
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
