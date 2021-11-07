const notes = require('express').Router();
const path = require('path');
const db = require('../db/db.json')
const { v4: uuidv4 } = require('../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs')


notes.get('/', (req, res) => 
{
  console.log('./db/db.json')
  readFromFile('db/db.json').then((data) =>
  res.json(JSON.parse(data))
  );
});


notes.post('/', (req, res) => 
{
  const { title, text} = req.body
  let note = 
  {
    title: title,
    text: text,
    id: uuid()
  }
  if (title, text) 
  {
    readAndAppend(note,'./db/db.json');
    res.json(`note added 🔧`);
  } else 
  {
    res.json(
    {
      message: 'Note not filled out correctly'     
    });
  }
});


notes.delete('/:id', (req, res) => 
{
  let id = req.param('id')
  fs.readFile('./db/db.json', 'utf8' , (err, data) => 
  {
    if (err)
    {
      console.error(err)
      res.json('Note not deleted')
    }
    else
    {
      let notesDB = JSON.parse(data);
      for(let i = 0; i < notesDB.length; i++) 
      {
        if(notesDB[i].id == id)
        {         
          console.log('found')
          notesDB.splice(i, 1)
          writeToFile('./db/db.json', notesDB)
          res.json('Note Deleted')
        }
      };
    }
  })

  
  

});

module.exports = notes;
