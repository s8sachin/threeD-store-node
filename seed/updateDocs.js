const mongoose = require('mongoose');
const seedData = require('./models.json');
const Category = require('../models/Category');
const TdObject = require('../models/TdObject');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tdObjects', { useNewUrlParser: true })
.then(() => {
  TdObject.find()
  .then(models => {
    models.forEach(model => {
      model.update({
        obj: model.obj.replace('https://s3.ap-south-1.amazonaws.com/scapic-others/Models', 'https://s3.ap-south-1.amazonaws.com/threed-sach'),
        mtl: model.mtl.replace('https://s3.ap-south-1.amazonaws.com/scapic-others/Models', 'https://s3.ap-south-1.amazonaws.com/threed-sach'),
        thumb: model.thumb.replace('https://s3.ap-south-1.amazonaws.com/scapic-others/Models', 'https://s3.ap-south-1.amazonaws.com/threed-sach')
      })
      .then(res => console.log(res))
      .catch(e => console.log(e));
    });
  });
})
.catch((err) => console.error(err));
