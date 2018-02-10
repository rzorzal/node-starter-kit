module.exports = function EstadosComponent(){

    var formaPagamento = [
        {
            nome: "A vista"
        },
        {
            nome: "Parcelado"
        },
        {
            nome: "Entrada + Parcelado"
        },
    ];

    this.get = function GetMethodFormaPagamentoComponents(filters){

        var promise = new Promise(function(accept, reject){
            accept(formaPagamento);
        });

        return promise;

    }


}
