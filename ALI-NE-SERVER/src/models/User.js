//user model
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { registerSchema } = require("swaggiffy");
const userSchema = new mongoose.Schema(
  {

    profilePicture: {
      url: {
        type: String,
        default: "default-profile-picture.png",
      },

      altText: {
        type: String,
        default: "Profile Picture",
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

//method to compare password
userSchema.methods.comparePasswords = async function (password){
  try{
    return await bcrypt.compare(password,this.password);
  }catch(error){
    console.log(error);
  }
}

userSchema.pre("save", async function(next){
  try{
    if(!this.isModified("password")){
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword;
    return next();
  }catch(error){
    console.log(error);
  }
})

registerSchema("User", userSchema, { orm: "mongoose" });

const User = mongoose.model('User', userSchema);

module.exports = User;