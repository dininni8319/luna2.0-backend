const mongoose = require('mongoose')
// const Category = require('../models/category-model')

// const Categories = [
//   {name: 'Asian'},
//   {name: 'Italian'},
//   {name: 'Mexican'},
//   {name: 'French'},
//   {name: 'Indian'},
//   {name: 'Fusion'},
//   {name: 'Fast-food'},
//   {name: 'Swiss'},
//   {name: 'American'},
//   {name: 'Peruvian'},
// ]

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

// const seedDB = async () => {
//   await Category.deleteMany({})
//   await Category.insertMany(Categories)
// }


// seedDB().then(() => mongoose.connection.close())

export default connectDB;

