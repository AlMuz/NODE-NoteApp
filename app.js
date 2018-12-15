const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
  describe: 'Type of note',
  demand: true,
  alias: 't'
};

const argv = yargs
  .command('add','Add a new note', {
    title: titleOptions,
    body: {
      describe: 'Body of note',
      demand: true,
      alias: 'b'
    }
  })
  .command('list','List all notes')
  .command('read','Read a note', {
    title: titleOptions,
  })
  .command('remove','Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {

  var note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log('Note created');
    notes.renderNote(note);
  }else {
    console.log('Note title taken');
  }
} else if (command === 'list') {

  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes.`);
  allNotes.forEach((note) => {
    notes.renderNote(note);
  })
} else if (command === 'read') {

  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.renderNote(note);
  }else {
    console.log('Note not found');
  }
} else if (command === 'remove') {

  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note wasnt removed';
  console.log(message);
} else {
  console.log('Command not recognized');
}
