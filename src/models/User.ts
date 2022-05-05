import { Schema, model, Document } from 'mongoose'
import bcrypt from "bcryptjs"

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  publications: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Publication",
    },
    { timestamps: true, versionKey: false },
  ],
  username: {
    type: String,
    min: 3,
    requiered: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    requiered: true,
    lowercase: true
  },
  password: {
    type: String,
    requiered: true,
  },
  first_name: String,
  last_name: String,
  description: String,
  friends: [{
    type: String
  }],
  profile_picture: String,
}, { timestamps: true, versionKey: false });

userSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
} 

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<UserI>('User', userSchema)