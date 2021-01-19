var savedData = require("../db/savedData");

var router = require("express").Router();
var notes = JSON.parse(savedData);

// API Route set-up//

router.get("/api/notes", function (req, res){
    res.json(notes);
    }).catch(err => {
        res.status(500).json(err);
    });
    // will read the db.json content and return save notes in JSON//

router.post("/api/notes", function (req, res) {
    savedData.addNote(req.body).then( (note) => {
        res.json(note);
        updateDb();
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    //will set-up api post route and receive any newly added note. Adds as db.json and returns the added note.//
})

router.get("/api/notes/:id", function (req, res){
    res.json(notes[req.params.id]);
});
// will allow for retreiving of note with specific id.//

router.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    updateDb();
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    //will allow for the deletion of note with specific id.//
module.exports = router;