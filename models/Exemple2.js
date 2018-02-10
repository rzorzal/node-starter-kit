"use strict";

module.exports = function ModelFactory(sequelize, DataTypes) {
    var Exemple2 = sequelize.define("Exemple2", {
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
    });

    Exemple2.associate = function(models) {
        Exemple2.hasMany(models.Exemple);
    }

    return Exemple2;
};
