import { getDb, insertData, saveDb } from "./DOA.js";

export const newRecord = (note) => {
  const data = {
    id: Date.now(),
    content: note,
  };

  insertData(data);
};

export const find = async (filter) => {
  const { records } = await getDb();
  return records.filter(({ content }) => {
    return content.toLowerCase().includes(filter.toLowerCase());
  });
};

export const remove = async (id) => {
    const db = await getDb();
    const match = db.records.find((record) => record.id === +id);

    if (match) {
        const newDb =  db.records.filter((record) => {
            return record.id !== +id;
        })
        db.records = newDb;
        await saveDb(db);
        return id;
    } else {
        console.log('Record not deleted');
    }
}
