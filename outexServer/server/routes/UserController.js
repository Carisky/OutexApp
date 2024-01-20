// controllers/userController.js
const express = require("express");
const { format } = require("date-fns");

const User = require('../Models/User')

const UserController = express.Router();

UserController.post('/user/register', async (req, res) => {
    const newUser = req.body;
  
    try {
      // Check if the email already exists
      const isEmailExists = await User.ifExist(newUser.email);
  
      if (isEmailExists) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      // Email does not exist, proceed with inserting the new user
      const insertUser = {
        email: newUser.email,
        password: newUser.password,
        username: newUser.username,
      };
  
      await User.query().insert(insertUser);

      console.log('User inserted successfully');
      res.status(201).json({ message: 'User inserted successfully' });
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

UserController.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored password in the database
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the user has a profileImage
    if (user.profileImage) {
      // Convert profileImage to base64
      const base64Image = Buffer.from(user.profileImage, "binary").toString(
        "base64"
      );

      // Update the user object with the base64-encoded profileImage
      user.profileImage = base64Image;
    }

    // At this point, authentication is successful
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

UserController.post("/user/changedata", async (req, res) => {
  try {
    const { id, username, description, birthdate, profileImage } = req.body;

    // Convert birthdate to MySQL date format
    const formattedBirthdate = birthdate
      ? format(new Date(birthdate), "yyyy-MM-dd")
      : null;



    // Assuming 'id' is the primary key for your 'users' table
    await User.updateUserData(id,username,description,formattedBirthdate,profileImage);

    console.log(`User with ID ${id} updated successfully`);
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = UserController;
