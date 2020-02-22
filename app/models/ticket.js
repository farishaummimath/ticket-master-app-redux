const mongoose = require('mongoose')
const Schema = mongoose.Schema
const nodemailer = require('nodemailer')
require('dotenv').config()

const Customer = require('../models/customer')
// Step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'farishaummimath@gmail.com',
        pass: 'farisha12'
    }
})
let mailOptions = {
    from: 'farishaummimath@gmail.com',
    to: '',
    subject: '',
    text: ''
}

const ticketSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }],
    message: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})
ticketSchema.post('save',function(next){
    const ticket = this // refers to user object, just before saving the function will be called    //next()
       
        Customer.findById(ticket.customer)
        .then(customer=>{
            mailOptions.to = customer.email
            mailOptions.subject = 'Ticket Generated'
            mailOptions.text = `Your ticket with Ticket ID:${ticket.code} has been generated`
                transporter.sendMail(mailOptions,function(err,data){
                if(err){
                    console.log('error',err)
                } else {
                    console.log('email sent')
                }
            })
        })
        .catch(err=>   console.log('customer, error',err)
        )
             
})
ticketSchema.post('findOneAndUpdate',function(next){
    const self = this // refers to user object, just before saving the function will be called    //next()
    Ticket.findById(self._conditions._id)
    .then(ticket=>{
        if(self._update.$set.isResolved){
            Customer.findById(ticket.customer)
            .then(customer=>{
                mailOptions.to = customer.email
                mailOptions.subject = 'Ticket Resolved'
                mailOptions.text = `Your ticket with Ticket ID:${ticket.code} has been resolved`
                      transporter.sendMail(mailOptions,function(err,data){
                    if(err){
                        console.log('error',err)
                    } else {
                        console.log('Resolved email sent')
                    }
                })
            })
            .catch(err=>   console.log('customer, error',err))
        }
    })
    
    
    
             
})



const Ticket = mongoose.model('Ticket',ticketSchema)

module.exports = Ticket