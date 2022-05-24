const Book = require('../model/library')

exports.enterBook = async (req, res) => {
    const newBook = await Book.create(req.body)
    res.status(201).json({newBook})
}

exports.getAllBooks = async (req, res) => {
    const allBooks = await Book.find({})
    res.status(200).json({allBooks, count : allBooks.length})
}

exports.getSingleBook = async (req, res) => {
    const {id : bookId} = req.params
    const singleBook = await Book.findOne({_id : bookId})
    if (!singleBook) {
        return res.status(404).json({msg : `No book with id ${bookId}`})
    }
    return res.status(200).json({singleBook})
}

exports.updateBook = async (req, res) => {
    const {id : bookId} = req.params
    const editBook = await Book.findByIdAndUpdate({_id : bookId}, req.body,{
        new : true,
        runValidators: true
    })
    if (!editBook) {
        return res.status(404).json({msg : `No book with id ${bookId}`})
    }
    return res.status(200).json({editBook})
}

exports.deleteBook = async (req, res) => {
    const {id : bookId} = req.params
    const removeBook = await Book.findByIdAndDelete({_id : bookId})
    if (!removeBook) {
        return res.status(404).json({msg : `No book with id ${bookId}`})
    }
    return res.status(200).json({})
}

