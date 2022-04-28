const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/', (req, res) => {
    const {title, textArea} = req.body;

    if (title && textArea) {
        const newNote = {
            title,
            textArea,
            note_id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
    }
  })

  module.exports = notes;