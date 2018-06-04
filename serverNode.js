const ip = 'localhost' // ip da máquina
const express = require('express'); // ok
const bodyParser = require('body-parser'); // ok 
const app = express(); // ok
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
var Firebird = require('node-firebird');

var options = {};
options.host = 'LOCALHOST';

options.database = 'C:/expo/baseDeDados/SBRSYS.FDB'; // local onde se encontrar o banco
options.user = 'SYSMTS'; // usuário adm do banco
options.password = 'mts'; // senha do banco

Firebird.attach(options, function(err, db){ // como se fosse o construtor da classe, tudo que tiver aqui dentro, será executado juntamente com os parâmetros de conexão (options)
    
    app.get('/adm',function(req, res){ // get, utilizado para fazer um SELECT no banco
        var jsonRequest = req.body;
        var jsonRepsonse = {};
        db.query('SELECT * FROM ADMACESSOESP',function(error,rows){
            // res.end(JSON.stringify(rows));
            console.log(rows);
            jsonRepsonse.result = (rows)
            res.send(jsonRepsonse);
        });
    });

})

app.listen(3000, function(){
    console.log("servidor rodando na porta", 3000);
});