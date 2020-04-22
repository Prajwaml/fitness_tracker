const express = require('express');
const exercises = require('../models/Exercise');

const router = express.Router();

router
    .post('/getExercise', (req, res) => {
        try {
            const ex = exercises.getUserExercises(req.body.currentEmail);
            res.send( ex );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

    .post('/newExercise', (req, res) => {
        try {
            const addExercise = exercises.AddExercise(req.body.exerciseList);            
            res.send( addExercise );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })


module.exports = router;    