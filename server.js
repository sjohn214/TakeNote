var express = require("express");
var HTMLapiRoutes = require("./routes/HTMLapiRoutes");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", HTMLapiRoutes);
app.use("/api", HTMLapiRoutes);
// routes

// app.use(htmlRoutes);
// app.use(apiRoutes);

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);


app.listen(PORT, function(){
    console.log("App listening on port http://localhost:" +PORT);
});
