const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signUp', (req, res, next) => {
  // console.log(req.body)
  const userObj = req.body;
  User.create(userObj)
  .then(user => {
    res.status(201).json({message: 'Signup Successful'});
  })
  .catch(e => {
    res.status(401).json({message: 'Email already exists'});
  });
});

router.post('/logIn', (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err){
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( info.status !== 200 ){
          return res
          .status(400)
          .json(info);
        }
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        res
        .status(200)
        .json({ token, user: { email: user.email, name: user.name, _id: user._id, createdAt: user.createdAt }, ...info });
      });
    } catch (error) {
      // res.json({ token, user: { email: user.email, name: user.name } });
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
