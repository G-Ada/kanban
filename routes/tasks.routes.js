const middlewares = require('../middlewares/middlewares');
const taskRepo = require('../repository/tasks.repo');
const routes = require('express').Router();

routes.post('/add', middlewares.getId, async (req, res) => {
    let data = req.body
    let id = req.id
    try {
        let newTask = await taskRepo.addTask(data, id);
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

routes.get('', middlewares.getId, async (req, res) => {
    try {
        let id = req.id
        let tasks = await taskRepo.getUserTasks(id);
        if (tasks.length != 0) {
            res.status(200).json(tasks)
        } else {
            res.status(401).status('No se encontraron tareas de este usuario')
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

routes.delete('/:id', middlewares.allowDeleteTask, async (req, res) => {
    try {
        let id = req.params.id
        await taskRepo.deleteTaskById(id)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routes;