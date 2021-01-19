var path = require("path");
var fs = require("fs");
var router = require("express").Router();
// var util = require("util");
var uuid = require("uuid/v1");

// var readFileAsync = util.promisify(fs.readFile);
// var writeFileAsync = util.promisify(fs.writeFile);

fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});
var notes = require("../db/db.json");

// class savedData {
//     read() {
//         return readFileAsync("db/db.json", "utf8");
//     }
//     write(note) {
//         return writeFileAsync("db/db.json", JSON.stringify(note));
//     }
//     getNotes() {
//         return this.read().then(function (notes) {
//             var parsedNotes
//             try {
//                 parsedNotes = [].concat(JSON.parse(notes));
//             } catch (err) {
//                 parsedNotes = [];
//             }
//             return parsedNotes;
//         })
//     }
//     addNote(note) {
//         var {title, text} = note;
//         var newNote = {title, text, id: uuid()};
//         return this.getNotes().then(function(notes) {
//             return[...notes, newNote]
//         }).then((updatedNotes)=> { 
//             console.log(updatedNotes);
//            this.write(updatedNotes);
//         }).then(function() {
//             newNote;
//         })
//     }
// }


// HTML route set-up//

router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

function updateDbfile(){
    fs.writeFile("db/db.json", JSON.stringify(notes, '\t'),err =>{
        if(err)throw err;
        return true;
    });
}
//will update the db.json with any changes to application files: i.e. additions or deletions.//


// API Route set-up//

router.get("/api/notes", function (req, res){
    res.json(notes);
    });
    // will read the db.json content and return save notes in JSON//

router.post("/api/notes", function (req, res) {
    var {title, text} = req.body;
    var newNote = {title, text, id: uuid()};
    notes.push(newNote);
        updateDbfile();
        res.json(notes);
    });
    //will set-up api post route and receive any newly added note. Adds as db.json and returns the added note.//

// router.get("/api/notes/:id", function (req, res){
//     res.json(notes[req.params.id]);
// });
// // will allow for retreiving of note with specific id.//

router.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    updateDbfile();
    });
    //will allow for the deletion of note with specific id.//
    
router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
    });
module.exports = router;