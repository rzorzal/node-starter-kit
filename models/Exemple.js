"use strict";

module.exports = function ModelFactory(sequelize, DataTypes) {
    var Exemple = sequelize.define("Exemple", {
        test: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
    });

    Exemple.associate = function(models) {
        Exemple.belongsTo(models.Exemple2);
    }

    return Exemple;
};
