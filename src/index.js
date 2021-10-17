require('./db/connection')
const Email = require('./models/schedule')
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')

console.log(new Date().toISOString().substr(0,17) + "00.000Z")
const transport =  nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : "rishabhkhanna0812@gmail.com",
        pass : 'Prateek123#'
    }
})

const sendMail = async (mailOptions, _id)=>{
    transport.sendMail(mailOptions, async (err, data) => {
        if (err) {
            await Email.updateOne({_id: _id}, {$set :{"status" : "failed"} })
            console.log(err)
        }
        else {
            await Email.updateOne({_id: _id}, {$set :{"status" : "sent"} })
            console.log("email sent sucessfully !!" + data.response)
        }
    })
}

// in every 1 minute 
schedule.scheduleJob('1 * * * * *',async ()=>{
    console.log("Service running , Checking for mails !!")
    
    try{
        let date = new Date().toISOString().substr(0,17) + "00.000Z"
        var scheduledMails =  await Email.find({"time" : { $eq : date}}) 
        console.log(scheduledMails)
        if (scheduledMails.length > 0){
            for (let mail of scheduledMails)
            {
                await sendMail({
                    from: "rishraabhkhanna0812@gmail.com",
                    to: mail.emailId ,
                    subject: mail.subject,
                    text: mail.body
                }, mail._id)
            }
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

 

