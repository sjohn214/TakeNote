var path = require("path");
var router = require("express").Router();
// module.exports = function(app) {

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







// }
module.exports = router;