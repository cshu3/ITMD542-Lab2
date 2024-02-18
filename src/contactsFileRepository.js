const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const db = new Map();

// db.set('b5bb0f35-e7ff-4700-8921-e13c95fa8be9', {text: 'This is contact 1 text', id: 'b5bb0f35-e7ff-4700-8921-e13c95fa8be9'});
// db.set('15628bf8-a38c-48ad-8e49-cde1583bc4e1', {text: 'This is contact 2 text', id: '15628bf8-a38c-48ad-8e49-cde1583bc4e1'});

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach((element) => {
        const currentContact = {
            id: element[0],
            firstname: element[1].firstname,
            lastname: element[1].lastname,
            email: element[1].email,
            notes: element[1].notes,
            created_date: element[1].created_date,
            updated_date: element[1].updated_date
          };
        db.set(element[0], currentContact);
    });
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db), null, 4);
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email,
            notes: contact.notes,
            created_date: new Date()
        };
        db.set(newContact.id, newContact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        
        db.set(contact.id, contact);
        saveData();
    },

};

loadData();

module.exports = repo;