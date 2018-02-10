module.exports = function EstadosCivisComponent(){
    var estadoCivil =  [
        {
            id:"solteiro",
            estadoCivil:"Solteiro(a)"
        },
        {
            id:"casado",
            estadoCivil:"Casado(a)"
        },
        {
            id:"divorciado",
            estadoCivil:"Divorciado(a)"
        },
        {
            id:"viuvo",
            estadoCivil:"Viúvo(a)"
        },
        {
            id:"separado",
            estadoCivil:"Separado(a)"
        },
    ];

    this.get = function GetMethodEstadosCivisComponents(filters){
        var promise = new Promise(function(accept, reject){
            accept(estadoCivil);
        });
        return promise;
    }
}
