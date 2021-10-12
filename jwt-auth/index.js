const express = require('express');
const jwt = require('jsonwebtoken');
const {loginUser, signupUser} = require('./auth');
const app = express();

require('dotenv').config();
require("./configs/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.post('/signup', signupUser);
app.post('/login', loginUser);

app.get('/profile', (req, res)=>{
        try {
          const token = req.headers.authorization;
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          req.user = decoded;
          res.send(req.user);
        } catch (err) {
          res.status(401).json({ success: false, message: "Unauthorized Access: " + err });
        }
});

app.listen(port, () => {
  console.log('server started');
});