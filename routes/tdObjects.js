var express = require('express');
var router = express.Router();
const Category = require('../models/Category');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Category.find()
  .sort({ name: 1 })
  .populate('models')
  .limit(2)
  .then((categories) => {
    res
    .status(200)
    .json({ categories });
  })
  .catch(e => {
    console.log(e)
    res
    .status(403)
    .json({error: 'Something went wrong'});
  });
});

module.exports = router;
