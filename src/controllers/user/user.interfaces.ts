import { Request } from 'express'

export interface IBody {
  first_name: string
  last_name: string 
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