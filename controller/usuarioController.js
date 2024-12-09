const bcryptjs = require("bcryptjs");
const UsuarioModel = require("../models/UsuarioModel");

class UsuarioController{
    static async listar(req,res){
        const sucesso = req.query.s;
        const usuarios = await UsuarioModel.find();
        res.render("usuario/Listagem", {usuarios, sucesso});
    }    
    
    static async cadastrarGet(req,res){
        const sucesso = req.query.s;
        const _id = req.params._id;
        let usuario = {};
        console.log(usuario);
        if(_id != undefined){
            usuario = await UsuarioModel.findOne({_id});
        }
        res.render("usuario/Cadastrar", {usuario, sucesso});
    }

    static async cadastrarPost(req,res){
        const usuario = await UsuarioModel.findOne({
            email: req.body.email,

        });    
        if(usuario != null){
            res.redirect("/usuarios/cadastrar?s=1")
        }else{

        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
        if(req.body._id){
            await UsuarioModel.findOneAndUpdate({_id: req.body._id},{
                nome: req.body.nome,
                email: req.body.email,              
                senha: req.body.senha
            });
            res.redirect("/usuarios?s=3");
        }else{
            const novoUsuario = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
                
                });
        
                await novoUsuario.save();
                res.redirect("/usuarios?s=1");
        }
    }
    
    }

    static async detalhar(req,res){
        const _id = req.params._id;
        const usuario = await UsuarioModel.findOne({_id});
        res.render("usuario/detalhar",{usuario});
    }

    static async remover(req,res){
        const _id = req.params._id;
        await UsuarioModel.deleteOne({_id: _id});
        res.redirect("/usuarios?s=2");
    }

    static loginGet(req,res){
        const sucesso = req.query.s;
        res.render("usuario/login", {sucesso});
    }

    static async loginPost(req,res){
        const usuario = await UsuarioModel.findOne({
            email: req.body.email,

        });    
        if(usuario == null){
            res.redirect("/usuarios/login?s=1");          
        }else{
            if(bcryptjs.compareSync(req.body.senha, usuario.senha) == true){
                req.session.usuario = req.body.email;
                res.redirect("/");
            }else{
                res.redirect("/usuarios/login?s=1");
            }
        }
        
    }

    static logout(req,res){
        req.session.usuario = null;
        res.redirect("/usuarios/login");
    }

}
    

module.exports = UsuarioController;