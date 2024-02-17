const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const db = new Map();

//db.set('b5bb0f35-e7ff-4700-8921-e13c95fa8be9', {text: 'This is contact 1 text', id: 'b5bb0f35-e7ff-4700-8921-e13c95fa8be9'});
//db.set('15628bf8-a38c-48ad-8e49-cde1583bc4e1', {text: 'This is contact 2 text', id: '15628bf8-a38c-48ad-8e49-cde1583bc4e1'});

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach((element) => {
        db.set(element[0], element[1]);
    });
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            text: contact.text,
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