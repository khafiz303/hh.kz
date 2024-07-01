require('dotenv').config()
const fs = require('fs')
const path = require('path')
module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'admin',
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        username: 'doadmin',
        password:  process.env.PASSWORD_ENV, 
        database: 'defaultdb',
        host: 'db-postgresql-fra1-08497-do-user-17092848-0.c.db.ondigitalocean.com',
        dialect: 'postgres',
        port : 25060,
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(path.resolve('config', 'ca-certificate.crt')),
            }
        }
    }
};
