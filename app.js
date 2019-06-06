const express = require('express');
const app = express();
app.use(express.json());
const { User } = require('./db');

app.use((req, res, next)=> {
  if(!req.headers.authorization){
    return next();
  }
  User.exchangeTokenForUser(req.headers.authorization)
    .then( user => {
      req.user = user;
      next();
    })
    .catch(next);
});

const isLoggedIn = (req, res, next)=> {
  if(!req.user){
    const error = new Error('not logged in');
    error.status = 401;
    return next(error);
  }
  next();
};

app.post('/api/sessions', (req, res, next)=> {
  User.authenticate(req.body)
    .then( token => res.send({ token }))
    .catch(next);
});

app.get('/api/sessions', isLoggedIn, (req, res, next)=> {
  res.send(req.user);
});

app.use((err, req, res, next)=> { 
  if(err.status !== 401){
    console.log(err);
  }
  res.status(err.status || 500).send(err);
});

module.exports = app;
