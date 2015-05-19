angular.module("frello",["xeditable","ui.bootstrap"]);

angular.module("frello").run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

angular.module("frello").controller("FrelloController",function($scope,FrelloFactory,$rootScope){
	
	$scope.model = FrelloFactory;

	$scope.tasks = $scope.model.getTasks();
	$scope.showOnlyCompleted = $scope.model.showOnlyCompleted;
	$scope.showOnlyUncompleted = $scope.model.showOnlyUncompleted;

	$scope.add = function(task){
		$scope.model.add(task);
	};

	$scope.remove = function(task){
		$scope.model.remove(task);
	};

	$scope.toggleCompleted = function(){
		$scope.model.toggleCompleted();
	};

	$scope.toggleUncompleted = function(){
		$scope.model.toggleUncompleted();
	};



	
});
angular.module("frello").controller("Frello2Controller", function($scope){
	$scope.$on('task.added', function(event, data){
    	$scope.alerts = data;
  	});

	
});
angular.module("frello").factory("FrelloFactory", function($rootScope,$timeout){
	
	var tasks=[];

	return {
		showOnlyCompleted : {
			text: "Show Only Completed",
			show: false
		},
		showOnlyUncompleted : {
			text: "Show Only Uncompleted",
			show: false
		},
		add : function(task){
			task = {
				message:task,
				statusCompleted:false
			}
			$rootScope.$broadcast("task.added",[{ type: 'success', msg: 'You added a task!!!' }]);
			$timeout(function(){
				$rootScope.$broadcast("task.added",[]);
			}, 3000);
			tasks.push(task);
		},
		remove : function(task){
			tasks.splice(task,1);
		},
		toggleCompleted : function(){
			if(this.showOnlyCompleted.show)
			{
				this.showOnlyCompleted.text = "Show Only Completed";
				this.showOnlyCompleted.show = false;
			}else{
				this.showOnlyCompleted.text = "Show All";
				this.showOnlyCompleted.show = true;
			}

		},
		toggleUncompleted : function(){
			if(this.showOnlyUncompleted.show)
			{
				this.showOnlyUncompleted.text = "Show Only Uncompleted";
				this.showOnlyUncompleted.show = false;
			}else{
				this.showOnlyUncompleted.text = "Show All";
				this.showOnlyUncompleted.show = true;
			}
		},
		getTasks : function(){
			return tasks;
		}
	};
});