const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express();
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/note', require('./routes/note.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/chat', require('./routes/chat.routes'))
const PORT = config.get("port") || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log("Server Error \n Message: \n", e.message)
        process.exit(1)
    }
}

start()