const mongoose=require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebookcloud"


const connectTOMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to the mongo database")
    })

}

module.exports=connectTOMongo;