/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from 'winston';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

// import configurations
import configTemplateEngine from '@s-config/template-engine';

// importar webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// Consultar el modo en que se esta ejecutando la aplicación
const env = process.env.NODE_ENV || 'development';

// se crea la aplicacion express
const app = express();

// verificando el modo de ejecucion de la aplicacion
if (env === 'development') {
  console.log('>Excecuting in Development Mode: Webpack Hot Reloading');
  // agregando ruta del HMR
  // reload = true Habilita la recarga del frontend cuando hay cambios en el codigo fuente del frontend
  // timeout=1000: tiempo de espera y recarga de la pagina
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackDevConfig.entry,
  ];
  // agregamos plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Crear el compilador de webpack
  const compiler = webpack(webpackDevConfig);
  // Agregando middleware a la cadena de middlewares de nuestra aplicacion
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    })
  );
  // agregando webpack a Hot Middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('Excecuting in Production Mode');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
