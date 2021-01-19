var savedData = require("../db/savedData");
var path = require("path");
var router = require("express").Router();



fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});
var notes = JSON.parse(data);

// HTML route set-up//

router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
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
    }).catch(err => {
        res.status(500).json(err);
    });
    // will read the db.json content and return save notes in JSON//

router.post("/api/notes", function (req, res) {
    savedData.addNote(req.body).then( (note) => {
        res.json(note);
        updateDbfile();
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
    updateDbfile();
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    //will allow for the deletion of note with specific id.//
    
module.exports = router;