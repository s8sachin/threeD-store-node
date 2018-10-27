const mongoose = require('mongoose');
const seedData = require('./models.json');
const Category = require('./models/Category');
const TdObject = require('./models/TdObject');

const modelIds = (models) => (
  TdObject.create(models)
  .then(models => (models.map(m => m._id)))
  .catch(e => console.log(e))
);

const getCategories = async (categories) => {
  const promises = categories.map(async (category) => {
    return {
      name: category.name,
      models: await modelIds(category.models)
    };
  });
  return Promise.all(promises);
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tdObjects', { useNewUrlParser: true })
.then(() => {
  return getCategories(seedData.categories)
  .then(categoriesData => {
    console.log(categoriesData)
    return Category.create(categoriesData)
    .then(() => 'success')
    .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
})
.catch((err) => console.error(err));
