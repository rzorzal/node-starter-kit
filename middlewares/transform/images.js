var md5 = require('md5');
var moment = require('moment');

module.exports = function transfomImageCacheFactory(filenameContext){
    return function transfomImageCacheMiddleware(req, res, next){
        if(!req.contexto) req.contexto = {};

        if(!req.contexto.transform){
            req.contexto.transform = {};
        }

        req.contexto.transform.images = {};

        var fileBase64 = req.body[filenameContext];
        if(fileBase64){
            fileBase64 = fileBase64.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');

            var filename = md5(filenameContext + moment().format("DD/MM/YYYY HH:mm:ss")) + ".jpeg";
            var uploadfilename = "/uploads/" + filename;
            var filePath = process.cwd() + "/public" + uploadfilename;

            require("fs").writeFile(filePath, fileBase64, 'base64', function(err) {
                console.log(err);
                if(err){
                    next(err);
                    return;
                }

                req.contexto.transform.images[filenameContext] = filePath;
                next();
            });

        } else {
            next();
        }
    }
}
