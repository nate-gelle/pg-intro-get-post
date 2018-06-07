const express = require('express');
const router = express.Router();
// Require connection to db
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('In songs-router GET to read');
    res.sendStatus(201);
});

router.post('/', (req, res) => {
    console.log('In songs-router POST to add');
    res.sendStatus(201);
});

router.put('/', (req, res) => {
    console.log('In songs-router PUT to update');
    res.sendStatus(201);
});

router.delete('/', (req, res) => {
    console.log('In songs-router DELETE to delete');
    res.sendStatus(201);
});

module.exports = router;