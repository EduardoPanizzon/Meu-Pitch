const {
    MongoClient
} = require('mongodb');
const { ObjectId } = require('mongodb');
async function conecta()
{
    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect(); 
    db = await client.db("MeuPitch");
    Empreendedor = await db.collection("Empreendedor");
    Entusiasta = await db.collection("Entusiasta");
    EntusiastaCriterio = await db.collection("EntusiastaCriterio");
    EmpreendendorCriterio = await db.collection("EmpreendedorCriterio");
}
async function inserirEntusiasta(dados)
{
    await conecta();
    try {
        let a = await Entusiasta.insertOne(dados);
        return a.insertedId.toString();
        } catch (e) {
        console.log (e);
    }
}

async function inserirEmpreendedor(dados)
{
    await conecta();
    try {
        let a = await Empreendedor.insertOne(dados);
        return a.insertedId.toString();
        } catch (e) {
        console.log (e);
    }
}

async function remove()
{
   await conecta();
    try {
        let a = await Entusiasta.deleteMany({ nome: "d"});
        console.log(a);
    } catch (e) {
        console.log (e);
    }
}
async function consulta (categoria)
{
    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("MeuPitch");
    a = await db.collection("Empreendedor");
    let b = await a.find( {} ).toArray();
    console.log(b);
    b = b.map(c => c._id)
    return b;
}
async function init()
{
    await conecta();
    // console.log("Insere um registro");

    await inserte();
    // console.log("Consulta para ver se foi inserido");
    console.log("chegou aq");
    return 0;
}
async function getListaPush(interesses){

    await conecta()
    listaPush = await Entusiasta.find({ $or: interesses } , {projection: {_id: 0,key:1, nome:1}});    
    return listaPush;

}

async function listaStartUps(id) {
    await conecta()

    var objectid = new ObjectId(id)
    listaInteresses = await Entusiasta.find({ _id: objectid} , {projection: {_id: 0, it:1, saude:1, fintech:1, mobilidade:1, agricultura:1, educacao:1, alimentacao:1}}); 
    listaInteresses = await listaInteresses.toArray()
    interesses = criaJson(listaInteresses[0].it, listaInteresses[0].saude, listaInteresses[0].fintech, listaInteresses[0].mobilidade, listaInteresses[0].agricultura, listaInteresses[0].educacao, listaInteresses[0].alimentacao);
    
    listaPush = await Empreendedor.find({ $or: interesses } , {projection: {_id: 0, startupNome:1, startupDesc:1, email:1}});    
    return listaPush
}

function criaJson (it,saude,fintech,mobilidade,agricultura,educacao,alimentacao){
    var texto = "["
    if(it) texto += "{ \"it\": true },"
    if(saude) texto += "{ \"saude\": true },"
    if(fintech) texto += "{ \"fintech\": true },"
    if(mobilidade) texto += "{ \"mobilidade\": true },"
    if(agricultura) texto += "{ \"agricultura\": true },"
    if(educacao) texto += "{ \"educacao\": true },"
    if(alimentacao) texto += "{ \"alimentacao\": true },"
  
    texto = texto.slice(0,texto.length - 1);
    texto += "]"
    return (JSON.parse(texto));
  
  }


module.exports = {inserirEntusiasta, inserirEmpreendedor, getListaPush, listaStartUps, criaJson};   