module.exports = function uploadImageCacheFactory(filenameContext){
    return function uploadImageCacheMiddleware(req, res, next){
        if(!req.contexto) req.contexto = {};

        var file = req.files[filenameContext];
        if(file){
            var now = new Date();
            var filename = "/uploads/" + now.getTime() + file.name;
            var filePath = process.cwd() + "/public" + filename;
            file.mv(filePath, function(err){
                if(err){
                    next(err);
                    return;
                }

                var objectContext = {
                    path: filePath,
                    filename: filename,
                    image: file
                };

                req.contexto.uploads = {
                    images: {}
                }
                req.contexto.uploads.images[filenameContext] = objectContext;
                next();
            });
        } else {
            req.contexto.uploads = {
                images: {}
            }
            next();
        }
    }
}
