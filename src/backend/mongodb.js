const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    
    const uri = process.env.MONGO_URI

    try{
        console.log(`Trying to connect to ${uri}`)
        await mongoose.connect(uri)
        console.log(`Connected successfully to ${uri}`)
    }
    catch(err){
        console.error(err.message)
        process.exit(1)
    }
}


module.exports = { connectDB }