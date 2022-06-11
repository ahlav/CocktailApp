const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', (req, res) => {
    if (req.body && req.body.username === "admin" && req.body.password === "admin") {
        res.status(200).json({
            token: '123456token'
        })
    } else {
        res.status(401).json()
    }
});

app.listen(8080);
