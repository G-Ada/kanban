const UserRepo = require('../repository/users.repo');
const usersService = require('../services/users.service');
const tasksRepo = require('../repository/tasks.repo');
const middlewares = require('../middlewares/middlewares');
const routes = require('express').Router();

routes.post('/registrar', async (req, res) => {
    const user = req.body;
    console.log(user)
    let userName = await UserRepo.findUserByUserName(user.userName)
    try {
        if (userName) {
            res.status(400).json({error: "El usuario ya existe"})
        } else {
            let newUser = await UserRepo.registerUser(user)
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

routes.get('/usuarios', async (req, res) => {
    try {
        let users = await UserRepo.getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

routes.post('/login', async (req, res) => {
    const data = req.body
    let user = null
    try {
        user = await UserRepo.findUser(data.userName, data.clave)
        if (user) {
            let id = user.id
            let token = usersService.generateToken(id)
            res.cookie('galletita', token, {
                httpOnly: true
            })
            res.status(200).send('Ha ingresado con éxito')
        } else {
            res.status(401).send('El ususario no es válido')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

routes.delete('/:id', middlewares.authorization, async(req, res) => {
    try {
        let id = req.params.id
        await tasksRepo.deleteAllUsersTasks(id)
        await UserRepo.deleteUser(id)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



module.exports = routes;