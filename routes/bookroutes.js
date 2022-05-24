const express = require('express')
const router = express.Router()

const controller = require('../controller/controller')

router.route('/').get(controller.getAllBooks).post(controller.enterBook)
router.route('/:id').get(controller.getSingleBook).patch(controller.updateBook).delete(controller.deleteBook)

module.exports = router