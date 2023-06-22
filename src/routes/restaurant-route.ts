import express from "express"
import { getCategories, createRestaurant, getAllRestaurants } from '../controllers/restaurant/restaurant-controller'

const router = express.Router()

router.get('/categories', getCategories)
router.get('/list', getAllRestaurants)
router.post('/new', createRestaurant)


export default router