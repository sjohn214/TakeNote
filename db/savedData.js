var fs = require("fs");
var util = require("util");

var uuid = require("uuid/v1");

var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

class savedData {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    getNotes() {
        return this.read().then(function (notes) {
            var parsedNotes
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    addNote(note) {
        var {title, text} = note;
        var newNote = {title, text, id: uuid()};
        return this.getNotes().then(function(notes) {
            return[...notes, newNote]
        }).then((updatedNotes)=> { 
            console.log(updatedNotes);
           this.write(updatedNotes);
        }).then(function() {
            newNote;
        })
    }
}
module.exports = new savedData();