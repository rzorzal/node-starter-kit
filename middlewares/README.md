# MIDDLEWARES folder

Here you can store your Middlewares Rules and separete from routers.

## Importing this module

```javascript
const Middleware = require(`${process.cwd()}/middleware`);
```

## Developing

Your code need to be like this:

```javascript
module.exports = function allowCrossOriginFactory(){
    return function allowCrossOrigin(req, res, next){
        req.context['middleware-name'] = {};
        next();
    }
}

```
