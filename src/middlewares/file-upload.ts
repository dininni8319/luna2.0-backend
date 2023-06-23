import multer from "multer";
import { Request, Express } from 'express'
import fs from 'fs'
const { v4 } = require('uuid');

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


//tell us which type of file we are dealing with
const filterMime = (file: any) => {
  if (file.mimetype === "image/png") return "png"
  if (file.mimetype === "image/jpeg") return "jpeg"
  if (file.mimetype === "image/jpg") return "jpg"
}

const fileUpload = multer({
  // limits: 5000000,
  storage: multer.diskStorage({  //storage driver
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
       fs.mkdir('./upload/images',(err)=>{
         callback(null, './upload/images');
       });// we are going to tell to multer the file destination
    },
    filename: (req: Request , file: Express.Multer.File, callback: DestinationCallback): void => {
      const ext =  filterMime(file) //get the extention 
      // cb(null, uuidv4 + "." + ext) //callback, generate the filename with extension
      callback(null, v4() + "." + ext)
    }
  }),
  // fileFilter: (req: Request , file: Express.Multer.File, callback: DestinationCallback): void=> {
  //   // here we are checking is if the mime type exists
  //   //and turning the mime into a boolean
    
  //  const isValid = Boolean(filterMime(file)); 
  //  let error = isValid ? null : new Error("invalid mime type!");
  //  callback(error, isValid);
  // }
});

export default fileUpload