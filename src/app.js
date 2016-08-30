import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import engines from 'consolidate';
// import favicon from 'serve-favicon';

import routes from './routes/index';
import users from './routes/test_parents';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('pug', engines.pug);

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', routes);
app.use('/test_parents', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
    err.status = 404;
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
    });
});

module.exports = app;
