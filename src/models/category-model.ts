import mongoose, { Schema, Document } from 'mongoose'

interface ICategory {
  name: string
}

const CategorySchema:Schema = new Schema({
   name: {
     type: String,
     trim: true,
     required: true,
     minlength: [2, "Too short"],
     maxlength: [32, "Too long"]
   },
  //  slug: {
  //    type: String,
  //    unique: true,
  //    lowercase: true,
  //    index: true
  //  }
},{timestamps: true})

module.exports = mongoose.model<ICategory>("Category",CategorySchema)