const express =require('express')
const { MongoClient } = require('mongodb');
const objectId=require('mongodb').ObjectId;
require('dotenv').config()
const cors=require('cors')
const app=express();
const port=process.env.PORT||5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rh3cx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res)=>{

    res.send('get the response')
})



async function run(){
    try{
    await client.connect();
    const database=client.db("MotorBike");
    const  serviceCollection=database.collection('services');
    const reviewCollection=database.collection('reviews')
    const orderCollection=database.collection('orders')
  //Post Api

  app.post('/products',async(req,res)=>{
    const product=req.body
    console.log("hit the post api",product)

    const result=await serviceCollection.insertOne(service)
    console.log(result)
    res.json(result)
 
  })


    //get api
    
    app.get('/products',async(req,res)=>{
        const cursor=serviceCollection.find({})
        const products= await cursor.toArray();
        res.send(products)
    })
    

    //post the review

    app.post('/reviews',async(req,res)=>{
        const review=req.body
        console.log("hit the post api",review)
    
        const result=await reviewCollection.insertOne(review)
        console.log(result)
        res.json(result)
     
      })
    
    //get the review
    app.get('/reviews',async(req,res)=>{
        const cursor=reviewCollection.find({})
        const reviews= await cursor.toArray();
        res.send(reviews)
    })
    

    //get the single service
    
    app.get('/purchase/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:objectId(id)}
      const service=await serviceCollection.findOne(query)
      res.json(service)
    })
    
    
    //Post api for purchase
    
    app.post('/orders',async(req,res)=>{
       
        const orders=req.body;
        console.log('hit the post api',orders)
      
         const result= await orderCollection.insertOne(orders)
         console.log(result)
         res.json(result)
      
       // res.send('post hitted')
    })

    //get the orders

    app.get('/orders',async(req,res)=>{
      const email=req.query.email
      const query={email:email}
  
      const cursor=orderCollection.find(query)
      const orders= await cursor.toArray();
      res.send(orders)
  })
  
    
//post the details

// app.post('/orders',async(req,res)=>{
       
//     const orders=req.body;
//     console.log('hit the post api',orders)
  
//      const result= await  orderCollection.insertOne(orders)
//      console.log(result)
//      res.json(result)
  
//    // res.send('post hitted')
// })

//delete

// app.delete('/orders/:id',async(req,res)=>{
       
//     const id=req.params.id;
//       const query={_id:objectId(id)}
  
//      const result= await  orderCollection.deleteOne(query)
//      console.log(result)
//      res.json(result)
  
//    // res.send('post hitted')
// })


    }
    finally{
       // await client.close();
    }
    }
    
    run().catch(console.dir);
    app.listen(port,()=>{
        console.log('listen to the port',port)
    })