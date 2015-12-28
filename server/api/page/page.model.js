'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
    page: {
        type: String,
        lowercase:true,
        required: true
    },
    content: {
        dansk: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        },
        deutsch: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Page', PageSchema);