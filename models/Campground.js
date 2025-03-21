const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  address: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  picture: {
    type: String,  // this will hold the image URL or path
    required: false, // set to true if image is mandatory
    trim: true
  }
}, {
  toJSON : {virtuals:true},
  toObject : {virtuals:true}
});

CampgroundSchema.virtual('reserves',{
  ref:'Reserve',
  localField:'_id',
  foreignField:'campground',
  justOne:false
})

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;