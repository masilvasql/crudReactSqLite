
// var Firebird = require('firebirdsql');

// const http = require('http') // momento da requisição
// const port = 3000 // porta de entrada
// const ip = 'localhost' // ip da máquina
// const database = ''

// const server = http.createServer((req,res)=> {
//     console.log('Recebendo uma Request')
//     // res.end('<h1>Aqui fica o que vamos enviar para o navegador como resposta!</h1>')
//     res.writeHead(200,{'Content-type': 'application/json'});
//     var objeto ={
//         nome:'Marcelo',
//         trabalho:'programador',
//         idade: 26
//     }
//     res.end(JSON.stringify(objeto));
// });


// server.listen(port,ip,()=>{
//     console.log(`Servirdor rodando em http://${ip}:${port}`)
//     console.log('Para derrubar o servidor: CTRL + C')
// })


// var Firebird = require('node-firebird');
// // Options
// var options = {};
// options.host = '127.0.0.1';
// options.port = 3050;
// options.database = 'SBRSYS.FDB';
// options.user = 'SYSMTS';
// options.password = 'mts';
// // Query
// Firebird.attach(options, function(err, db) {

//     if (err)
//         throw err;

//     // db = DATABASE
//     db.query('SOME QUERY', function(err, result) {
//         // IMPORTANT: close the connection
//         db.detach();
//     });

// });


var Firebird = require('node-firebird');
var options = {};
 
options.host = '10.1.1.24';
options.port = 3050;
options.database = 'SBRSYS.fdb';
options.user = 'SYSMTS';
options.password = 'mts';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database


var pool = Firebird.pool(5, options);
 
// Get a free pool
pool.get(function(err, db) {
 
    if (err)
        throw err;
 
    // db = DATABASE
    db.query('SELECT * FROM TABLE', function(err, result) {
        // IMPORTANT: release the pool connection
        db.detach();
    });
});
 
// Destroy pool
pool.destroy();


