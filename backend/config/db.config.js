module.exports = {
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: 'mariadb',
  database: process.env.DATABASE,
};