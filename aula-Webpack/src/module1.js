export const nome = 'Teste Nome';
export const sobrenome = 'Teste Sobrenome';
export const idade = 23;

export class Pessoa {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
}

export default function soma(x, y) {
    return x + y
}