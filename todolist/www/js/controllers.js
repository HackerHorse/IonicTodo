angular.module('app.controllers', [])

.controller('todoCtrl', function($scope, Tasks) {
	$scope.tasks = [];
})

.controller('createTaskCtrl', function($scope, Tasks, $ionicModal) {
   // No need for testing data anymore

  $ionicModal.fromTemplateUrl('createtaskmodal.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

   // Called when the form is submitted
  $scope.createNewTask = function(task) {

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
}) 

.controller('tODOCtrl', function($scope) {

})
   
.controller('commentsCtrl', function($scope) {

})
 