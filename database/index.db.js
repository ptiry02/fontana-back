import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fontana'

const connectDB = async () => {
  try {
    const database = await mongoose.connect(MONGO_URI)
    console.log(`connected to Mongo! Access granted to ${database.connection.name}`)
  } catch (err) {
    console.log('Error connecting to mongo: ', err)
  }
}

export default connectDB
