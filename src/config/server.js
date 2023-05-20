require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const uri = process.env.DB_URI;
const port = process.env.PORT;
const routes = require('../routes/routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        console.log("Connected to mongodb");
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    });