const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (data)=> {
        try {
            const resultado = jwt.sign({ data },
                process.env.SECRET_KEY)
            return resultado
        } catch (error) {
            console.log(error.message)
            return error
        }
    }
}