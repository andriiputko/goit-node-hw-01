const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")
const contactsPath = path.join(__dirname, "db/contacts.json");
const updateContacts = async (contact) => 
await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  };
  
  const getContactById = async (id) => {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === id);
    return contact || null;
  };
  
  const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  
    const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
    };
  module.exports = {listContacts, getContactById, removeContact, addContact}


