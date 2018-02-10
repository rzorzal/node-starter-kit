module.exports = {
    name: "CPF Válido",
    message: "CPF inválido!",
    handler: async function() {
        function validaCPF(cpf) {
            cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
            var numeros, digitos, soma, i, resultado, digitos_iguais;
            digitos_iguais = 1;
            if (cpf.length < 11)
                return false;
            for (i = 0; i < cpf.length - 1; i++)
                if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                    digitos_iguais = 0;
                    break;
                }
            if (!digitos_iguais) {
                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;
                for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;
                numeros = cpf.substring(0, 10);
                soma = 0;
                for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;
                return true;
            } else
                return false;
        }
        if (arguments.length != 2) {
            throw new Error("O validor de CPF precisa do Objeto de Cliente");
        }

        var cliente = arguments[0];

        if (cliente && cliente.cpf) {
            var isValid = validaCPF(cliente.cpf);
            if (isValid) {
                return true;
            }
            return false;
        }
        return false;
    },
    collections: {
        server: async function() {
            return true;
        },
        mobile: async function() {
            return true;
        }
    }
}
