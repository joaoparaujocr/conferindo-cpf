const inputCPF = document.getElementById('cpf');
const btnVerificar = document.getElementById('btn-verificar');
const form = document.getElementById('form');
const paragrafo = document.getElementById('paragrafo');

btnVerificar.addEventListener('click', e => {
    e.preventDefault();
    const valueCPF = inputCPF.value;
    const cpfUsuario = new ValidarCPF(valueCPF);
    console.log(cpfUsuario.valida());
    criarParagrafo(cpfUsuario.valida());
})

function ValidarCPF(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpf.replace(/\D+/g, '');
        }
    });
}

ValidarCPF.prototype.valida = function() {
    if (this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.verificarDigito(cpfParcial);
    const digito2 = this.verificarDigito(cpfParcial + digito1);
    const novoCPF = cpfParcial + digito1 + digito2;
    return novoCPF === this.cpfLimpo;
}

ValidarCPF.prototype.verificarDigito = function(cpfParcial) {
    const arrayCPF = Array.from(cpfParcial);
    let contadorRegressivo = arrayCPF.length + 1;
    const total = arrayCPF.reduce((ac, val) => {
        ac += (Number(val) * contadorRegressivo)
        contadorRegressivo --;
        return ac;
    }, 0)
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}

ValidarCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

function criarParagrafo(condicao) {
    paragrafo.classList.remove('valido', 'invalido')
    if (condicao) {
        paragrafo.classList.add('valido');
        paragrafo.textContent = 'CPF Válido';
    } else {
        paragrafo.classList.add('invalido');
        paragrafo.textContent = 'CPF Inválido';
    }
}