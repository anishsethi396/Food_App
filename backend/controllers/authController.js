const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userModel = require('../models/userModel')

const JWT_KEY = 'thisshouldbeasecret'

module.exports.signup = async (req, res) => {
    const data = req.body
    const user = await userModel.create(data)

    if (user) {
        return res.json({
            message: 'User Registered',
            data: user
        })
    } else {
        return res.json({
            message: 'Error while signing up'
        })
    }
}

module.exports.login = async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
      return res.json({ message: 'Empty field found' });
    }

    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    // bcrypt -> compare hashed passwords
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      const uid = user._id;
      const token = jwt.sign({ payload: uid }, JWT_KEY);

      // Set the JWT as an HttpOnly and Secure cookie
      res.cookie('login', token, { httpOnly: true, secure: req.secure, sameSite: 'Strict' });

      return res.json({
        message: 'User has logged in',
        data: user,
      });
    } else {
      return res.json({ message: 'Wrong credentials' });
    }
}


module.exports.isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from the request headers or cookies
    const token = req.cookies.login;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_KEY);

    // Fetch the user from the database based on the decoded token
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the user information to the request for later use
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};


// Assuming you have a userModel with a 'role' field

module.exports.isAdmin = async (req, res, next) => {
    try {
      // Check if the user making the request has the 'admin' role
      if (req.role === 'admin') {
        // If 'admin', allow access to the next middleware or route handler
        next();
      } else {
        // If not 'admin', respond with a forbidden status (403)
        return res.status(403).json({
          message: 'Access denied. Requires admin privileges.',
        });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      return res.status(500).json({
        message: err.message,
      });
    }
  };
  

module.exports.logout = async (req, res) => {
    res.cookie('login', '', {maxAge:1})
    return res.json({
        message: 'Logout successfully'})
}