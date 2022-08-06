import { config as dotenv } from 'dotenv'

dotenv()

export const PORT = process.env.PORT || 3000
export const STATIC_PATH = process.env.STATIC_PATH || './static'
export const NODE_ENV = process.env.NODE_ENV || 'development'
