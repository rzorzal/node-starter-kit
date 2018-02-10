var Ramda = require('ramda');

function map(keyComparator){
    return function(o){
        return String(o[keyComparator]);
    }
}

function databaseAssociations(items, itemDB, keyComparator){

    //Filtrando os que precisam ser deletados do banco
    let deleteItems = itemDB.filter(function(i){
        let idComp = String(i[keyComparator]);
        return items.map(map(keyComparator)).indexOf(idComp) == -1;
    });

    //Removendo os items que serão deletados do banco
    itemDB = itemDB.filter(function(i){
        let idComp = String(i[keyComparator]);
        return deleteItems.map(map(keyComparator)).indexOf(idComp) === -1;
    });

    //Filtrando os items que serão adicionados no banco
    items = items.filter(function(i){
        let idComp = String(i[keyComparator]);
        return itemDB.map(map(keyComparator)).indexOf(idComp) == -1;
    });

    return { insert: items, delete: deleteItems, update: itemDB };
}

module.exports = databaseAssociations;
