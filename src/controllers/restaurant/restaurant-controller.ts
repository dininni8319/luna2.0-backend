import { RequestHandler , Request, Response, NextFunction } from 'express'
const Category = require('../../models/category-model')
const Restaurant = require('../../models/restaurant-model')
import { customError } from "../../error/http-error"

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
  
  console.log(req.body, req.file, 'body of the request');
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
    opening_hours
  } = req.body


  let restaurant 
  
  const newRestaurant = {
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
    image: req.file.path
  }
  try {
    restaurant = await new Restaurant(newRestaurant).save()
  } catch (err) {
    return next(
      customError("Something went wrong", 404)
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

