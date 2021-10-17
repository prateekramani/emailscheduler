const express = require('express')
require('./db/connection')
const Email = require('./models/schedule')
const port = process.env.port || 4000
const emailRouter = require('./routers/email') 
app = express();

app.use(express.json())
app.use(emailRouter)

app.listen(port, "127.0.0.1", () => {
    console.log(`server startd listening on http://127.0.0.1//${port}`)
})