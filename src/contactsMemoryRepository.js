const crypto = require('node:crypto');
const db = new Map();

// db.set('b5bb0f35-e7ff-4700-8921-e13c95fa8be9', {text: 'This is contact 1 text', id: 'b5bb0f35-e7ff-4700-8921-e13c95fa8be9'});
// db.set('15628bf8-a38c-48ad-8e49-cde1583bc4e1', {text: 'This is contact 2 text', id: '15628bf8-a38c-48ad-8e49-cde1583bc4e1'});

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
    },
    deleteById: (uuid) => db.delete(uuid),
    update: (contact) => db.set(contact.id, contact),

};

module.exports = repo;