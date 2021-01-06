const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Avatar_Path = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    name: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    avatar: {
        type: String
    },
    friendList: [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
      }
    ]

  },{
      timestamps:true,
  });


  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', Avatar_Path) );
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  // static function for whole class rather than object of that class
  userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
  userSchema.statics.avatarPath = Avatar_Path;

  const User = mongoose.model('User',userSchema);
  module.exports = User;