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
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
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
  }, 
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    }
  ] 
}, { timestamps: true });

module.exports = mongoose.model<IUser>("User", UserSchema);

