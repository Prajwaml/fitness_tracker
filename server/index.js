const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

const userController = require('./controllers/user');
const driController = require('./controllers/dri');
const exController = require('./controllers/exercise');
const foodController = require('./controllers/food');
const updateController = require('./controllers/update');
const friendController = require('./controllers/friend');

const app = express();
const port = process.env.PORT || 3000;

// Direct MongoDB connection string
const DATABASEURL = " mongodb://127.0.0.1:27017/fitness_tracker"; // Local MongoDB URL

console.log("DATABASEURL:", DATABASEURL);

// Connect to MongoDB
mongoose.connect(DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Healthy Habits Database Connected!");

        // Start server only if DB is connected
        app.listen(port, () => {
            console.log(`Server has started at ${port}`);
        });
    })
    .catch(error => {
        console.log("Database connection error:", error);
        process.exit(1); // Exit if DB connection fails
    });

// CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// Authentication middleware
app.use(function(req, res, next) {
  const arr = (req.headers.authorization || "").split(" ");
  if(arr.length > 1 && arr[1] != null){
      req.userID = arr[1];
  }
  next();
});

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, '../dist')))
    .use('/user', userController)  
    .use('/dri', driController)
    .use('/exercise', exController)
    .use('/food', foodController)
    .use('/update', updateController)
    .use('/friend', friendController)
    .get('*', function (req, res) {
      res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
    })
    .use((err, req, res, next) => {
      console.error(err);
      const errorCode = err.code || 500;
      res.status(errorCode).send({message: err.message});
    });