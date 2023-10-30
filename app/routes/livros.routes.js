module.exports = app => {
    const livros = require("../controller/livro.controller");

    var router = require("express").Router();

    //criar
    router.post("/", livros.create);

    //recuperar dados 
    router.get("/", livros.findAll);

    //recuperar por publicação
    router.get("/publicado", livros.findAllPublicados);

    //recuperar by id
    router.get("/id", livros.findOne);

    //update by id
    router.put("/:id", livros.update);

    //delete by id
    router.delete("/:id", livros.delete);

    //limpar base
    router.delete("/", livros.deleteAll);

    app.use("/api/livros", router);
    
};