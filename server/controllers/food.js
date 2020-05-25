const express = require('express');
const food = require('../models/food');

const router = express.Router();

router
    .get('/getFood', async (req, res) => {
        try {
            const AddedFood = await food.getUserFood(req.userID);
            res.send( AddedFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

    .post('/newFood', async (req, res) => {
        try {
            const addFood = await food.AddFood(req.body.foodList);            
            res.send( addFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

module.exports = router;