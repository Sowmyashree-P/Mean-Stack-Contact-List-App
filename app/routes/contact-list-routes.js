var express = require('express');
var Todo = require('../models/contacts'); // load the todo model


var router = express.Router();

router.route('/')
    .get(function(req, res) {
        // use mongoose to get all todos in the database
    console.log(Todo);
        Todo.find(function(err, todos) {
console.log("in get func");console.log(todos);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(todos); // return all todos in JSON format
        });
    })
    .post(function(req, res) {
        // create a todo, information comes from AJAX request from Angular
    console.log("comes here");
        console.log('POST - todo object (req.body)3:', req.body);
        //var todoObj = req.body;
        var name = req.body.name;
        var number = req.body.number;
        var address = req.body.address;
        var email = req.body.email;
        var relation = req.body.relation;

        Todo.create({
            name : req.body.name,
            number : req.body.number,
            address : req.body.address,
            email : req.body.email,
            relation : req.body.relation

        }, function(err, todo) {
           console.log("todo in route response4 ",todo);
            if (err) {
                //res.send(err);
                res.json({error:err});
            }
            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err) {
                    //res.send(err);
                    res.json({error:err});
                }
                console.log(todos);
                res.json(todos);
            });
        });

    });

router.route('/:todoId')
    .delete(function(req, res) {
        console.log('DELETE - todo id (req.params.todoId):', req.params.todoId);
    
        Todo.remove({
            _id : req.params.todoId
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                
                res.json(todos);
            });
        });
    });

router
    .put('/:todoId',function(req, res) {
        console.log('UPDATE - todo id (req.params.todoId):', req);
        Todo.findById({
            _id : req.params.todoId
        },function(err, todo) {
            console.log("in findbyid func");console.log(todo);
            todo.name = req.body.name;
            todo.number = req.body.number;
            todo.address = req.body.address;
            todo.email = req.body.email;
            todo.relation = req.body.relation;
        todo.save({
            todo
            }, function(err, todo) {
               console.log("todo in route response4 ",todo);
                if (err) {
                    //res.send(err);
                    res.json({error:err});
                }
                // get and return all the todos after you create another
                Todo.find(function(err, todos) {
                    if (err) {
                        //res.send(err);
                        res.json({error:err});
                    }
                    console.log(todos);
                    res.json(todos);
            });
        });

        });
        
    });

//console.log(router);

// expose the routes to our app with module.exports
module.exports = router; 
