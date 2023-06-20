import { RequestHandler } from 'express'

const NotFound: RequestHandler = (req, res) => res.status(404).json("Route does not exists!");

module.exports = NotFound