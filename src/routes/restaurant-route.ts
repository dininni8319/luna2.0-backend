import express from "express"
import { getCategories } from '../controllers/restaurant/restaurant-controller'

const router = express.Router()

router.get('/categories', getCategories)

export default router