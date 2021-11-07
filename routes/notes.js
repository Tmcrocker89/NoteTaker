const notes = require('express').Router();
const path = require('path');
const db = require('../db/db.json')
const { v4: uuidv4 } = require('../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs')


notes.get('/', (req, res) => 
{
  readFromFile(path.join(__dirname, '../db/db.json')).then((data) =>
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
    readAndAppend(note, path.join(__dirname, '../db/db.json'));
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
  console.log(id)
  console.log(id);
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8' , (err, data) => 
  {
    if (err)
    {
      console.error(err)
    }
    else
    {
      let notesDB = JSON.parse(data);
      console.log(notesDB.length)
      for(let i = 0; i < notesDB.length; i++) 
      {
        console.log(notesDB[i].id)
        
        // console.log(i)
        if(notesDB[i].id == id)
        {         
          console.log('found')
          notesDB.splice(i, 1)
          writeToFile(path.join(__dirname, '../db/db.json'), notesDB)
        }
      };
    }
  })

  
  

});

module.exports = notes;
