const express= require('express')
const router = new express.Router()
const Email = require('../models/schedule')

app = express();
app.use(express.json())

// get all the mails
router.get('/email', async(req, res)=>{
    try{
        let response = await Email.find({})
        console.log(response)
        res.send(response)
    }
    catch(e){
        res.send(e)
    }
})

// filter emails by their status
router.get('/filter', async(req, res)=>{
    try{
        let response = await Email.find({"status" : req.query.status})
        console.log(response)
        res.send(response)
    }
    catch(e){
        res.send(e)
    }
})

// insert email
router.post('/email', async (req, res) => {
    try {
        const data = {
            emailId: req.body.emailId,
            subject: req.body.subject,
            body: req.body.body,
            status: "In process",
            time: new Date(req.body.time)
        }
        let email_obj = new Email(data)
        let response = await email_obj.save()
        console.log("Data saved")
        res.send("Data saved")
    }
    catch (e) {
        console.log(e)
    }
})

// update timings of the email
router.post('/reschedule', async (req,res)=>{
    try{
        let data = await Email.updateMany({emailId: req.body.emailId}, {$set :{"time" : req.body.time}})
        console.log(data)
        res.send(data)
    }
    catch(e){
        console.log(e)
    }
})

// delete mail by status
router.delete('/email', async(req,res)=>{
    try{
        let data = await Email.deleteMany({"status" : req.query.status})
        console.log(data)
        res.send(data)
    }
    catch (e){
    console.log(e)
    }
})

module.exports = router
