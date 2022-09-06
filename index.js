const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://ermel-web-dev:2yQK8Uj6U0Bpzq1I@ermel-east.cq7ww.mongodb.net/?retryWrites=true&w=majority');

const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    dataDeCriacao: {
        type: Date,
        default: Date.now,
    },
}));

app.get('/adicionar', async (req, res) => {
    const usuario = await Usuario.create({
        nome: 'Guilherme',
        email: "guilherme@mail.com",
        senha: "123456"
    });
    return res.send({ usuario });
});


app.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        return res.send({ usuarios });
    } catch (e) {
        return res.status(400).send({ error: 'Falha ao listar usuários' });
    }
});

app.listen(8080, () => console.log('Inicializado!'));