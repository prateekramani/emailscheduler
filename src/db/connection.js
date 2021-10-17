const mongoose  = require("mongoose")


mongoose.connect('mongodb://localhost:27017/email').then(()=>{
    console.log("Database connection established")
}).catch(()=>{
    console.log("conncetion failed")
})