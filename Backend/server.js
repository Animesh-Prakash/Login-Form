const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const bodyparser= require('body-parser')
const cors= require('cors')

dotenv.config();
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName= 'SignUp'
const app = express()

const port = process.env.PORT || 3000;
app.use(bodyparser.json())
app.use(cors())
client.connect();

app.get('/',async(req,res)=>{
  const db = client.db(dbName);
    const collection = db.collection('Members');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/',async(req,res)=>{
 
  const {username,password}=req.body;
  const db = client.db(dbName);
  const collection = db.collection('Members');
  const findResult = await collection.insertOne({username,password});
  res.send({success:true, result:findResult})  
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});