angular.module('contactlistApp')
    // each function returns a promise object 
    .factory('todoService', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/contacts');
            },
            
            create: function(todoData) {
                console.log("inside todoservice 2");console.log(todoData);
                return $http.post('/api/contacts', todoData);
            },
            
            delete: function(id) {
                return $http.delete('/api/contacts/' + id);
            },
            
            update: function(id,updatedFormData) {
                console.log("inside update ser");console.log(id);console.log(updatedFormData);
                return $http.put('/api/contacts/' + id,updatedFormData);
            }
        }
    }]);