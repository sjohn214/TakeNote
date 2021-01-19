var express = require("express");
var HTMLapiRoutes = require("./routes/HTMLapiRoutes");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/HTMLapiRoutes")(app);


app.listen(PORT, function(){
    console.log("App listening on port http://localhost:" +PORT);
});
