var jwt = require('jsonwebtoken');

var cert = fs.readFileSync('private.key');
var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

console.log(token);
