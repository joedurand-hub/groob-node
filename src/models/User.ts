import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  userName: {
    type: String,
    min: 3,
    maxlength: 16,
    requiered: true,
    lowercase: true,
    unique: true,
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
  birthday: {
    type: Date,
    default: new Date()
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  description: {type: String, default: ""},
  profilePicture: { public_id: String,
    secure_url: String
  },
  verified: { type: Boolean, default: false},
  online: {type: Boolean, default: false},
  premium: { type: Boolean, default: false},
  explicitContent: { type: Boolean, default: false},
  followers: {type: [String], default: [] },
  followings: {type: [String], default: [] },
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