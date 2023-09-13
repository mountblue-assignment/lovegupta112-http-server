const express=require('express');
const app=express();
const path=require('path');
const uuid = require('uuid');


//for default route ---------
app.get('/',(req,res)=>{
  res.send('<h1>Welcome to Our Page !</h1>');
})

//for html route---------
app.get('/html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'index.html'));
    }
    catch(error){
      console.log('Error: ',error);
      res.status(404).send(`Sorry, cant find that `);
    }
})

//for json route --------------
app.get('/json',(req,res)=>{
  try{
    res.sendFile(path.join(__dirname,'sample.json'));
  }
  catch(error){
     console.log('Error: ',error);
     res.status(404).send(`Sorry, cant find that `);
  }
})

//for uuid route--------------------
app.get('/uuid',(req,res)=>{
   try{
    res.send({uuid:uuid.v4()});
   }
   catch(error){
    console.log('Error: ',error);
    res.status(404).send(`Sorry, cant find that `);
   }
})

//for status_code route ------------------
app.get('/status/:status_code',(req,res)=>{
  try{
       const statusCode=req.params.status_code;
       res.status(statusCode).send(`status code : ${statusCode}`);
   }
   catch(error){
    console.log('Error: ',error);
    res.status(404).send(`Sorry, cant find that `);
   }
})

//for delay route -------------

app.get('/delay/:delay_in_seconds',(req,res)=>{
  try{
    const delay=req.params.delay_in_seconds;
    setTimeout(() => {
      res.send('Response with 200 status code !');
    },delay*1000);
    console.log(delay);
}
catch(error){
 console.log('Error: ',error);
 res.status(404).send(`Sorry, cant find that `);
}
})

const PORT=process.env.port || 5000;

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`);
})