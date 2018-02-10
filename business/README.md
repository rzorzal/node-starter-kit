# BUSINESS folder

Here you can store your Business Rules and separete from the other modules.

## Importing this module

```javascript
const Business = require(`${process.cwd()}/business`);
```

## Developing

Your code need to be like this:

```javascript
module.exports = function(req){
    return async function(){
        return true;
    }
}
```
