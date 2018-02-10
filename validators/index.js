function flatten(o) {
    var prefix = arguments[1] || "", out = arguments[2] || {}, name;
    for (name in o) {
        if (o.hasOwnProperty(name)) {
            typeof o[name] === "object" ? flatten(o[name], prefix + name + '.', out) :
            out[prefix + name] = o[name];
        }
    }
    return out;
}
var validators = {};

validators.validators = require('require-dir-all')('./',{
    recursive: true,
    indexAsParent: true
});

validators.flat = flatten(validators);

validators.toNamespaces = function(){
    var objectValidators = arguments[0] || validators.validators;
    var namespace = arguments[1] || "";
    var composeObject = {};

    for(var key in objectValidators){
        if(objectValidators[key].handle){
            composeObject[ namespace + "." + key] = objectValidators[key];
        } else if(!objectValidators.name && !objectValidators.handle) {
            var namespaceCorrection = namespace?namespace + "." + key:key;
            var returneds = validators.toNamespaces(objectValidators[key], namespaceCorrection);
            for(var i in returneds){
                composeObject[i] = returneds[i];
            }
        } else {
            composeObject[namespace] = objectValidators;
        }
    }
    return composeObject;
}

validators.toJSON = function(){
    var flattenObject = validators.flat;
    for(var i in flattenObject){
        if(typeof flattenObject[i] === "function"){
            flattenObject[i] = flattenObject[i].toString();
        }
    }
    return flattenObject;
}



module.exports = validators;
