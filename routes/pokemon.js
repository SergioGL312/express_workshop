const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query(`SELECT * FROM pokemon;`);
    return res.status(200).json(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id};`);
    (id >=0 && id <= 25) ?
        res.status(200).json(pkmn) :
        res.status(404).send("Pokemon not found");
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_name = '${name}';`);
    (pkmn.length > 0) ? 
        res.status(200).json(pkmn) : 
        res.status(404).send('Pokemon not Found');
});

module.exports = pokemon;