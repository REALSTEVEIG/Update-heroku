const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, `Please provide a title`]
    },
    author : {
        type : String,
        required : [true, 'Please provide an author!']
    }
})

module.exports = mongoose.model('Book', booksSchema)


