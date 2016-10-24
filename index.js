const express = require('express');
const app = express();
const chalk = require('chalk');
const exstatic  = require('express-static');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
// const routes = require('./routes/routes.js');
const multer = require('multer');
const http = require('http');
const https = require('https');
const fs = require('fs');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(exstatic(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

app.get('/', function (req,res) {
    res.redirect('/upload');
});

app.get('/upload', function (req,res) {
    res.render('upload');
});

app.post('/upload', uploader.single('file'), function(req, res) {
    if (req.file) {
        console.log(req.file);
        res.json({
            success: true,
            file: '/uploads/' + req.file.filename
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post('/fromurl', function(req, res) {
    var url = req.body.imgurl;
    var protocol = url.split('/').shift();
    var filename = Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + url.split('/').pop();
    var file = fs.createWriteStream(__dirname + '/public/uploads/' + filename);
    if (protocol == 'https:') {
        https.request(url);
        https.get(url, function(response) {
            response.pipe(file);
        });
    } else {
        http.request(url);
        http.get(url, function(response) {
            response.pipe(file);
        });
    }
    res.render('upload', {
        url: '/uploads/' + filename
    });
});

app.listen(8080, function () {
    console.log(chalk.blue('Listening on port 8080!'));
});
