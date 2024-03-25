const { pool } = require("../../db/connectionDB.js");
const format = require('pg-format');

const registerUser = async (email, password, rol, lenguage) => {
    const formattedQuery = format(
        "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L)",
        email,
        password,
        rol,
        lenguage
    );
    console.log("query: ", formattedQuery);
    await pool.query(formattedQuery);
}

const getUser = async (email) => {
    let formattedQuery = format(
        "SELECT * FROM usuarios WHERE email = %L",
        email
    );
    console.log("query: ", formattedQuery);
    const response = await pool.query(formattedQuery);
    return response.rows[0];
}

module.exports = { registerUser, getUser }