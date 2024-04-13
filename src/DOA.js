import fs from "node:fs/promises";

const DB_PATH = new URL("../database.json", import.meta.url).pathname.substring(1);

export const getDb = async () => {
    const result = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(result)
};

export const saveDb = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export const insertData = async (note) => {
    const db = await getDb();
    db.records.push(note);
    await saveDb(db);
}


