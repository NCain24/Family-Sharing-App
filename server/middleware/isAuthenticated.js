require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get('authorization');
    console.log(headerToken);
    if (!headerToken) {
      console.log('ERROR IN auth middleware');
      res.sendStatus(401);
    }

    // const token = req.headers.authorization.split(' ')[1];
    // jwt.verify(token, SECRET);
    // console.log(token)

    let token = jwt.verify(headerToken, SECRET)

    if (!token) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }

    next();
  },
};
