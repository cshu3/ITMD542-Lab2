var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'Express Contacts', contacts: data } );
});

/* GET contacts add */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', { title: 'Add a Contact'} );
});

/* POST contacts add */
router.post('/add', function(req, res, next) {
  //console.log(req.body);
  if (req.body.contactText.trim() === '') {
    res.render('contacts_add', {title: 'Add a Contact', msg: 'Contact text can not be empty!'});
  } else {
    contactsRepo.create({text: req.body.contactText.trim()});
    res.redirect('/contacts');
  }
});

/* GET a contact */
router.get('/:uuid', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contact', { title: 'Your Contact', contact: contact} );
  } else {
    res.redirect('/contacts');
  }
  
});

/* GET contacts delete */
router.get('/:uuid/delete', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', { title: 'Delete Contact', contact: contact} );
});

/* POST contacts delete */
router.post('/:uuid/delete', function(req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

/* GET contacts edit */
router.get('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit Contact', contact: contact} );
});

/* POST contacts add */
router.post('/:uuid/edit', function(req, res, next) {
  //console.log(req.body);
  if (req.body.contactText.trim() === '') {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', {title: 'Edit Contact', msg: 'Contact text can not be empty!', contact: contact});
  } else {
    const updatedContact = {id: req.params.uuid, text: req.body.contactText.trim()};
    contactsRepo.update(updatedContact);
    res.redirect('/contacts');
  }
});

module.exports = router;
