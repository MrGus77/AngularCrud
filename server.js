const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");

const app = express();


var corsOption={
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

//parse requisição application/json
app.use(express.json());
//parse from - pela url
app.use(express.urlencoded({extend:true}));
//rota simples
app.get("/",(req,res) => {
    res.json({message: "bem vindos a aplicação"})
});
//set da porta para listen
const PORT = process.env.PORT || 8082;
app.listen(PORT,() =>{
    console.log(`Server is runninh na porta ${PORT}.`)
});