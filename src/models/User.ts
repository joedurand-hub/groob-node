import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  username: {
    type: String,
    min: 3,
    maxlength: 16,
    requiered: true,
    lowercase: true
  },
  email: {
    type: String,
    requiered: [true, 'Please enter an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    requiered: [true, 'Please enter a password'],
    minlength: 6
  },
  age: {
    type: Number,
    min: 13,
  },
  first_name: String,
  last_name: String,
  description: String,
  profile_picture: String,
  followers: [{
    type: String
  }],
  followed: [{
    type: String
  }],
  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Publication",
    },
    { timestamps: true, versionKey: false },
  ],
}, { timestamps: true, versionKey: false });


userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)