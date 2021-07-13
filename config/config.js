
const { DB_SERVER, DB_USER, DB_NAME, DB_PWD } = process.env;

module.exports = {
    database: {
        username: DB_USER,
        password: DB_PWD,
        database: DB_NAME, // Chequear nombre de database que coincida
        host: DB_SERVER
    }
};

console.log(process.env);