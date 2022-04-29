import { Schema, model, Document } from 'mongoose'

export interface UserI extends Document {
  username: String;
  email: String;
  password: String;
}

const userSchema = new Schema({
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
    // firstName: String,
    // lastName: String,
    // description: String,
    profile_picture: String,
    publications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Publication",
      },
      { timestamps: true, versionKey: false },
    ],
  },   { timestamps: true, versionKey: false });

  export default model<UserI>('User', userSchema)