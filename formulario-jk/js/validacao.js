

export function valida(input) {   // pega o valor do atributo 'data-tipo' do elemento input, e armazena o tipo de input ( "email", "cpf", "cep").
    
    const tipoDeInput = input.dataset.tipo  // Verifica se existe uma função de validação específica esse input.


    if(validadores[tipoDeInput]) {  // Se existir uma função de validação, chama essa função, passando o próprio input como argumento.
        validadores[tipoDeInput](input)
    }

    // Verifica se o input é válido usando.
    // input.validity retorna um objeto com várias propriedades booleanas(ex: valid, valueMissing, typeMismatch).
    if(input.validity.valid) { 
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    
    } else {   // Se o input for inválido: entao, adiciona a classe {input-container--invalido} ao elemento pai do input.
        input.parentElement.classList.add('input-container--invalido') // Chama uma função chamada 'mostraMensagemDeErro' e  retorna uma mensagem de erro formatada com base no tipo de input email....
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}


const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'Nome nao pode ser vazio'
    },
    email: {
        valueMissing: 'Email nao pode ficar vazio',
        typeMismatch: 'email digitato nao valido'
    },
    senha: {
        valueMissing: 'senha nao pode ser vazio',
        patternMismatch: 'A senha deve conter pelo menos 6 caracteres'
    },
    dataNascimento: {
        valueMissing: 'data nao pode ser vazio',
        customError: 'mensagem de erro se de menor'
    },
    cpf: {
        valueMissing: ' CPF não pode ser vazio.',
        customError: 'cpf digitado nao é valido' 
    },
    cep: {
        valueMissing: 'O CEP não pode ser vazio.',
        patternMismatch: 'CEP digitado invalido',
        customError: 'nao é possivel buscar cep'
    },
    logradouro: {
        valueMissing: ' logradouro não pode ser vazio.'
    },
    cidade: {
        valueMissing: 'cidade não pode ser vazio.'
    },
    estado: {
        valueMissing: 'estado não pode ser vazio.'
    },
    telefone: {
        valueMissing: 'telefone não pode ficar vazio.',
        patternMismatch: 'O número de telefone digitado não é válido.'

    },
    instagram: {
        valueMissing: 'Instagram não pode ser vazio.',
        patternMismatch: 'Instagram digitado não é válido.'
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input),
    telefone:input => validarNumeroDeTelefone(input),
    instagram:input => validarInstagram(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}



