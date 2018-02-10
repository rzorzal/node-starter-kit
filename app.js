var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var accounting = require("accounting");
var helmet = require("helmet");
var RestFactory = require("./factories/restFactory");
var models = require('./models');

var app = express();

app.use(helmet());

var FileStore = require('session-file-store')(session);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(fileUpload());
var moment = require('moment');
var middlewares = require('./middlewares');
moment.locale("pt-br");
app.locals.moment = moment;
app.locals.accounting = accounting;
app.locals.components = {
    cnh: require("./utils/components/cnh"),
    estadoCivil: require("./utils/components/estado.civil"),
    estados: require("./utils/components/estados"),
    formaPagamento: require("./utils/components/forma.pagamento"),
    meioPagamento: require("./utils/components/meio.pagamento"),
}
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    secret: "YOUR SECRET HERE",
    resave: false,
    saveUninitialized: true
}));

var rest = RestFactory({
    sequelize: models.sequelize,
    app: app
})(function(req, res, next){
    //REST SECURITY FUNCTION
    next();
});



var index = require('./routes/index');



app.use('/', index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var scope = {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
        layout: 'layouts/error'
    };
    res.render('error/error', scope);
});


module.exports = app;
