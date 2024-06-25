var express     = require('express');
var cors        = require('cors');
var app         = express();

const Redis = require('ioredis');

const redis = new Redis(); 

var vetor=[];







app.use(express.json());

app.use(cors());

app.get('/REST/listaTodos', function(req,resp) {
  let tmp=[];
  console.log('na listaTodos');
  for (let a=0;a<vetor.length;a++)
    {
      tmp.push("["+a+"]  "+vetor[a].nome);
    }
  resp.send(tmp);
});

app.get('/REST/push',async function(req,resp) {

  console.log('push');

  let id = parseInt (req.query.id);
  let conteudo = req.query.conteudo|'SEM conteudo';

  let pushSubscription = vetor[id].key;

  await redis.rpush("push", JSON.stringify({pushSubscription:pushSubscription,conteudo:conteudo}));
  resp.end();

});

app.post('/REST/registraUsuario', function(req,resp) {
  console.log('registraUsuario');

  console.log(req.body)
  let key  = JSON.parse(req.body.key);
  let nome = req.body.nome;
  
  vetor.push ({nome:nome, key:key});


  resp.send({valor:'rodando'});
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
