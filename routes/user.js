const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/profile', (req, res, next) => {
  User.findOne({_id: req.user._id})
  .then(user => {
    res
    .status(200)
    .json({
      message : 'userProfile',
      user : { _id: user._id, email: user.email, name: user.name, createdAt: user.createdAt },
    });
  })
  .catch(e => {
    next(e);
  });
});

module.exports = router;
