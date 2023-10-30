const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../model");
const Livro = db.livro;

//criar um livro 
exports.create = (req,res) => {
    if(!req.body.titulo){
        res.status(400).send({message: "Conteúdo não pode ser vazio"});
        return;
    }
    //validou tem dados - create 
    const livro = new Livro({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado : false
    });
    //save do livro 

Livro.save(livro).then(data => {
    res.send(data);
    }).catch(err =>{
    res.status(500).send({message: err.message || "Erro ao criar livro."
        });
    }); 
    //recuperar livro 
    exports.findAll = (req,res) =>{
        const titulo = req.body.titulo;
        var condicao = titulo ? {titulo:{$regex: new RegExp(titulo),$options:"i"}} : {};

        livro.find(condicao).then(data =>{
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:err || "Erro ao recuperar livro."
            });
        });
    };
    //recuperar por ID
    exports.findOne = (req,res) => {
        const id = req.params.id;


        livro.findById(id).then(data => {
            if(!data)
                    res.status(404).send({message: "não encontrado" + id});
            else res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:err || "Id não encontrado."+ id });
            });
    };
    //alterar livro por id
    exports.update = (req,res) =>{
        if(!req.body) {
            return res.status(400).send({
                message:"Dados não podem ser vazio!"
            });
        }

        const id = req.params.id;

        Livro.findByIdAndUpdate(id,req.body,{userFindAndModify:false}).then(data => {
            if(!data){
                res.status(404).send({
                    message:`não foi possivel alterar id=${id}. Livro não encontrado`
                });
            }else res.send({message:"Livro atualizado com sucesso"});
        }).catch(err => {
            res.status(500).send({
                message: err.message ||"Não foi possivel atualizar = " +id
            });
        });
    };
    //deletar por Id
    exports.delete= (req,res) =>{
        const id = req.params.id;

        Livro.findByIdAndRemove(id,req.body,{userFindAndModify:false}).then(data => {
            if(!data){
                res.status(404).send({
                    message:`não foi possivel deletar id=${id}. Livro não encontrado`
                });
            }else res.send({message:"Livro deletado com sucesso"});
        }).catch(err => {
            res.status(500).send({
                message:err.message ||"Não foi possivel deletar = " +id
            });
        });
    };
    //deletar tudo
    exports.deleteAll = (req,res) =>{
        Livro.deleteMany({}).then(data => {
            res.send({
                message: `${data.deleteCount} livros foram deletados.`
            });
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "falha ao deletar todos os livros."
            });
        });        
    };
    //buscar todos os livros
    exports.findAllPublicados = (req,res) =>{
        Livro.find({publicado: true}).then(data =>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message:err.message || "Falha ao recuperar Livros."
            });
        });
    };



















}