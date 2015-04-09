var express = require('express');
var app = express();
var instagram = require('instagram-node').instagram();
var port = Number(process.env.PORT || 3000);
var secrets = require('./secrets.json');

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