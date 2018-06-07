const express = require('express');
const router = express.Router();
// Require connection to db
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('In songs-router GET to read');
    const queryText = 'SELECT * FROM songs';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error getting all songs: ', err);
            res.sendStatus(500);
        })
    // res.sendStatus(200);
});

router.post('/', (req, res) => {
    console.log('In songs-router POST to add');
    const newSong = req.body;
    const queryText = 'INSERT INTO songs (artist, track, published, rank) VALUES($1, $2, $3, $4)';
    pool.query(queryText, [newSong.artist, newSong.track, newSong.published, newSong.rank])
        .then((results) => {
            console.log('Successful addition of song', results);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error in adding song:', err);
            res.sendStatus(500);
        })
});

router.put('/:id', (req, res) => {
    console.log('In songs-router PUT to update');
    let id = req.params.id;
    const queryText = `UPDATE songs SET rank=$2, artist=$3, track=$4, published=$5 WHERE id=$1`;
    console.log(queryText);
    pool.query(queryText, [id, req.body.rank, req.body.artist, req.body.track, req.body.published])
        .then((results) => {
            console.log('Successful update of song', results);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.delete('/:id', (req, res) => {
    console.log('In songs-router DELETE to delete');
    let id = req.params.id;
    const queryText = 'DELETE FROM songs WHERE id=$1';
    // passing two things to the query. 1) the query text
    // 2) the cvalues to sub into thw query for $1, $2, etc
    // when subbing multiple thingg, the order is important
    pool.query(queryText, [id])
        .then((results) => {
            console.log('Successful delete of song', results);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error getting all songs: ', err);
            res.sendStatus(500);
        })
});

module.exports = router;