var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
// var htmlRoutes = require("./routes/htmlRoutes");
// var apiRoutes = require("./routes/apiRoutes");
// app.use(htmlRoutes);
// app.use(apiRoutes);

// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function(){
    console.log("App listening on port http://localhost:" +PORT);
});
