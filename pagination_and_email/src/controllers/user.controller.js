const express = require("express")
const { transporter } = require("../configs/mail")

const sendMail = require("../utils/send-mail")

const router = express.Router()

const User = require("../models/user.model")



//create endpoint for registering where in the user can register and when he registers we should send him a confirmation email and the contents of that will be
router.post("", async (req, res)=>{
    try {
        const user = await User.create(req.body)
        sendMail( `${req.body.email}`,`Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
        `Hi ${req.body.first_name}, Please confirm your email address`
        )
      
        return res.status(201).send(user)
    } catch (e) {
      return  res.status(500).send({status:"fail" , massege: e.massege})
    }
})




//create a set of admins ( 5 admin users)
router.post("/multipleadmin", async (req, res)=>{
    try {
        const user = await User.create(req.body)

        const to_array = [
            "a@a.com",
            "b@b.com",
            "c@c.com",
            "d@d.com",
            "e@e.com",
        ]

        const to_string = to_array.join(",")

        sendMail( to_string, `${req.body.first_name} ${req.body.last_name} has registered with us`,
        `Please welcome ${req.body.first_name} ${req.body.last_name}`
        )
      
        return res.status(201).send(user)
    } catch (e) {
      return  res.status(500).send({status:"fail" , massege: e.massege})
    }
})




router.get("", async (req, res)=>{
    try {

        const page = +req.query.page || 1
        const size = +req.query.size || 2

        const skip = (page-1)*size

        const user = await User.find().skip(skip).limit(size).lean().exec()

        const totalPage = Math.ceil((await User.find().countDocuments())/size)

        return res.status(200).send({user, totalPage})
    } catch (e) {
        return  res.status(500).send({status:"fail" , massege: e.massege})

    }
})


module.exports = router