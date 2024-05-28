const mongoose= require('mongoose');
const mongoURI='mongodb://localhost:27017/inotebook'

const connectToMongo=async()=>{
    let data=await mongoose.connect(mongoURI)
    console.log(`MongoDB Connected: ${data.connection.host}`);
}

module.exports=connectToMongo;