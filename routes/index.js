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

      new Todos({content: req.body.newContent})
          .save(function (err, newContent) {

            if(err){
              return res.send(err);
            }
            console.log(newContent)
            res.redirect('/')

          });


    });









module.exports = router;



