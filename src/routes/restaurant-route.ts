import express from "express"
import { getCategories, createRestaurant, getAllRestaurants } from '../controllers/restaurant/restaurant-controller'
import fileUpload from '../middlewares/file-upload'

const router = express.Router()

router.get('/categories', getCategories)
router.get('/list', getAllRestaurants)
router.post('/new', fileUpload.single('image'), createRestaurant)


export default router