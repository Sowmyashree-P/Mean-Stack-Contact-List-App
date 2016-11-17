angular.module('contactlistApp')
    .controller('MainController', ['$scope', 'todoService', 'logService', function($scope, todoService, logService) {
        console.log("inside main controller func");
        $scope.nonEditFlag = true;
        $scope.editFlag = false;
        $scope.inactive = true;
        $scope.formData = {};
        $scope.todos = [];
        $scope.curTodo = [];
        // when landing on the page, get all todos and show them
        todoService.get().then(
            function(response) {
                $scope.todos = response.data;//.splice(response.data.length-2,response.data.length-1);
//                $scope.todos = [
//                    {_id:1,name:"aaa",number:123,address:"xyxz",email:"aaa@gmail.com",relation:"collegue"},
//                    {_id:2,name:"bbb",number:465,address:"xhxk",email:"bbb@gmail.com",relation:"friend"}
//                ];
                $scope.curTodo = $scope.todos[0];
                logService.success('todoService.get()', response);
            }, 
            function(response) {
                logService.failed('todoService.get()', response);
            }
        );

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            console.log('MainController.createTodo() - formData1:', $scope.formData);
            todoService.create($scope.formData).then(
                function(response) {
                    console.log("response in controller5",response);
                    $scope.formData = {}; // clear the form so our user is ready to enter another
//                    response.data = [
//                    {_id:1,name:"WWW",number:123,address:"xyxz",email:"aaa@gmail.com",relation:"collegue"}
//                    ];
                    $scope.todos = response.data;
                    $scope.curTodo = $scope.todos[0];
                    $scope.todoForm.$setPristine();
                    logService.success('todoService.create()', response);
                }, 
                function(response) {
                    logService.failed('todoService.create()', response);
                }
            );
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            console.log('MainController.deleteTodo() - id:', id);
            todoService.delete(id).then(
                function(response) {
                    $scope.todos = response.data;
                    $scope.curTodo = $scope.todos[0];
                    logService.success('todoService.delete()', response);
                },
                function(response) {
                    logService.failed('todoService.delete()', response);
                }
            );
        };
        
        // Edit a todo 
        $scope.updateCurTodo = function(t) {
            console.log('in update cur tdodo ',t);
            if(t.name) { $scope.curTodo.name = t.name;}
            if(t.number) { $scope.curTodo.number = t.number;}
            if(t.email) { $scope.curTodo.email = t.email;}
            if(t.address) { $scope.curTodo.address = t.address;}
            if(t.relation) { $scope.curTodo.relation = t.relation;}
        };
        
        // Edit a todo 
        $scope.editTodo = function() {
            console.log('MainController.editTodo() - id:');
            $scope.inactive = false;
            $scope.nonEditFlag = false;
            $scope.editFlag = true;
        };
        
        // update a todo after checking it
        $scope.updateTodo = function(id,updatedData) {
            console.log('MainController.updateTodo() - id:', id);
            todoService.update(id,updatedData).then(
                function(response) {
                    $scope.todos = response.data;
                    logService.success('todoService.update()', response);
                    $scope.nonEditFlag = true;
                    $scope.editFlag = false;
                    $scope.inactive = true;
                },
                function(response) {
                    logService.failed('todoService.update()', response);
                    $scope.nonEditFlag = true;
                    $scope.editFlag = false;
                    $scope.inactive = true;
                }
            );
        };
        
        // select a todo after checking it
        $scope.selectTodo = function(id) {
            console.log('MainController.selectTodo() - id:', id);
            for(var i in $scope.todos) {
                if($scope.todos[i]._id == id) {
                    $scope.curTodo = $scope.todos[i];
                }
            }
        };
    }]);