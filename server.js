require('dotenv').config()
require('express-async-errors')
const express = require('express')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressRateLimmitter = require('express-rate-limit')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const errorrHandlerMiddleware = require('./middleware/errorhandler')
const notfoundMiddleware = require('./middleware/notfound')
const authMiddleware = require('./middleware/authentication')


const app = express()
const authRouter = require('./routes/auth')
const bookRouter = require('./routes/bookroutes')
const connectDB = require('./db/connect')

app.use(express.json())
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(expressRateLimmitter({windowMs : 60 * 1000, max : 60}))

app.get('/', (req, res) => {
    res.send(`<h1>Books Directory API</h1><a href='/api-docs'>Documentation</a>`)
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/books', authMiddleware ,bookRouter)
app.use(errorrHandlerMiddleware)
app.use(notfoundMiddleware)

const port = process.env.PORT || 3100

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()
