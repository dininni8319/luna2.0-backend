import { RequestHandler , Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { customError } from "../../error/http-error"
import cloudinary from '../../utils/cloudinery'
const Category = require('../../models/category-model')
const Restaurant = require('../../models/restaurant-model')
const User = require("../../models/user-model")

export const getCategories: RequestHandler = async (req,res, next) => { 
  let categories
  try {
     categories = await Category.find({}).select(['-createdAt', '-updatedAt'])
   } catch (error) {
     return next(
       customError('No category was found', 404)
     )
  }

  res.status(200).json({ categories })
}

export interface IRestaurant extends Request {
    name: string
    email: string
    city: string
    country: string
    category: string
    zipcode: string
    phone: string
    street: string
    opening_hours: string
    price_level: string
    image: string
    website: string
}

export const createRestaurant = async (req:any, res: Response, next: NextFunction) => {
  let userId = req.userData
  
  const { 
    name, 
    city,
    country,
    street, 
    phone,
    zipcode,
    website,
    category,
    email,
    price_level,
    opening_hours,
  } = req.body
 

  const result = await cloudinary.uploader.upload(req.file.path)

  const newRestaurant = new Restaurant({
      name, 
      city,
      country,
      street, 
      phone,
      zipcode,
      website,
      category,
      email,
      price_level,
      opening_hours,
      image: result?.secure_url,
      cloudinary_id: result?.public_id,
      owner: userId
  })

  let user 
   try {
    user = await User.findById(userId);
  } catch (err) {
    const error = customError('Error with user', 500);
    return next(error);
  }

  if (!user) {
    const error = customError('Could not find user for provided id', 404);
    return next(error);
  }
  try {
     const sess = await mongoose.startSession();
      sess.startTransaction();
      await newRestaurant.save({ session: sess });
      user.restaurants.push(newRestaurant);
      await user.save({ session: sess });
      await sess.commitTransaction();
    // user = await User.findOne({"_id": userId })
    // user.restaurants.push(newRestaurant)
    // newRestaurant.save()
  } catch (err) {
    return next(
      customError('User not found', 404)
    )
  }

  res.status(201).json({message: "The restaurant was created"})
}

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  let restaurants 
  try {
    restaurants = await Restaurant.find({})
     .sort([['createdAt', 'desc']])
     .select(['-createdAt', '-updatedAt'])
     .exec();

  } catch (err) {
    return next(
      customError("Something went wrong", 404)
    )
  }
  res.status(200).json(restaurants)
}

