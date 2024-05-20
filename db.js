const Mongoose = require('mongoose');
const Sequelize = require('sequelize');
require('dotenv').config();

const env = process.env;

const mongoConnectionUrl = `mongodb://localhost:27017/webchat`;

Mongoose.connect(mongoConnectionUrl);

const sequelize = new Sequelize(env.PDB_NAME, env.PDB_USERNAME, env.PDB_PASSWORD, {
    host: env.PDB_HOST,
    port : env.PDB_PORT,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

module.exports = {
    Mongoose,
    sequelize
};

