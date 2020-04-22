const express = require('express');
const food = require('../models/food');

const router = express.Router();

router
    .post('/getFood', (req, res) => {
        try {
            const AddedFood = food.getUserFood(req.body.currentEmail);
            res.send( AddedFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

    .post('/newFood', (req, res) => {
        try {
            const addFood = food.AddFood(req.body.foodList);            
            res.send( addFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

module.exports = router;