import { Request } from 'express'

export interface IBody {
  name: string
  location: string 
  email: string
}

export interface IData extends Request {
  body: IBody
}

export interface IUser extends Request {
  userData: {
    userId: string
  }
}