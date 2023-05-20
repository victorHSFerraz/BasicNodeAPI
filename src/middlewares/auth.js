const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    let token = req.header('Authorization');
    try {
        const data = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.userId = data._id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

module.exports = auth;
