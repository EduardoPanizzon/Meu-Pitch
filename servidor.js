var express     = require('express');
var cors        = require('cors');
var app         = express();
var mongo       = require('./mongodb');

const Redis = require('ioredis');

const redis = new Redis(); 

var vetor=[];

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.use(cors());

app.get('/REST/listaTodos', function(req,resp) {
  let tmp=[];
  console.log('na listaTodos');
  for (let a=0;a<vetor.length;a++)
    {
      tmp.push("["+a+"]  "+vetor[a]);
    }
  resp.send(vetor);
});

app.get('/REST/push',async function(req,resp) {

  console.log('push');

  let id = parseInt (req.query.id);
  let conteudo = req.query.conteudo|'SEM conteudo';

  let pushSubscription = vetor[id].key;

  await redis.rpush("push", JSON.stringify({pushSubscription:pushSubscription,conteudo:conteudo}));
  resp.end();

});

app.post('/REST/registraEntusiasta', async function(req,resp) {
  console.log('registraUsuario');
  

  
  let key  = JSON.parse(req.body.key);
  
  vetor.push ({nome:req.body.nome, key:key,
    it: req.body.it,
    saude: req.body.saude,
    fintech: req.body.fintech,
    mobilidade: req.body.mobilidade,
    agricultura: req.body.agricultura,
    educacao: req.body.educacao,
    alimentacao: req.body.alimentacao});


  var id = await mongo.inserirEntusiasta(req.body);
  console.log(id);
  resp.send({id:id});
});

app.post('/REST/registraEmpreendedor', async function(req,resp) {
  console.log('registraEmpreendedor');

  console.log(req.body);
  let key  = JSON.parse(req.body.key);
  
  vetor.push ({nome:req.body.nome, key:key,
    it: req.body.it,
    saude: req.body.saude,
    fintech: req.body.fintech,
    mobilidade: req.body.mobilidade,
    agricultura: req.body.agricultura,
    educacao: req.body.educacao,
    alimentacao: req.body.alimentacao});

  var id = await mongo.inserirEmpreendedor(req.body);
  console.log(id);
  resp.send({id:id});
});



app.get(/^(.+)$/, function (req, res) {
  try {
  	console.log('teste')
    res.write("A pagina que vc busca nao existe")
    res.end();
  }
  catch(e)
  {
    res.end();
  }    
})


async function init ()
{
    app.listen(4500, function(){
        console.log('SERVIDOR WEB na porta 4500');
    });
}

init();
