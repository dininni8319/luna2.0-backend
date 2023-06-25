import  mongoose, { Schema, Document } from "mongoose";
import { IRestaurant } from '../controllers/restaurant/restaurant-controller'


const RestaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
   type: String,
   required: true
  },
  street: {
    type: String, 
    maxLength: 500,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
   type: String
  },
  image: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  opening_hours: {
    type: String,
  },
  price_level: {
    type: String,
    // enum: ["$", '$$', "$$$", "$$$$"],
  },
  website: {
    type: String,
  },
  category: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

