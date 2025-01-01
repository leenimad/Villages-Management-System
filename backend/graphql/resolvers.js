const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    signup: async ({ userInput }) => {
      try {
        console.log("Signup Request:", userInput);
  
        // Check if the user already exists
        const existingUser = await User.findOne({ username: userInput.username });
        if (existingUser) {
          console.error("User already exists");
          throw new Error("User already exists.");
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
  
        // Create and save the new user
        const user = new User({
          username: userInput.username,
          password: hashedPassword,
          role: userInput.role || "user",
        });
  
        const savedUser = await user.save();
        console.log("User saved:", savedUser);
  
        // Return the saved user with mapped ID
        return {
          id: savedUser._id.toString(),
          username: savedUser.username,
          role: savedUser.role,
        };
      } catch (error) {
        console.error("Signup Error:", error);
        throw new Error(error.message || "Internal Server Error");
      }
    },
    


    login: async ({ username, password }) => {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) throw new Error('User does not exist.');

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password.');

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the authentication data
        return { userId: user.id, token, role: user.role };
    },
};
