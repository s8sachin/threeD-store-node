var express = require('express');
var router = express.Router();
const Category = require('../models/Category');
const TdObject = require('../models/TdObject');

// get categories and models
router.get('/', (req, res, next) => {
  Category.find()
  .sort({ name: 1 })
  .populate('models')
  .skip(parseInt(req.query.skip) || 0)
  .limit(parseInt(req.query.limit) || 3)
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

// get model file and parse
router.get('/parseModel/:id', (req, res, next) => {
  TdObject.findOne({_id: req.params.id})
  .then((model) => {
    res
    .status(200)
    .json({ model });
  })
  .catch(e => {
    console.log(e)
    res
    .status(404)
    .json({error: 'Something went wrong'});
  });
});

module.exports = router;
