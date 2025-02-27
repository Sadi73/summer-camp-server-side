const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5556

//sadiForAssignment12
//EhYYhJcReCWRm5lJ

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sadiForAssignment12:EhYYhJcReCWRm5lJ@cluster0.jcb8og7.mongodb.net/?retryWrites=true&w=majority";

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
        const database = client.db("SummerCampDB");
        const classes = database.collection("classes");
        const instructors = database.collection("instructors");

        app.get('/classes', async(req, res) => {
            const cursor = classes.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/instructors', async(req, res) => {
            const cursor = instructors.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


