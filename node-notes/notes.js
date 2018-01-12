const fs = require('fs');
const _ = require('lodash');
const uuidv1 = require('uuid/v1');

retrieveNotes = function (cb) {
    var notes = [];
    fs.exists('./data/notes-data.json', (exists) => {
        if (exists) {
            fs.readFile('./data/notes-data.json', (err, data) => {
                if (err) {
                    throw err
                }
                notes = JSON.parse(data)
                cb(notes);
            })
        } else {
            var notes = [];
            fs.writeFile('./data/notes-data.json', notes, (err) => {
                if (err) {
                    throw err;
                } else {
                    cb(notes);
                }
            })
        }
    })

}

writeNotes = function (notes) {
    console.log('saving notes:', notes);
    console.log('notes not null', notes !== null);
    console.log('notes size', notes.length >= 1);

    if (notes !== null) {
        fs.writeFile('./data/notes-data.json', JSON.stringify(notes), (err) => {
            if (err) {
                throw err;
            }
        })
    }
}

var addNote = (title, body) => {
    retrieveNotes((notes) => {
        console.log('current notes: ', notes);
        containsDuplicates = notes.filter((x) => x.note.title === title);
        console.log('current duplicates: ', containsDuplicates);

        if (containsDuplicates.length > 0) {
            console.log(`title is a duplicate: `, title, body)
            throw 'duplicates';
        } else {
            var guid = uuidv1().toString();
            notes.push({
                note: {
                    guid: guid,
                    title: title,
                    body: body
                }
            });
            writeNotes(notes);
            console.log(`adding note: `, title, body)
        }
    });
}

var getAll = () => {
    retrieveNotes((notes) => {
        notes.forEach(function (element) {
            console.log(`Title: ${element.note.title}, body ${element.note.body}`)
        }, this);
    });
    console.log('getting all notes');
}

var readNote = (title, cb) => {
    retrieveNotes((notes) => {
        var result = notes.filter((x) => x.note.title === title)[0];
        console.log("result =", result);
        cb(result)
    });
}

var removeNote = (title, cb) => {
    retrieveNotes((notes) => {
        var result = notes.filter((x) => x.note.title === title);
        var notes = notes.filter((x) => x.note.title !== title);
        writeNotes(notes);
        cb(result)
    });
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote
}