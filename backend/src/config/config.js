module.exports = {
    db: {
        mongoURI: process.env.MONGODB_URI || `mongodb://localhost:27017/annies`
    },
    jwt: process.env.JWT_SECRET || '2A472D4B61506452',


}