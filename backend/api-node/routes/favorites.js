const express = require('express');
const db = require('../database/database.js');
const router = express.Router();


router.post('/favorites', (req, res) => {
    const { movie_id, title, poster_path, overview, vote_average, release_date } = req.body;
    const query = `
        INSERT INTO favorites (movie_id, title, poster_path, overview, vote_average, release_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [movie_id, title, poster_path, overview, vote_average, release_date], function(err){
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

router.delete('/favorites/:id', (req, res) => {
    const { id } = req.params; // Recebendo o ID do favorito diretamente como parâmetro

    // Remover o favorito diretamente pelo ID
    const deleteQuery = `DELETE FROM favorites WHERE id = ?`;
    db.run(deleteQuery, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ deleted: this.changes });
    });
});


router.get('/favorites', (req, res) => {
    const query = `SELECT * FROM favorites`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});
module.exports = router;