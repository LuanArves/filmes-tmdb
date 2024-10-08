const express = require('express');
const db = require('../database/database.js');
const { v4: uuidv4 } = require('uuid');
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
    const { id } = req.params;

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

router.post('/favorites/share', (req, res) => {
    const { listName, movie } = req.body;
    const shareCode = uuidv4();
    const query = `
    INSERT INTO listas_compartilhadas (name, share_code, movie) 
    VALUES (?, ?, ?)
  `;
    const movieJSON = JSON.stringify(movie);

    db.run(query, [listName, shareCode, movieJSON], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const frontendBaseUrl = 'http://localhost:5173';
        const link = `${frontendBaseUrl}/api/favorites/share/${shareCode}`;

        console.log("Resposta que será enviada:", { link, shareCode });
        res.status(201).json({ link, shareCode });
    });
});

router.get('/favorites/share/:shareCode', (req, res) => {
    console.log("Rota GET /favorites/share/:shareCode chamada!");
    const shareCode = req.params.shareCode;
    const query = `SELECT * FROM listas_compartilhadas WHERE share_code = ?`;
    db.get(query, [shareCode], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            console.log("Resposta completa:", JSON.stringify({ listName: row.name, movie: JSON.parse(row.movie) }));
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                listName: row.name,
                movie: JSON.parse(row.movie)
            });
        } else {
            res.status(404).json({ error: 'List not found' });
        }
    });
});

module.exports = router;