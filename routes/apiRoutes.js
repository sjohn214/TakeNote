var savedData = require("../db/savedData");

var router = require("express").Router();


router.get("/notes", function (req, res){
    savedData.getNotes(req.body).then( (notes) => {
        console.log(getNotes);
        res.json(notes);
    }).catch(err => {
        res.status(500).json(err);
    });
})
router.post("/notes", function (req, res) {
    savedData.addNote(req.body).then( (note) => {
        res.json(note);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
router.delete("/api/notes/:id", (req, res) => {
    savedData.removeNotes(req.id).then((note) => {
        res.json(note);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
module.exports = router;