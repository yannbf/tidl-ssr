import mongoose from 'mongoose'
import nextConnect from 'next-connect'

// Create cached connection variable
let cachedDb = null

async function database(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  }

  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    req.db = cachedDb
    return next()
  }

  const db = mongoose.connection
  db.on('error', error => {
    throw Error('connection error:' + error)
  })

  req.db = db
  cachedDb = db

  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
