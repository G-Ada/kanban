const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const userRepo = require('../repository/users.repo')
const taskRepo = require('../repository/tasks.repo')

app.use(cookieParser())

module.exports = {
    authorization: async (req, res, next) => {
        try {
            let id = req.params.id
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let user = await userRepo.findUserById(decoded.data)
            if (user.id == id) {
                next()
            } else {
                throw new Error('No estas autorizado')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send(error.message)
        }
    },
    getId: async(req, res, next) => {
        try {
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let id = decoded.data
            if(id){
                req.id = id
                next()
            }
        } catch (error) {
            console.log(error)
            res.status(401).send("No está registrado")
        }
    },
    allowDeleteTask: async(req, res, next) => {
        try{
            let taskID = req.params.id
            let task = await taskRepo.findById(taskID)
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let user = await userRepo.findUserById(decoded.data)
            if (user.id == task.userID) {
                next()
            } else {
                throw new Error('No estas autorizado')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send(error.message)
        }
    }
}