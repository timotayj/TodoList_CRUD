/**
 * Created by johnsont on 24/07/2015.
 */
var mongoose = require ('mongoose');

var todoSchema = new mongoose.Schema({

    content : String
    //isDone: Boolean


})

module.export = mongoose.model('Todos', todoSchema);

