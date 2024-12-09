const auth = require("../middlewares/usuarioAuth");
const express = require("express");
const routes = express.Router();
const usuarioController = require("../controller/usuarioController");

routes.get("/usuarios", auth, usuarioController.listar);
routes.post("/usuarios", usuarioController.cadastrarPost);
routes.get("/usuarios/cadastrar/:_id?", usuarioController.cadastrarGet);
routes.get("/usuarios/remover/:_id", auth, usuarioController.remover);
routes.get("/usuarios/logout/", auth, usuarioController.logout);
routes.get("/usuarios/login", usuarioController.loginGet);
routes.post("/usuarios/login", usuarioController.loginPost);
routes.get("/usuarios/:_id", auth, usuarioController.detalhar);


module.exports = routes;