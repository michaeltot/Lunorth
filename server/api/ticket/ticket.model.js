'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
    owner: { 
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    information: {
        reservationNumber: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    payGroup: {
        type: String,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    },
    ticketSend: {
        type: Boolean,
        default: false
    }
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Ticket', TicketSchema);