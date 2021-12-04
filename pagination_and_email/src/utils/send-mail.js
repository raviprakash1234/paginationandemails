const  transporters = require("../configs/mail")


module.exports = (to,subject,text)=>{
    const message = {
        to,
        subject,
        text
    }
    
    transporters.sendMail(message)

};


