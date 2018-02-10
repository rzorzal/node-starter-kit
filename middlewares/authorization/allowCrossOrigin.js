module.exports = function allowCrossOriginFactory(){
    return function allowCrossOrigin(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEADERS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    }
}
