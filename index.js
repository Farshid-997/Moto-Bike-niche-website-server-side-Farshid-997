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
    const usersCollection=database.collection('users')
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

    app.get('/orders/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:objectId(id)}
      const orders=await orderCollection.findOne(query)
      console.log(orders)
      res.json(orders)
  })
  

  //get the user 
  
  app.get('/users/:email',async(req,res)=>{
    const email=req.params.email;
    const query={email:email}
    const users=await usersCollection.findOne(query)
   let isAdmin=false
   if(users?.role==='admin'){
isAdmin=true;
   }
    res.json({admin:isAdmin})
})
    

  //users post 
  app.post('/users',async(req,res)=>{
       
    const users=req.body;
    console.log('hit the post api',users)
  
     const result= await usersCollection.insertOne(users)
     console.log(result)
     res.json(result)
  
   // res.send('post hitted')
})

app.put('/users',async(req,res)=>{
       
  const users=req.body;
  const filter={email:users.email}
  const options={upsert:true}
  const updateDoc={$set:users}

   const result= await usersCollection.updateOne(filter,updateDoc,options)
   console.log(result)
   res.json(result)

 // res.send('post hitted')
})


app.put('/users/admin',async(req,res)=>{
       
  const users=req.body;
  const filter={email:users.email}
  const options={upsert:true}
  const updateDoc={$set:{role:'admin'}}

   const result= await usersCollection.updateOne(filter,updateDoc,options)
   console.log(result)
   res.json(result)

 // res.send('post hitted')
})





    }
    finally{
       // await client.close();
    }
    }
    
    run().catch(console.dir);
    app.listen(port,()=>{
        console.log('listen to the port',port)
    })