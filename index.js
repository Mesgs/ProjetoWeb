const express = require('express');
require('dotenv/config');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));
const AlunoModel = require("./models/AlunoModel");
const UsuarioModel = require("./models/UsuarioModel");
app.set('view engine', 'ejs');

const alunoRoutes = require("./routes/alunoRoutes");
app.use(alunoRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

app.get("/", function(req, res){
    const usuario = {
        nome: "João",
        email: "j@gmail.com",
        senha: "*****"
    };
    
    if(req.session.usuario){
        res.render("index");
    }else{
        res.redirect("/usuarios/login");
    }
   
});

   
app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});