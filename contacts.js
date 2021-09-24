const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    let contacts = JSON.parse(response);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    let contacts = JSON.parse(response).find((el) => el.id === contactId);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    let contacts = JSON.parse(response).filter((el) => el.id === contactId);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

function addContact(name, email, phone) {
  // ...твой код
}
// listContacts().then((res) => {
//   console.log(res);
// });
// getContactById(1).then((res) => {
//   console.log(res);
// });
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
