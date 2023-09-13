let nome = 'Eu';
let sobrenome = 'Eu 2';

let falaNome = () => console.log(nome + ' ' + sobrenome);

// module.exports.nome = nome;
// module.exports.sobrenome = sobrenome;
// console.log(module.exports)

exports.nome = nome;
exports.sobrenome = sobrenome;

// console.log(exports)