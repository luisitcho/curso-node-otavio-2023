const mongoose = require('mongoose');

// Configurações do modelo
const HomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String
})

// Criação do modelo
const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

module.exports = Home;