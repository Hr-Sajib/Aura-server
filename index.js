const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server running..')
})







// database operations


//Aura-arts
//jUAEdU9yQDBA8HHm



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Aura-arts:jUAEdU9yQDBA8HHm@cluster-sajib.cqfdgne.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const artCollection = client.db('artsDB').collection('arts');


    app.post('/addart',async(req,res)=>{
        const art = req.body;
        console.log(art);

        const result = await artCollection.insertOne(art);
        res.send(result);
    })










  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.listen(port, ()=>{
    console.log('Server running in port : ',port);
})