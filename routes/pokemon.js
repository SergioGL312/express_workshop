const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience) ";
        query += `VALUES ('${pok_name}','${pok_height}','${pok_weight}','${pok_base_experience}');`;
        const rows = await db.query(query);
        
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon inserted correctly"});
        }

        return res.status(500).json({ code: 500, message: "An error ocurred"});
    }
    return res.status(500).json({ code: 500, message: "Incomplete values"});
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query(`SELECT * FROM pokemon;`);
    return res.status(200).json({ code: 200, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 722) {
        const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id};`);
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon not found"});
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_name = '${name}';`);
    if (pkmn.length > 0) {
        return res.status(200).json({ code: 200, message: pkmn})
    }
    return res.status(404).json({ code: 404, message: 'Pokemon not Found'});
});

module.exports = pokemon;