const Customer = require('../models/customer')
const Ticket = require('../models/ticket')
const _ = require('lodash')

module.exports.list = (req,res) => {
    Customer.find({userId: req.user._id})
    .then((customers) => {
        res.json(customers)
    })
    .catch(err => {
        res.json(err)
    })
}

module.exports.create = (req,res) => {
    const body = req.body
    const customer = new Customer(body)
    customer.userId = req.user._id
    customer.save()
    .then((customer)=>{
       res.json(customer)
    })
    .catch(err => {
        res.json(err)
    })

}

module.exports.show = (req,res) => {
    const id = req.params.id
    Customer.findOne({userId:req.user._id, _id:id})
    .then((customer)=>{
        if(customer){
            Ticket.find({'customer':customer._id})
                .then(tickets=>{
                    res.json({customer,tickets})
                })
        } else {
            res.json({})
        }
    })
    .catch(err => res.json(err))
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Customer.findOneAndUpdate({userId:req.user._id, _id:id},body,{new:true,runValidators:true})
    .then((customer)=>{
        if(customer){
            res.json(customer)
        } else{
            res.json({})
        }
    })
    .catch((err)=> res.json(err))
}
module.exports.destroy = (req,res) => {
    const id = req.params.id
    Customer.findOnendDelete({userId:req.user._id, _id:id})
    .then((customer)=>{
        if(customer){
            res.json(customer)
        } else{
            res.json({})
        }
    })
    .catch((err)=> res.json(err))
}