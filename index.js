const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/users.routes')
const taskRoutes = require('./routes/tasks.routes')
require('dotenv').config()

app.use(express.json())
app.use(cookieParser())

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
    
    mongoose.connect(`mongodb+srv://dbUser:${process.env.DB_PASS}@cluster0.9uncs.mongodb.net/Kanban?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(r=>{
        app.listen(3000, ()=>{
            console.log('Servidor iniciado')
        })
    }).catch(err => {
        console.log('No se pudo iniciar el servidor')
        console.log(err)
    })
}

initServer();