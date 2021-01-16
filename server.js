var express = require("express");
var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);
// routes

// app.use(htmlRoutes);
// app.use(apiRoutes);

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);


app.listen(PORT, function(){
    console.log("App listening on port http://localhost:" +PORT);
});
