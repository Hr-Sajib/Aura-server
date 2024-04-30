const express = require('express');
const cors = require('cors');
require('dotenv').config()


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



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster-sajib.cqfdgne.mongodb.net/?retryWrites=true&w=majority`;

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
    const categoriesCollection = client.db('artsDB').collection('categories');











    //get all arts & categories
    app.get('/getarts',async(req,res)=>{
        const cursor1 = artCollection.find();
        const cursor2 = categoriesCollection.find();

        const resultArts = await cursor1.toArray();
        const resultsCategories = await cursor2.toArray();

        const r = [resultArts, resultsCategories]
        res.send(r);

    })






   //add categories 

   app.post('/postCategories', async(req,res)=>{
        const cats = req.body;

        // console.log(cats);

        const refresh = await categoriesCollection.deleteMany();
        let result ;

        if (refresh.deletedCount >0 )
            { result = await categoriesCollection.insertMany(cats);}

        res.send(result);
    })

    






    //add arts
    app.post('/addart',async(req,res)=>{
        const art = req.body;
        // console.log(art);

        const result = await artCollection.insertOne(art);
        res.send(result);
        

    })

    //get specific art
    app.get('/getart/:id', async(req,res)=>{
        const id = req.params.id;
        
        const query = { _id: new ObjectId(id)};
        const result =  await artCollection.findOne(query);

        res.send(result);

    })



    

    //get own arts 
    app.get('/getMyArts/:mail', async(req,res)=>{
        const userMail = req.params.mail;
        const query = {userEmail : userMail};

        const result =  artCollection.find(query);
        const r = await result.toArray();
        res.send(r);
    })


    //delete own art
    app.delete('/delete/:id', async(req,res)=>{
        const id = req.params.id;
        
        const query = {_id: new ObjectId(id)};

        const result = await artCollection.deleteOne(query);
        res.send(result);

    })


    //update own art
    app.put('/update/:id', async(req,res)=>{
        const id = req.params.id;
        const art = req.body;

        const query = {_id: new ObjectId(id)};

        const updatedArt = {
            $set:{
                name : art.name ,
                category : art.category ,
                price : art.price ,
                rating : art.rating ,
                customization : art.customization ,
                imageurl : art.imageurl ,
                processingTime : art.processingTime ,
                description : art.description ,
                stockStatus : art.stockStatus ,
            }
        }

        const options ={ upsert : true};

        const result = await artCollection.updateOne(query, updatedArt, options );
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



