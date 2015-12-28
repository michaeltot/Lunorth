/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ticket = require('./ticket.model');

exports.register = function(socket) {
  Ticket.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ticket.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ticket:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ticket:remove', doc);
}