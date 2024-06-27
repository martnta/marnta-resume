// utils/mongodb.js
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

// Check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable')
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  // Check the cached client and db
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Connect to our MongoDB database
  const client = await MongoClient.connect(MONGODB_URI)
  const db = await client.db(MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}