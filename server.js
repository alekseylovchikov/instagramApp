var express = require('express');
var app = express();
var instagram = require('instagram-node').instagram();
var port = Number(process.env.PORT || 3000);
var ig = require('instagram').createClient('14810652f76c423e9171e0c1933984f4', 'ac862344db1d40fab319f36734a11b8e');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

instagram.use({
    client_id: 'fd04713cd6ef4bd58af11b71167961fa',
    client_secret: '5a65ee065f1b4a7bb36e87611bedbcdd'
});

app.get('/', function(req, res) {
    instagram.media_popular(function(err, medias, remaining, limit) {
        res.render('pages/index', { grams: medias });
        console.log(medias);
    });
});

app.get('/another', function(req, res) {
    ig.media('svdmusic', function(images, error) {
        if(error) {
            res.send('ERROR!');
        } else {
            res.render('pages/insta', { pics: images });
        }
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log('error');
    } else {
        console.log('listen server on port ' + port);
    }
});