const db = require("../database/database");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movie_id INTEGER NOT NULL UNIQUE,
            title TEXT NOT NULL,
            poster_path TEXT,
            overview TEXT,
            vote_average REAL,
            release_date TEXT
        )
    `,(err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Successfully create");
        }
    });
});