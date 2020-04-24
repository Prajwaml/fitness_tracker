const express = require('express');
const path = require('path');

const userController = require('./controllers/user');
const driController = require('./controllers/dri');
const exController = require('./controllers/exercise');
const foodController = require('./controllers/food');
const updateController = require('./controllers/update');
const friendController = require('./controllers/friend');

const app = express();
const port = 3000;

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //update to accept only from domain expected request is coming from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//authentication
app.use(function(req, res, next) {
  const arr = (req.headers.authorization || "").split(" ");
  if(arr.length > 1 && arr[1] != null){
      req.userID = +arr[1];
  }
  next();
});

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static( __dirname + '/../client/dist'))
    .get('/', (req, res) => res.send('Welcome to Healthy Habits'))
    .use('/user', userController)  
    .use('/dri', driController)
    .use('/exercise', exController)
    .use('/food', foodController)
    .use('/update', updateController)
    .use('/friend', friendController)
    
    // .use((req, res) => {
    //   const homepath = path.join(__dirname, '/../client/dist/index.html');
    //   res.sendFile(homepath);
    // })

    .use((err, req, res, next) => {
      console.error(err);
      const errorCode = err.code || 500;
      res.status(errorCode).send({message: err.message});
    })
   
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

