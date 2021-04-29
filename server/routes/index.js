var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Karla Enriquez', appName: 'WebApp' });
});

/*Agregando nueva ruta */
router.get('/greeting', function(req, res, next){
  res.send('Hola campeon del fullstack web')
})

/*Agregando nueva ruta 2 */
router.get('/prueba', function(req, res, next){
  res.status(200).json({message: 'Hola campeon del fullstack web'})
})

module.exports = router;
