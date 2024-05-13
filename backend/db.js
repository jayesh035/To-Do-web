const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";

const connectToMongo=()=>
{
    mongoose.connect(mongoURI).then((success)=>
    {
        console.log('Connected successfully');
    }).catch((err)=>{
        console.log(err.massage)
    })
}

module.exports=connectToMongo;