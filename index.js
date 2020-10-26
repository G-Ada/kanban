const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/users.routes')
const taskRoutes = require('./routes/tasks.routes')
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001
var cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("", userRoutes)
app.use("/tasks", taskRoutes)

app.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
})

async function initServer(){
    
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(r=>{
        app.listen(port, host, ()=>{
            console.log('Servidor iniciado')
        })
    }).catch(err => {
        console.log('No se pudo iniciar el servidor')
        console.log(err)
    })
}

initServer();