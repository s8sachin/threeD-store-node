var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TdObjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mtl: {
    type: String,
    required: true,
  },
  obj: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
    required: true,
  }
});

TdObjectSchema.plugin(timestamps);
module.exports = mongoose.model('TdObject', TdObjectSchema);