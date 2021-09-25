const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(result);
    return contacts;
  } catch (error) {
    return new Error(error);
  }
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const result = await readContacts();
  const contacts = result.find((el) => el.id === Number(contactId));
  return contacts;
}

async function removeContact(contactId) {
  const result = await readContacts();
  const contacts = result.filter((el) => el.id !== Number(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result.find((el) => el.id === Number(contactId));
}

async function addContact(name, email, phone) {
  const result = await readContacts();
  try {
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    const contacts = JSON.stringify([...result, newContact], null, "\t");

    await fs.writeFile(contactsPath, contacts);
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
