var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'IIT Contacts List', contacts: data } );
});

/* GET contacts add */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', { title: 'Add a Contact'} );
});

/* POST contacts add */
router.post('/add', function(req, res, next) {
  //console.log(req.body);
  if (!req.body.firstname || !req.body.lastname) {
    res.render('contacts_add', {title: 'Add a Contact', msg: 'Firstname and lastname are required!'});
  } else {
    contactsRepo.create({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email.trim(), 
      notes: req.body.notes.trim(),
      created_date: new Date()
    });
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

/* POST contacts edit */
router.post('/:uuid/edit', function(req, res, next) {
  const existingContact = contactsRepo.findById(req.params.uuid);
  //console.log(req.body);
  if (req.body.firstname.trim() === ''||req.body.lastname.trim() === ''||req.body.email.trim() === ''||req.body.notes.trim() === '') {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', {title: 'Edit Contact', msg: 'All fields can not be empty!', contact: contact});
  } else {
    const updatedContact = {
      id: req.params.uuid, 
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email.trim(), 
      notes: req.body.notes.trim(),
      created_date: existingContact.created_date,
      updated_date:new Date()
    };
    contactsRepo.update(updatedContact);
    res.redirect('/contacts');
  }
});

module.exports = router;
