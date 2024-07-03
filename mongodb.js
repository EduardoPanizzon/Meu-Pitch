const {
    MongoClient
} = require('mongodb');

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
        } catch (e) {
        console.log (e);
    }
}

async function inserirEmpreendedor(dados)
{
    await conecta();
    try {
        let a = await Empreendedor.insertOne(dados);
        } catch (e) {
        console.log (e);
    }
}

async function remove()
{
   await conecta();
    try {
        let a = await Entusiasta.deleteMany({fintech: "asdsad"});
        console.log(a);
    } catch (e) {
        console.log (e);
    }
}
async function consulta (categoria)
{
    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("RESTAURANTE");
    a = await db.collection(categoria);
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
async function detalhes(categoria, item){

    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("RESTAURANTE");
    todosItens = await db.collection(categoria);
    detalheItem = await todosItens.findOne({_id:item}, {projection: {_id: 0,composicao:1, image: 1}});
    return detalheItem;

}

module.exports = {inserirEntusiasta, inserirEmpreendedor};   