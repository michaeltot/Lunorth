'use strict';

var _ = require('lodash');
var Ticket = require('./ticket.model');

// Get list of tickets
exports.index = function (req, res) {
    Ticket.find()
        .populate('owner')
        .exec(function (err, tickets) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(tickets);
        });
};

// Get a single ticket
exports.show = function (req, res) {
    Ticket.findOne({
            _id: req.params.id
        })
        .populate('owner')
        .exec(function (err, ticket) {
            if (err) {
                return handleError(res, err);
            }
            if (!ticket) {
                return res.status(404).send('Not Found');
            }
            return res.json(ticket);
        });
};

// Get a tickets based on owner
exports.getByOwner = function (req, res) {
    var ownerId = req.params.id;

    Ticket.find()
        .where('owner').equals(ownerId)
        .populate('owner')
        .exec(function (error, items) {
            if (error) {
                return handleError(res, error);
            }

            if (!items) {
                return res.status(404).send('Not Found');
            }

            return res.json(items);
        });
};

// Get a tickets based on group
exports.getByGroup = function (req, res) {
    var id = req.params.id;

    Ticket.find()
        .where('payGroup').equals(id)
        .populate('owner')
        .exec(function (error, items) {
            if (error) {
                return handleError(res, error);
            }

            if (!items) {
                return res.status(404).send('Not Found');
            }

            return res.json(items);
        });
};

// Creates a new ticket in the DB.
exports.create = function (req, res) {
    Ticket.create(req.body, function (err, ticket) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(ticket);
    });
};

// Updates an existing ticket in the DB.
exports.update = function (req, res) {
    console.log('id : ', req.params.id);
    
    if (req.body._id) {
        delete req.body._id;
    }
    Ticket.findById(req.params.id, function (err, ticket) {
        if (err) {
            return handleError(res, err);
        }
        if (!ticket) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(ticket, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(ticket);
        });
    });
};

// Deletes a ticket from the DB.
exports.destroy = function (req, res) {
    Ticket.findById(req.params.id, function (err, ticket) {
        if (err) {
            return handleError(res, err);
        }
        if (!ticket) {
            return res.status(404).send('Not Found');
        }
        ticket.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}