const ip = 'localhost' // ip da máquina
const express = require('express'); // biblioteca para post, get e demais operações 
const bodyParser = require('body-parser'); // efetuar parse do select em Json -- no momento não está sendo utilizada.
const app = express(); // ok
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
var Firebird = require('node-firebird');

var options = {}; // vetor onde irá conter todos os dados da conexão 
options.host = 'LOCALHOST';

options.database = 'C:/expo/baseDeDados/SBRSYS.FDB'; // local onde se encontrar o banco
options.user = 'SYSMTS'; // usuário adm do banco
options.password = 'mts'; // senha do banco

Firebird.attach(options, function(err, db){ // É como se fosse o construtor da classe. Tudo que tiver aqui dentro, será executado juntamente com os parâmetros de conexão (options)
    app.get('/adm',function(req, res){ // get, utilizado para fazer um SELECT no banco
        var jsonRequest = req.body;
        var jsonRepsonse = {};
        db.query("select first(50) CLI.CDCLIFOR,replace(coalesce(CLI.NMFANTASIA, CLI.NMCLIFOR), ASCII_CHAR(39), '') NMFANTASIA, replace(CLI.NUFONE, ASCII_CHAR(39), '') NUFONE, replace((CLI.DEENDERECO ||', '|| coalesce(CLI.DENRORUA,'')), ASCII_CHAR(39), '') DEENDERECO, replace(CLI.DEBAIRRO, ASCII_CHAR(39), '') DEBAIRRO, replace(CID.NMCID, ASCII_CHAR(39), '') NMCID, CID.CDUF, replace(CLI.DEOBS, ASCII_CHAR(39), '') DEOBS,(case when coalesce(CLI.TPSTATUS,'S') = 'S' then 'SEM RESTRICOES' else 'COM RESTRICOES'end) TPSTATUS, CLI.TPSTATUS ATIVO, CLI.NUCPFCNPJ CPFCNPJ, (select sum(case when FIN.IDPAGREC = 'R' then FIN.VLLANC else FIN.VLLANC * -1 end) from FINPAGREC FIN join ADMANDROID ANDROID on(FIN.CDFIL = ANDROID.CDFILFIN) where FIN.CDCLIFOR = CLI.CDCLIFOR and FIN.IDSIT = 'P') VLSALDO, (PRAZO.CDPRAZO ||' - '|| replace(PRAZO.DEPRAZO, ASCII_CHAR(39), '')) DEPRAZO, (select sum( (case when ((FIN.DTVCTO + ADM.NUDIASCARJUR) - CURRENT_TIMESTAMP) < 0 then FIN.VLLANC else 0 end ) ) from FINPAGREC FIN join ADMCONFIG ADM on(ADM.CDFIL = FIN.CDFIL) join ADMANDROID ANDROID on(ADM.CDFIL = ANDROID.CDFIL) where FIN.CDCLIFOR = CLI.CDCLIFOR and FIN.IDSIT = 'P' and FIN.CDFIL = ANDROID.CDFILFIN and FIN.IDPAGREC = 'R') VLSALDODEV, replace(coalesce(CLI.NMCLIFOR, CLI.NMCLIFOR), ASCII_CHAR(39), '') NMCLIFOR from CADCLIFOR CLI left join CADCID CID on (CID.CDCID = CLI.CDCID) left join CADPRAZO PRAZO on (PRAZO.CDPRAZO = CLI.CDPRAZO) where CLI.IDCLI = 'S' order by CLI.CDCLIFOR",function(error,rows){
            // console.log(rows);
            jsonRepsonse.result = (rows);
            res.send(jsonRepsonse);
        });
    });
})

app.listen(3000, function(){
    console.log("servidor rodando na porta", 3000);
});

    

