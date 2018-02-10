String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var env = process.env.NODE_ENV || "development";
var models = require(`${process.cwd()}/models`);
var config = require(`${process.cwd()}/config/config.json`)[env];

if(env.toUpperCase() != "development".toUpperCase()){
    config.dummy = process.env[config.dummy_env];
}


module.exports = async function SequelizePostgresSyncDataBase(){
    console.log("============ Syncing DataBase ============");
    await models.sequelize.sync({ alter: false, force: false });
    var diffSQL = await models.sequelize.syncDiff(config.dummy);
    await models.sequelize.query(diffSQL.replaceAll("\"\"","\""),{
        type: models.sequelize.QueryTypes.SELECT
    });
    console.log("============ Synced DataBase ============");
}
