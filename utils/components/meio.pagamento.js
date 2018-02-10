module.exports = function MeioPagamentoComponent(){

    var formaPagamento = [
        {
            nome: "Cartão Alimentação"
        },
        {
            nome: "Cartão Crédito"
        },
        {
            nome: "Cartão Débito"
        },
        {
            nome: "Cheque"
        },
        {
            nome: "Dinheiro"
        }
    ];

    this.get = function GetMethodMeioPagamentoComponents(filters){

        var promise = new Promise(function(accept, reject){
            if(filters){
                accept(formaPagamento.filter(function(meio){
                    for(var i in filters){
                        if(meio[i] == formaPagamento[i]){
                            return true;
                        }
                    }
                    return false;
                }));
                return;
            }
            accept(formaPagamento);
        });

        return promise;

    }


}
