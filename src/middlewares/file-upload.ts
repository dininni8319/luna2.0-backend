import multer from "multer";
import { Request } from 'express'
import path from 'path'
import { v4 } from 'uuid'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileUpload = multer({
  // limits: 5000000,
  storage: multer.diskStorage({  //storage driver
    filename: (req: Request , file: Express.Multer.File, callback: DestinationCallback): void => {
      let ext = path.extname(file.originalname)      
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {

      callback(null, "Unsupported file type!");
      return;
    }
      callback(null, v4() + "." + ext)
    }
  })
});

export default fileUpload