const mongoose  =  require ('mongoose')


const emailSchema = new  mongoose.Schema({
emailId : String,
subject : String,
body : String,
status : String,
time : Date
})

const Email = new mongoose.model ('Email', emailSchema)

module.exports = Email
