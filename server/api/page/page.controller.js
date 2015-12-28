'use strict';

var _ = require('lodash');
var Page = require('./page.model');

// Get list of pages
exports.index = function (req, res) {
    Page.find(function (err, pages) {
        if (err) {
            return handleError(res, err);
        }
        
        if(pages.length === 0){
            return populate(res);
        }
        
        return res.status(200).json(pages);
    });
};

// Get a single page
exports.show = function (req, res) {
    Page.findById(req.params.id, function (err, page) {
        if (err) {
            return handleError(res, err);
        }
        if (!page) {
            return res.status(404).send('Not Found');
        }
        return res.json(page);
    });
};

// Get a single page
exports.getByPage = function (req, res) {
    console.log('id : ', req.params.page);
    var pageId = req.params.page;
    
    Page.findOne({
        page: pageId
    }, function(err, result){
        if(err){
            return handleError(res, err);
        }
        if(!result){
            req.body = generateDbItems(pageId);
            
            return create(req, res);
            //return res.status(404).send('Not Found');
        }
        return res.json(result);
    });
};

// Creates a new page in the DB.
exports.create = function (req, res) {
    Page.create(req.body, function (err, page) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(page);
    });
};

// Updates an existing page in the DB.
exports.update = function (req, res) {
    console.log('id : ', req.params.id);
    
    if (req.body._id) {
        delete req.body._id;
    }
    Page.findById(req.params.id, function (err, page) {
        if (err) {
            return handleError(res, err);
        }
        if (!page) {
            return res.status(404).send('Not Found');
        }
        
        var updated = _.extend(page, req.body);
        
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(page);
        });
    });
};

// Deletes a page from the DB.
exports.destroy = function (req, res) {
    Page.findById(req.params.id, function (err, page) {
        if (err) {
            return handleError(res, err);
        }
        if (!page) {
            return res.status(404).send('Not Found');
        }
        page.remove(function (err) {
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

function create(req, res){
    Page.create(req.body, function (err, page) {
        if (err) {
            console.log('error : ', err);
            return handleError(res, err);
        }
        console.log('result create : ', page)
        return res.status(201).json(page);
    });
};

function populate(res){
    Page.create(generateDbItems('index'),
                generateDbItems('rules'),
                generateDbItems('concept'),
                generateDbItems('introduction'),
                generateDbItems('tournament'),
                generateDbItems('characters'),
                generateDbItems('world'),
    function(err, items) {
        if (err) {
            console.log('error : ', err);
            return handleError(res, err);
        }
        return res.status(201).json(items);
    });
};

function generateDbItems(pageName){
    return {
        page: pageName,
        content: {
            dansk: pageName + ': dansk',
            english: pageName + ': english',
            deutsch: pageName + ': deutsch'
        }
    };
};