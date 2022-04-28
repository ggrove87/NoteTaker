const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/', (req, res) => {
    const {noteTitle, noteText} = req.body;

    if (noteTitle && noteText) {
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
    } else {
        res.error('Error in adding note')
    }
  })

  module.exports = notes;