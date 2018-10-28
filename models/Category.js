var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
require('./TdObject');

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  models: [{
    type: Schema.Types.ObjectId,
    ref: 'TdObject',
  }],
});

CategorySchema.plugin(timestamps);
module.exports = mongoose.model('Category', CategorySchema);