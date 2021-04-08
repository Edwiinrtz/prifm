const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')

const app = express()
 

//cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//mongo config and connection
const mongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const client = new mongoClient(url,{ useUnifiedTopology: true })

const dbs='prifmdb'
let db;
let collection;
//connection
client.connect((res,err)=>{
    console.log("Connection sucessfull to dbs")
    db = client.db(dbs);
    collection = db.collection("movimientos")
})

let user = 0;

app.get('/', function (req, res) {
    user++;
    console.log(user)
    res.status(200)   
})
 
app.post('/new',(req,res)=>{
    console.log(req.body)
    collection.insertOne(req.body)
    console.log("intento de  llenado")
    res.status(200)
})

app.post("/query",async (req,res)=>{
    console.log(req.body)
    let info = await collection.find({type:req.body.type}).toArray()
    console.log(info)
    res.status(200).send(info)
})

app.listen(8001)
/*
{
    "nombre":"Salida san javier",
    "Descripcion":"Toma de fotos con Laura en San Javier, recorrimos el graffitti tour y luego se sintio mal",
    "valor":20000,
    "tipo":0,
    "fecha":"29/03/2021"
}
*/