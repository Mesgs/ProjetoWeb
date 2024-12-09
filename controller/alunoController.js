const AlunoModel = require("../models/AlunoModel");

class AlunoController{
    static async listar(req,res){
        const sucesso = req.query.s;
        const alunos = await AlunoModel.find();
        res.render("aluno/Listagem", {alunos, sucesso});
    }    
    
    static async cadastrarGet(req,res){
        const matricula = req.params.matricula;
        let aluno = {};
        console.log(matricula);
        if(matricula != undefined){
            aluno = await AlunoModel.findOne({matricula});
        }
        res.render("aluno/Cadastrar", {aluno});
    }

    static async cadastrarPost(req,res){
        if(req.body._id){
            await AlunoModel.findOneAndUpdate({_id: req.body._id},{
                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso
            });
            res.redirect("/alunos?s=3");
        }else{
            const novoAluno = new AlunoModel({

                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso
                
                });
        
                await novoAluno.save();
                res.redirect("/alunos?s=1");
        }

    
    }

    static async detalhar(req,res){
        const matricula = req.params.matricula;
        const aluno = await AlunoModel.findOne({matricula});
        res.render("aluno/detalhar",{aluno});
    }

    static async remover(req,res){
        const mat = req.params.matricula;
        await AlunoModel.deleteOne({matricula: mat});
        res.redirect("/alunos?s=2");
    }


}
    

module.exports = AlunoController;