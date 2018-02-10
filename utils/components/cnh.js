module.exports = function CNHComponent(){
    var CNH =  [
        {
            id:"A",
            tipo:"A"
        },
        {
            id:"B",
            tipo:"B"
        },
        {
            id:"AB",
            tipo:"AB"
        },
        {
            id:"C",
            tipo:"C"
        },
        {
            id:"D",
            tipo:"D"
        },
        {
            id:"E",
            tipo:"E"
        },
    ];

    this.get = function GetMethodCNHComponents(filters){
        var promise = new Promise(function(accept, reject){
            accept(CNH);
        });
        return promise;
    }
}
