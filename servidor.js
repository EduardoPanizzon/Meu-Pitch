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
  interesses = mongo.criaJson(req.body.it,req.body.saude,req.body.fintech, req.body.mobilidade,req.body.agricultura,req.body.educacao, req.body.alimentacao)
  result = await mongo.getListaPush(interesses);
  result = await result.toArray();
  console.log(result);
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
  interesses = mongo.criaJson(req.body.it, req.body.saude, req.body.fintech, req.body.mobilidade, req.body.agricultura, req.body.educacao, req.body.alimentacao)
  await faz_push(interesses);
  console.log(id);
  resp.send({id:id});
});

async function faz_push(interesses) {
  
  result = await mongo.getListaPush(interesses);
  result = await result.toArray();
  console.log(result);

  for(i = 0; i < result.length; i++){
    let conteudo = 'SEM conteudo';
    let pushSubscription = JSON.parse(result[i].key);;

    await redis.rpush("push", JSON.stringify({pushSubscription:pushSubscription,conteudo:conteudo}));
  }
};

app.get('/listaStartUps/:id', async function (req,res){

  var id = req.params.id;

  listaStartUps = await mongo.listaStartUps(id);
  listaStartUps = await listaStartUps.toArray();

  console.log(listaStartUps)

  res.send(listaStartUps)
  res.end()

  // interesses = criaJson(req.body.it, req.body.saude, req.body.fintech, req.body.mobilidade, req.body.agricultura, req.body.educacao, req.body.alimentacao)
  // await faz_push(interesses);
})


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
