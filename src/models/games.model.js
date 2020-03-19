import idb from '@/api/idb'

export default {

    async getGames() {

        let db = await idb.getDb();

        return new Promise(resolve => {

            let trans = db.transaction(['games'], 'readonly');
            trans.oncomplete = () => {
                resolve(games);
            };

            let store = trans.objectStore('games');
            let games = [];

            store.openCursor().onsuccess = e => {
                let cursor = e.target.result;
                if (cursor) {
                    games.push(cursor.value)
                    cursor.continue();
                }
            };

        });
    },
    async saveGame(game) {

        let db = await idb.getDb();

        return new Promise(resolve => {

            let trans = db.transaction(['games'], 'readwrite');
            trans.oncomplete = () => {
                resolve(request.result);
            };

            let store = trans.objectStore('games');
            let request = store.put(game);

        });
    },
    async deleteGame(game) {

        let db = await idb.getDb();

        return new Promise(resolve => {

            let trans = db.transaction(['games'], 'readwrite');
            trans.oncomplete = () => {
                resolve();
            };

            let store = trans.objectStore('games');
            
            store.delete(game.id);
        });
    },

}