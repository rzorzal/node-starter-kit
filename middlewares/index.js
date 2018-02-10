var middlewares = require('require-dir-all')('./',{
    recursive: true,
    indexAsParent: true
});

module.exports = middlewares;
