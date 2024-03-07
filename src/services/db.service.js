const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

// on se connecte à la base de données avec la configuration de sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    port: config.port,
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        connectTimeout: 60000
    }
});

const launchDb = async () => {
    try {
        await sequelize.sync();
        console.log("Connection to the database has been established successfully");
    }
    catch (err) {
        console.error("Unable to connect to the database:", err);
    }
}

const closeDb = async () => { 
    try {
        await sequelize.close();
        console.log("Connection to the database has been closed successfully");
    }
    catch (err) {
        console.error("Unable to close the database:", err);
    }
}

const resetDb = async () => { 
    console.log("rollback db");
}

module.exports= {launchDb, closeDb, resetDb}