const express = require("express");
const app = express();

app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});
// app.get('*.css', function(req, res, next) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'text/css');
//     next();
// });

app.use('/', express.static('./build'));

app.listen(process.env.PORT || 3000);
