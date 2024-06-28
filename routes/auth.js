const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        res.status(200).send('User logged in successfully');
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

module.exports = router;
