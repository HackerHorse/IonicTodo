// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'firebase'])

.factory("Tasks", function($firebaseArray) {
  var tasksRef = new Firebase("https://sampletodo-42b73.firebaseio.com/tasks");
  return $firebaseArray(tasksRef);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('todoCtrl', function($scope, Tasks) {
  $scope.tasks = Tasks;
})

.controller('createTaskCtrl', function($scope, Tasks, $ionicModal) {
   // No need for testing data anymore
   // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/createtaskmodal.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

   // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  // Called when the form is submitted
  $scope.createTask = function(task) {

    Tasks.$add({"title":task.title});

    $scope.taskModal.hide();
    task.title = "";
  };
})

.controller('updateTaskCtrl', function($scope, Tasks, $ionicModal) {
   // No need for testing data anymore
   // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/updateTaskModal.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    scope: $scope,
    taskindex: 0,
    task: '',
    animation: 'slide-in-up'
  });

  $scope.edit = function(task, index) {
    $scope.taskModal.taskindex=index;
    $scope.taskModal.task=task;
    $scope.taskModal.show();
  }

  $scope.updateTask = function(task) {
      Tasks[$scope.taskModal.taskindex].title=task.title;
      Tasks.$save($scope.taskModal.taskindex).then(function(firebaseArray) {
        firebaseArray.key() === Tasks[$scope.taskModal.taskindex].$id; // true
      });
      $scope.taskModal.hide();
  };

  // Close the new task modal
  $scope.closeUpdateTask = function() {
    $scope.taskModal.hide();
  };
})

.controller('deleteTaskCtrl', function($scope, Tasks, $ionicModal) {
   // No need for testing data anymore
   // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/deleteTaskModal.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    taskindex: 0,
    task: '',
    animation: 'slide-in-up'
  });

  $scope.deleteTask = function(task, index) {
    $scope.taskModal.taskindex=index;
    $scope.taskModal.task=task;
    $scope.taskModal.show();
  }

  $scope.removeTask = function(task, index) {
    var task = Tasks[index]
      Tasks.$remove(task).then(function(firebaseArray) {
        firebaseArray.key() === Tasks[index].$id; // true
      });
      $scope.taskModal.hide();
  }
  // Close the new task modal
  $scope.closedeleteTask = function() {
    $scope.taskModal.hide();
  };

  $scope.clickevent = function(task) {
   alert(task.title);
  }
})