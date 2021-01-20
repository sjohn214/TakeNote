var path = require("path");
var fs = require("fs");
var router = require("express").Router();
var uuid = require("uuid/v1");


fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});
var notes = require("../db/db.json");


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

router.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    updateDbfile();
    });
    //will allow for the deletion of note with specific id.//
    
router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
    });
module.exports = router;