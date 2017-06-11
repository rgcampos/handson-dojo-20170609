var express = require('express');
var app = express();

var cfenv = require('cfenv'); //ADICIONADO PARA TRABALHAR COM AMBIENTE BLUEMIX
var appEnv = cfenv.getAppEnv(); //ADICIONADO PARA TRABALHAR COM AMBIENTE BLUEMIX


var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
    username: 'ccfc5008-2003-45e8-8f40-1d3b90e65b1c',
    password: 'tj3Jo2Ag582r',
    version_date: ConversationV1.VERSION_DATE_2017_04_21
});


var contexto = {};

app.get('/', function (req, res) {
    res.send('Ola Mundo');
});

app.get('/msg', function (req, res) {

    console.log("req.query", req.query);
    console.log("req.body", req.body);

    var input = '';
    if (req.query && req.query.input) {
        input = req.query.input;
    } else {
        contexto = {nomeUsuario:'Euler'};
    }

    conversation.message({
        input: {
            text: input
        },

        context: contexto,
        workspace_id: '88e2a403-0aaa-4ba0-a1cd-2f6d17d738c5'
    }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            contexto = response.context;
            console.log(contexto);
            res.send(response.output.text[0]);
        }
    });
});


//ANTES ESTAVA ASSIM
// var server = app.listen(3000);
// console.log('Servidor Express iniciado na porta %s', server.address().port);

//AGORA ESTA ASSIM
//ADICIONADO PARA TRABALHAR COM AMBIENTE BLUEMIX
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});