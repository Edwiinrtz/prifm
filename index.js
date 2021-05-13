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

//port
app.set('port', process.env.PORT || 8001)
//mongo config and connection
const mongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://asd:cgeTt8FZJ3IybANI@prifm.z9z6j.mongodb.net/prifm?retryWrites=true&w=majority'
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


app.get('/', function (req, res) {
    res.status(200).send("great, it's working")
})
 
app.post('/new',(req,res)=>{
    console.log(req.body)
    collection.insertOne(req.body)
    res.status(200)
})

app.post("/query",async (req,res)=>{
    console.log(req.body)
    let info = await collection.find({type:req.body.type}).toArray()
    console.log(info)
    res.status(200).send(info)
})

app.listen(app.get('port'),()=>{
	console.log("server on port",app.get('port'))
})
/*
{
    "nombre":"Salida san javier",
    "Descripcion":"Toma de fotos con Laura en San Javier, recorrimos el graffitti tour y luego se sintio mal",
    "valor":20000,
    "tipo":0,
    "fecha":"29/03/2021"
}
*/
