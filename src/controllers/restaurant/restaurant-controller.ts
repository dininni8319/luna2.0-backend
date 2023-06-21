import { RequestHandler } from 'express'
const Category = require('../../models/category-model')
import { customError } from "../../error/http-error";

export const getCategories: RequestHandler = async (req,res, next) => { 
  let categories
  try {
     categories = await Category.find({})
   } catch (error) {
     return next(
       customError('No category was found', 404)
     )
  }

  res.status(200).json({ categories })
}