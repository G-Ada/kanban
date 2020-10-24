const mongoose = require('mongoose');
const hasha = require('hasha');


const modeloUsuario = mongoose.model('Usuarios', {
    nombre: String,
    userName: String,
    clave: String,
})

module.exports = {
    registerUser: async (payload) => {
        let hashPass = await hasha(payload.clave);
        payload.clave = hashPass;
        const usuario = new modeloUsuario(payload)
        let newUser = usuario.save()
        return newUser
    },
    getUsers: async () => {
        try {
            let users = await modeloUsuario.find()
            console.log(users)
            return users
        } catch (error) {
            throw new Error(error)
        }
    },
    findUser: async (username, clave) => {
        try {
            let hashedPass = hasha(clave);
            let user = await modeloUsuario.findOne({userName: username, clave: hashedPass})
            return user
        } catch (error) {
            throw new Error(error)
        }
    },
    findUserByUserName: async (username) => {
        try {
            let user = modeloUsuario.findOne({userName: username})
            return user
        } catch (error) {
            throw new Error(error)
        }
    },
    findUserById: async (id) => {
        try {
            let user = await modeloUsuario.findById(id)
            return user
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteUser: async(id) => {
        try {
            await modeloUsuario.findByIdAndDelete(id)
        } catch (error) {
            throw new Error (error)
        }
    }
}

