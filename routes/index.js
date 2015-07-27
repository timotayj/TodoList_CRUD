var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var mongoose = require( 'mongoose' );
var Todos = mongoose.model( 'Todos' );
var  methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended:true}))

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
router.param('id', function(req, res, next, id) {
  //console.log('validating ' + id + ' exists');
  //find the ID in the Database
  mongoose.model('Todos').findById(id, function (err, todo) {
    //if it isn't found, we are going to repond with 404
    if (err) {
      console.log(id + ' was not found');
      res.status(404)
      var err = new Error('Not Found');
      err.status = 404;
      res.format({
        html: function(){
          next(err);
        },
        json: function(){
          res.json({message : err.status  + ' ' + err});
        }
      });

    } else {

      req.id = id;

      next();
    }
  });
});


router.route('/')
    .get(function(req,res,next){
      Todos.find({Todos: Todos}, function (err, Todos) {
        if (err){
          return console.error(err);
        }else{
          res.format({
            html: function(){
              res.render('index',{
                title : 'To Dos',
                'Todos' : Todos

              });

            },
            json:function(){
              res.json(infophotos);
            }
          })

        }
      })

      })







    .post(function (req, res) {

      new Todos({content: req.body.newContent, isDone: false})
          .save(function (err, newContent) {

            if(err){
              return res.send(err);
            }
            console.log(newContent)
            res.redirect('/')

          });


    })

    .put(function(req,res){
          mongoose.model('Todos').findById(req.id, function(err, todo){
            todo.update({
              isDone: completed

            },function(err,todo){
              if(err){
                res.send('error updating')
              }else{
                res.redirect('/')
              }


            });



          })



    })












module.exports = router;



