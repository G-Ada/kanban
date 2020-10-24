const { async } = require('hasha');
const mongoose = require('mongoose');

const taskModel = mongoose.model('Tareas', {
    titulo: String,
    prioridad: String,
    descripcion: String,
    responsable: String,
    userID: String
})

module.exports = {
    addTask: async (task, id) => {
        try {
            task.userID = id
            let newTask = new taskModel(task)
            let saveTask = newTask.save()
            return saveTask
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    getUserTasks: async (userId) => {
        try {
            let tasks = await taskModel.find({ userID: userId })
            return tasks
        } catch (error) {
            console.log(error)
        }
    },
    deleteTaskById: async(id) => {
        try {
            await taskModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteAllUsersTasks: async(id) => {
        try {
            await taskModel.deleteMany({userID: id})
        } catch (error) {
            throw new Error (error)
        }
    },
    findById: async(id) => {
        try {
            let task = await taskModel.findById(id)
            return task
        } catch (error) {
            throw new Error (error)
        }
    }
}
