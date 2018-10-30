var jwt = require('jsonwebtoken');

const user = {
  id: 1,
  username: 'abdul',
  email: 'abdul@gmail.com'
}

const token = jwt.sign({user}, 'key', (err, token) => {
  // console.log(token);
});
