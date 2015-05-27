angular.module("frello").controller("Frello2Controller", function($scope){
	$scope.$on('task.added', function(event, data){
    	$scope.alerts = data;
  	});

	
});
