const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const mongoURI="mongodb://127.0.0.1:27017/CodeHer"


const ConnectToMongo= ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To MongoDB successfully");
    })
}

module.exports=ConnectToMongo;
