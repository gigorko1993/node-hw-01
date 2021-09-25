const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table).catch(console.error);
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.log(chalk.blue("Contact successfully found"));
            console.log(contact);
          } else {
            console.log(chalk.yellow("Contact not found"));
          }
        })
        .catch(console.error);
      break;

    case "add":
      addContact(name, email, phone)
        .then((contact) => {
          console.log(
            chalk.blueBright(
              `Contact of ${contact.name} successfully add to phonebook`
            )
          );
        })
        .catch(console.error);

      break;

    case "remove":
      removeContact(id)
        .then((contact) => {
          console.log(
            chalk.magentaBright(`${contact.name} was deleted from phonebook`)
          );
        })
        .catch(console.error);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
