console.log('app.js start:::::');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const argsv = yargs
    .command('add', 'Adding a note', {
        title: titleOptions,
        body: {
            describe: 'body of the note',
            demand: true,
            alias: 'b'
        }
    })
    .command('remove', 'deletes a note', {
        title: titleOptions
    })
    .command('list', 'lists all notes', {})
    .command('read', 'reads a note', {
        title: titleOptions
    })
    .help()
    .argv;

let command = yargs.argv._[0]

if (command === 'add') {
    notes.addNote(argsv.title, argsv.body)
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.readNote(argsv.title, (result) => {
        console.log('reading note', result);
    });
} else if (command === 'remove') {
    notes.removeNote(argsv.title, (result) => {
        console.log(`removing note: ${result[0].note.title}`)
    });
} else {
    console.log('command not recognized');
    process.exit(0);
}