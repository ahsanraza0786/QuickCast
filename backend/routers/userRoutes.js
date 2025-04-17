// /routes/userRoutes.js
const express = require('express');
const { Model } = require('../models/User');
const router = express.Router();

// POST request to register a user
router.post('/add', (req,res) => {
    console.log(req.body)
    new Model(req.body).save()

    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
        res.send(err).json({message: "Invalid data"});
    });
})

module.exports = router;
