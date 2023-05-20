const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password: password });

    try {
        await user.save();
        const { password, ...userWithoutPassword } = user.toJSON();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ error: 'Invalid username/password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { register, login };
