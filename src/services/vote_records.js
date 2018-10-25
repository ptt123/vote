const Sequelize = require('sequelize');
const SequelizeInstance = require('../../config/db'); // sequelize的实例
const Vote_records = require('../models/vote_records')(SequelizeInstance, Sequelize);