/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model'),
    Page = require('../api/page/page.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Michael Tot Korsgaard',
    email: 'totkorsgaard@gmail.com',
    password: '147896325'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Page.find({}).remove(function(){
    Page.create({
        page: 'index',
        content: [
            {
                language: 'dansk',
                title: 'forside',
                content: '<h1>Lunorth Turneringen</h1><p>Test</p>'
            },
            {
                language: 'english',
                title: 'home',
                content: '<h1>The Lunorth Tournament</h1><p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'willkommen',
                content: '<h1>Die Lunorth Turnier</h1><p>Test</p>'
            }
        ]
    },
    {
        page: 'rules',
        content: [
            {
                language: 'dansk',
                title: 'regler',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'rules',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'regeln',
                content: '<p>Test</p>'
            }
        ]
    },
    {
        page: 'concept',
        content: [
            {
                language: 'dansk',
                title: 'koncept',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'concept',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'konzept',
                content: '<p>Test</p>'
            }
        ]
    },
    {
        page: 'introduction',
        content: [
            {
                language: 'dansk',
                title: 'introduktion',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'introduction',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'einführung',
                content: '<p>Test</p>'
            }
        ]
    },
    {
        page: 'tournament',
        content: [
            {
                language: 'dansk',
                title: 'turnering',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'tournament',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'turnier',
                content: '<p>Test</p>'
            }
        ]
    },
    {
        page: 'characters',
        content: [
            {
                language: 'dansk',
                title: 'helte & skurke',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'heroes & rogues',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'helden & schurken',
                content: '<p>Test</p>'
            }
        ]
    },
    {
        page: 'world',
        content: [
            {
                language: 'dansk',
                title: 'verdenen',
                content: '<p>Test</p>'
            },
            {
                language: 'english',
                title: 'the world',
                content: '<p>Test</p>'
            },
            {
                language: 'deutsch',
                title: 'die welt',
                content: '<p>Test</p>'
            }
        ]
    },
    function() {
        console.log('finished populating pages');
    });
});