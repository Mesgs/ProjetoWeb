const express = require("express");
const routes = express.Router();
const alunoController = require("../controller/alunoController");

routes.get("/alunos", alunoController.listar);
routes.post("/alunos", alunoController.cadastrarPost);
routes.get("/alunos/cadastrar/:matricula?", alunoController.cadastrarGet);
routes.get("/alunos/:matricula", alunoController.detalhar);
routes.get("/alunos/remover/:matricula", alunoController.remover);

module.exports = routes;