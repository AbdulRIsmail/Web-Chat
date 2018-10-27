var express = require('express');
var colors = require('colors');
var port = process.env.PORT || 3000;
var app = express();

module.exports.server = server = app.listen(port, () => {
    console.log(`Listening To Port ${port}`)
});

// Static Files - make them global and work within express
app.use(express.static('public/views'));
app.use(express.static('public/'));
app.set("view engine", "html")


app.get('/createroom', (req, res) => {
  res.sendFile(__dirname + "/public/views/chat.html");
})
