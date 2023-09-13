const mongoose = require('mongoose');
const validator = require('validator');

// Configurações do modelo
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now },

    description: String
})

// Criação do modelo
const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;

}

Contact.prototype.register = async function () {
    this.valid();

    if (this.errors.length > 0) return;

    // Cria os dados na base de dados
    this.contact = await ContactModel.create(this.body)

};

// Validação
Contact.prototype.valid = function () {
    this.cleanUp();

    // Valida o email
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');

    // Verifica se o nome está sendo enviado
    if (!this.body.name) this.errors.push('Nome é um campo obrigatório!');
    if (!this.body.email && !this.body.phone) {

        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone!');
    }

}

// Verifica os dados
Contact.prototype.cleanUp = function () {
    // Verifica se existe apenas strings nos campos
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    // Determina quais dados serão salvos na base de dados
    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        phone: this.body.phone,
    };
}

// Edita o usuário
Contact.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;

    this.valid();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
}

// Métodos estáticos
Contact.searchId = async function (id) {
    if (typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
}

Contact.searchContact = async function () {
    const contacts = await ContactModel.find().sort({ createdIn: -1 })
    return contacts;
}

// Deleta o usuário
Contact.delete = async function (id) {
    if (typeof id !== 'string') return;

    const contact = await ContactModel.findOneAndDelete({ _id: id })
    return contact;
}

module.exports = Contact;