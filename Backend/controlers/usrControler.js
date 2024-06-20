import User from "../modules/user.js";
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";

// Register a new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path); // Delete the uploaded file if validation fails
    }
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, userName, mobileNo, designation, gender, courses } = req.body;
    const image = req.file ? req.file.filename : null;
    const newUser = new User({
      name,
      userName,
      mobileNo,
      designation,
      gender,
      courses,
      image,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
};

// Update an existing user by ID
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, userName, mobileNo, designation, gender, courses } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        userName,
        mobileNo,
        designation,
        gender,
        courses,
        image,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an existing user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search for users by criteria
export const searchUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id, name, designation, course } = req.query;
    let filter = {};

    if (id) filter._id = id;
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
    if (designation) filter.designation = designation;
    if (course) filter.courses = course;

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
