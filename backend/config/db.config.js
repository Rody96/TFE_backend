module.exports = {
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.PASSWORD,
  dialect: 'mariadb',
  database: process.env.DATABASE,
};