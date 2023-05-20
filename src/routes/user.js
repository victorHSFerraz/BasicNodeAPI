const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    res.send('Hello World!');
});

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;