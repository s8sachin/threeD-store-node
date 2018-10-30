var express = require('express');
var router = express.Router();
const Category = require('../models/Category');

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  Category.findOne({_id: req.params.id})
  .populate('models')
  .then((category) => {
    res
    .status(200)
    .json({ category });
  })
  .catch(e => {
    console.log(e);
    res
    .status(404)
    .json({error: 'Not found'});
  });
});

module.exports = router;
