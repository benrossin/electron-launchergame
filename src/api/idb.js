const DB_NAME = 'launchergame';
const DB_VERSION = 1;
let DB;

export default {

    async getDb() {
        return new Promise((resolve, reject) => {

            if (DB) {
                return resolve(DB);
            }
            let request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = e => {
                reject('Error' + e);
            };

            request.onupgradeneeded = e => {
                let db = e.target.result;
                let objectStore = db.createObjectStore("games", {
                    autoIncrement: true,
                    keyPath: 'id'
                })
                objectStore.createIndex("name", "name", {unique: false})
                objectStore.createIndex("path", "path", {unique: false})
                objectStore.createIndex("img", "img", {unique: false})
                objectStore.createIndex("date", "date", {unique: false})
            };

            request.onsuccess = e => {
                DB = e.target.result;
                resolve(DB);
            };
        });
    }

}