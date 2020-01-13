const express = require('express');
const app = express();
const objectRouter = require('./routers/model')
require('./mongoose/mongoose')


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    next()
})
app.use(express.json())
app.use(objectRouter)

app.listen(8080,()=>{
    console.log("Server run")
})