'use strict';

var express = require('express');
var controller = require('./ticket.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/owner/:id', controller.getByOwner);
router.get('/group/:id', controller.getByGroup);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;