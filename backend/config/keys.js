module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY,
    mongoURI: process.env.MONGO_URI,
    aiApiKey: process.env.AI_API_KEY,
    isProduction: process.env.NODE_ENV === 'production'
  }