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

    db.run(`
        CREATE TABLE IF NOT EXISTS listas_compartilhadas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            share_code TEXT UNIQUE NOT NULL,
            movie TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Tabela listas_compartilhadas criada com sucesso!");
        }
    });
});