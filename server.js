var express = require('express');
var app = express();
var instagram = require('instagram-node').instagram();
var port = Number(process.env.PORT || 3000);
var secrets = require('./secrets.json');
var insta = require('instagram').createClient(secrets.client_id, secrets.client_secret);
var ig = require('instagram-node-lib');
var helpers = require('express-helpers')(app);
var result;

ig.set('client_id', secrets.client_id);
ig.set('client_secret', secrets.client_secret);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

instagram.use({
    client_id: secrets.client_id,
    client_secret: secrets.client_secret
});

app.get('/', function(req, res) {
    instagram.media_popular(function(err, medias, remaining, limit) {
        res.render('pages/index', { grams: medias });
        // console.log(medias[0].id);
    });
});

app.get('/insta', function(req, res) {
    instagram.media_popular(function(err, medias, remaining, limit) {
        res.render('pages/insta.ejs', { grams: medias });
        console.log(medias);
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log('error');
    } else {
        console.log('listen server on port ' + port);
    }
});
