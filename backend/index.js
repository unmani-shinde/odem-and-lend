const ConnectToMongo=require("./db")
const express= require('express')
ConnectToMongo();
const app=express()
const port=4000

app.use(express.json())

//Available Routes 
app.use(require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})