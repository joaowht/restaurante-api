import mysql from "mysql2";
import "dotenv/config";

const conn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

conn.connect((err) => {
    if (err) { //verifica o erro
    console.log("Problema com bd: ", err);
     return;
    } console.log("Conectado ao BD!")
})

export { conn }