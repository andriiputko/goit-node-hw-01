const data = require("./contacts");
const argv = require("yargs").argv;


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getAll":
      const all = await data.listContacts();
      console.log(all);
      break;

    case "getById":
      const one = await data.getContactById(id);
      console.log(one);
      break;

    case "add":
      const addContact = await data.addContact({ name, email, phone });
      return console.log(addContact);

    case "remove":
      const removeContact = await data.removeContact(id);
      return console.log(removeContact);
    default:
      console.log("Unknown action");
  }
};

invokeAction(argv);