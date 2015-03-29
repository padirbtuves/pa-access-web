angular.module('paApp', [])
    .factory('servisas', ['$http', function ($http) {
        return {
            load: function (callback) {
                $http.get('/app/user/all')
                    .success(function (data, status, header, config) {
                        callback(data);
                    })
                    .error(function (data, status, header, config) {
                        alert("error");
                    });
            },

            currentUser: function (callback) {
                $http.get('/app/user/current')
                    .success(function (data, status, header, config) {
                        callback(data);
                    })
                    .error(function (data, status, header, config) {
                        alert("error");
                    });
            }
        }
    }])
    .controller('TodoListController', ['$scope', 'servisas', function ($scope, servisas) {
        var todoList = this;

        $scope.editMode = false;

        servisas.load(function (users) {
            $scope.users = users;
        });

        servisas.currentUser(function(user) {
            $scope.user = user;
        });
        
        todoList.todos = [
            {
                text: 'learn angular',
                done: true
            },
            {
                text: 'build an angular app',
                done: false
            }];

        todoList.addTodo = function () {
            todoList.todos.push({
                text: todoList.todoText,
                done: false
            });
            todoList.todoText = '';
        };

        todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function () {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
    }]);