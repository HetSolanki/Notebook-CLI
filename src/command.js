import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { find, newRecord, remove } from "./utility.js";
import { getDb, saveDb } from "./DOA.js";

const listRecords = (records) => {
  records.forEach(({id, content}) => {
    console.log('\n');
    console.log('id:', id);
    console.log('id:', content);
  })
}
yargs(hideBin(process.argv))
  .command(
    "add <note>",
    "add an record",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "Enter the note to keep it's record",
      });
    },
    async (argv) => {
      newRecord(argv.note);
    }
  )
  .command("find <filter>", "find an perticular record", (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description: "Enter the keyword to be used to seach an record",
      })
    },
    async argv => {
      const result = await find(argv.filter);
      listRecords(result);
    }
  )
  .command("remove <id>", "Removes an record", (yargs) => {
    return (
      yargs.positional("id", {
        type: "string",
        description: "Enter the id of the record to be deleted",
      })     
    )},
    async (argv) => {
      const id = await remove(argv.id);
      id ? console.log('Record Deleted') : console.log('Not Deleted');
    }
  )
  .command(
    "getAll",
    "Retrives all the record",
    () => {},
    async (argv) => {
      const result = await getDb();
      listRecords(result.records);
    }
  )
  .command(
    "clear",
    "Removes all the records",
    () => {},
    (argv) => {
      saveDb({"records": []})
    }
  )
  .demandCommand(1)
  .parse();
