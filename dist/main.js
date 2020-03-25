var express = require('express');
var app = express();
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
//# sourceMappingURL=main.js.map