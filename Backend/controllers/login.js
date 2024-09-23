const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// POST /api/auth/login
loginRouter.post('/login', async (req, res) => {
    const { username, password} = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'User not verified' });
        }

        //token Generation

        const userForToken = {
            username: user.username,
            id: user._id
        }
      
        const token = jwt.sign(userForToken, config.JWT_SECRET , { expiresIn: '10h' })

        // Successful login
        res.status(200).json({
            message: 'Login successful',
            user: {
                token,
                username: user.username,
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = loginRouter;
