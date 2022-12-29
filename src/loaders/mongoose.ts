import mongoose from 'mongoose'
import env from '~/configs/env'

const isDev = process.env.NODE !== 'production'

export default async () => {
  console.log('MongoDB is connecting...')
  mongoose.set('debug', isDev)
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri)
  console.log('MongoDB is connected!!')
}
