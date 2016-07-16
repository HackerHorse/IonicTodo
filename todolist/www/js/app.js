// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ["ionic", "firebase"])

.factory("Tasks", function($firebaseArray) {
  var tasksRef = new Firebase("https://sampletodo-42b73.firebaseio.com/tasks");
  return $firebaseArray(tasksRef);
})

.controller('ListCtrl', function($scope, Tasks, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = Tasks;
  $scope.shouldShowDelete = true;
  $scope.shouldShowReorder = true;
  $scope.listCanSwipe = true

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('update-task.html', function(modal) {
    $scope.taskModalupdate = modal;
  }, {
    scope: $scope,
    taskindex: 0,
    task: '',
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {

    Tasks.$add({"title":task.title});

    $scope.taskModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.edit = function(task, index) {
    $scope.taskModalupdate.taskindex=index;
    $scope.taskModalupdate.task=task;
    $scope.taskModalupdate.show();
  }

  $scope.updateTask = function(task) {
      Tasks[$scope.taskModalupdate.taskindex].title=task.title;
      Tasks.$save($scope.taskModalupdate.taskindex).then(function(firebaseArray) {
        firebaseArray.key() === Tasks[$scope.taskModalupdate.taskindex].$id; // true
      });
      $scope.taskModalupdate.hide();
  };

  $scope.deleteTask = function(task, index) {
    var task = Tasks[index]
      Tasks.$remove(task).then(function(firebaseArray) {
        firebaseArray.key() === Tasks[index].$id; // true
      });
  }
  // Close the new task modal
  $scope.closeUpdateTask = function() {
    $scope.taskModalupdate.hide();
  };
})