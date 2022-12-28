const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const run = async () =>{
try{
    
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxzlll3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const taskCollection = client.db('allTask').collection('task')


app.get('/alltask', async(req,res)=>{

    const query = {};
    const task = await taskCollection.find(query).toArray();
    res.send(task);
})

app.get('/alltask/:id', async(req,res)=>{
 const id = req.params.id;
 const query = { _id: ObjectId(id)};
 const task = await taskCollection.findOne(query);
 res.send(task)


})



app.post('/alltask', async(req,res) =>{
    const task = req.body;
    const result = await taskCollection.insertOne(task);
    res.send(result);
})

app.put('/alltask/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const task = req.body;
    const option = {upsert:true}
    const updatedTask = {
        $set:{
            name: task.name,
            description: task.description

        }
    }
    const result = await taskCollection.updateOne(query, updatedTask, option)
    res.send(result)
    // console.log(updatedTask);
})

app.delete('/alltask/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)}
    const result = await taskCollection.deleteOne(query);
    console.log(result);
    res.send(result)
})

}
finally{

}
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("TMT Online Server is running");
});
app.listen(port, () => {
    console.log(`TMT Server running on ${port}`);
  });