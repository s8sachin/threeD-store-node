const mongoose = require('mongoose');
const seedData = require('./models.json');
const Category = require('../models/Category');
const TdObject = require('../models/TdObject');
const util = require('util');
const exec =  util.promisify(require('child_process').exec);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tdObjects', { useNewUrlParser: true })
.then(() => {
  Category.find()
  .populate('models')
  .then(async categories => {
    await categories.forEach(async category => {
      await category.models.forEach(async model => {
        let fileArr = [model.obj, model.mtl, model.thumb];
        await fileArr.forEach(async file => {
          var fileName = file.split('/');
          fileName = fileName[fileName.length-1];
          await exec(
            `curl ${file.replace(/ /g, '+').replace('(', '\\(').replace(')', '\\)')} --create-dirs -o seed/temp/${category.name}/${model.name}/${fileName.replace(' ', '+').replace('(', '\\(').replace(')', '\\)')}`,
            (error, stdout, stderr) => {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null) {
                console.log('exec error: ' + error);
              }
            }
          );
        });
      });
    });
  })
  .catch(e => console.log(e));
})
.catch((err) => console.error(err));
