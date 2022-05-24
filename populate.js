require('dotenv').config()

const booksData = require('./data/book.json')

const connectDB = require('./db/connect')

const Book = require('./model/library')

const start = async () => {
try {
    await connectDB(process.env.MONGO_URI)
    await Book.deleteMany()
    await Book.create(booksData)
    console.log('Success')
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

start()