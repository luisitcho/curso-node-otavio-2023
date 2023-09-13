const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// Configurações do modelo
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

// Criação do modelo
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    // Loga o usuário no sistema
    async login() {
        this.valid();

        // Verifica a quantidade de erros antes de registar na base de dados
        if (this.errors.length > 0) return;

        // Valida o email e verifica se u usuário ja existe
        this.user = await LoginModel.findOne({ email: this.body.email });

        // Verifica se o usuário não existe
        if (!this.user) {
            this.errors.push('Usuário ou senha inválidos');
            return
        }

        // Verifica a senha da base de dados e do input
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return
        }


    }

    // Regista as informações na base de dados
    async register() {
        this.valid();

        // Verifica a quantidade de erros antes de registar na base de dados
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        // Encriptando a senha
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        //Cria os dados na base de dados
        this.user = await LoginModel.create(this.body);
    }

    // Verifica se o usuário ja existe
    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já cadastrado!');
    }

    // Validação
    valid() {
        this.cleanUp();

        // Valida o email
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');

        // Valida a senha
        if (this.body.password.length < 4 || this.body.password.length > 12) this.errors.push('A senha precisa ter entre 8 e 12 catacteres!');
    }

    // Verifica os dados
    cleanUp() {
        // Verifica se existe apenas strings nos campos
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        // Determina quais dados serão salvos na base de dados
        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

}

module.exports = Login;