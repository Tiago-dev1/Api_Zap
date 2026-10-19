const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Processa dados multipart/form-data enviados pelo formulário

// Simulação de base de dados em memória
const usuarios = [];

// 1º Endpoint de Registro de Novo Utilizador (POST /registrar)
router.post('/registrar', upload.none(), (req, res) => {
    const { apelido, senha, telefone } = req.body;

    if (!apelido || !senha || !telefone) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
    }

    const usuarioExistente = usuarios.find(u => u.telefone === telefone);
    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Telefone já cadastrado!' });
    }

    // Guarda o novo utilizador
    usuarios.push({ apelido, senha, telefone });

    return res.status(201).json({
        mensagem: 'Utilizador registrado com sucesso!',
        usuario: { apelido, telefone }
    });
});

// 2º Endpoint de Autenticação / Login (POST /auth)
router.post('/auth', (req, res) => {
    const { telefone, senha } = req.query;

    if (!telefone || !senha) {
        return res.status(400).json({ isAuth: false, mensagem: 'Informe telefone e senha.' });
    }

    const usuario = usuarios.find(u => u.telefone === telefone && u.senha === senha);

    if (usuario) {
        return res.status(200).json({
            isAuth: true,
            mensagem: `Bem-vindo(a), ${usuario.apelido}!`
        });
    }

    return res.status(401).json({
        isAuth: false,
        mensagem: 'Telefone ou senha inválidos.'
    });
});

module.exports = router;