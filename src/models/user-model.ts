import  mongoose, { Schema, Document } from "mongoose";

enum Status {
  Pending = "Pending",
  Active = "Active"
}

export interface IUser extends Document {
  first_name: string
  last_name: string
  email: string
  phone: string 
  address: string
  city: string
  pcode: string
  password: string
  image: string
  active: Status
  confirmationCode: string
}

const UserSchema: Schema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
   type: String,
  },
  address: {
    type: String, 
    maxLength: 500,
  },
  city: {
    type: String
  },
  pcode: {
   type: String
  },
  password: {
    type: String, 
    minlength: 8
  },
  image: {
    type: String
  },
  active: {
    type: String,
    enum:[ "Pending", "Active"],
    default: "Pending"
  },
  confirmationCode: {
    type: String,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model<IUser>("User", UserSchema);

