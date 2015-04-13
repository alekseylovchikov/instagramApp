var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var port = Number(process.env.PORT || 3000);
var secrets = require('./secrets.json');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ig.use({
    client_id: secrets.client_id,
    client_secret: secrets.client_secret
});

app.get('/', function(req, res) {
    ig.media_popular(function(err, medias, remaining, limit) {
        res.render('pages/index', { grams: medias });
        console.log(medias);
    });
});

app.post('/', function(req, res){
    console.log(req.body.user.name);
    console.log(req.body.user.email);
});

app.listen(port, function(err) {
    if(err) {
        console.log('error');
    } else {
        console.log('listen server on port ' + port);
    }
});