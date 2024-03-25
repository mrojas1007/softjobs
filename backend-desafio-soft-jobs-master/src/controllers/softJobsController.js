const DB = require("../models/softJobsModel.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        const encryptedPassword = bcrypt.hashSync(password)
        await DB.registerUser(email, encryptedPassword, rol, lenguage);
        res.send("El usuario ha sido registrado");
    } catch (error) {
        res.status(500).json({ msg: "Ha ocurrido un error registrando al usuario", error });
    }
}

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await DB.getUser(email);

        if (!usuario) throw { code: 401, message: "Usuario no existe" }

        const encryptedPassword = usuario.password;
        const passwordEsCorrecta = await bcrypt.compare(password, encryptedPassword);

        if (!passwordEsCorrecta) {
            throw { code: 401, message: "Contraseña incorrecta" }
        }

        const token = jwt.sign({ email }, process.env.SECRETKEY);

        res.send({ token });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
}

const validateUser = async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.SECRETKEY)
        const { email } = jwt.decode(token);
        const user = await DB.getUser(email);
        delete user.password;
        
        res.status(200).json([user]);
    } catch (error) {
        res.status(401).json({ msg: "Usuario no autorizado", error });
    }
}

module.exports = { registerUser, getUser, validateUser }