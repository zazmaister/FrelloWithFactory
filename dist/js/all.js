angular.module("frello",["xeditable","ui.bootstrap"]);

angular.module("frello").run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

angular.module("frello").controller("Frello2Controller", function($scope){
	$scope.$on('task.added', function(event, data){
    	$scope.alerts = data;
  	});

	
});

/*Ne gre toliko za podvojene funkcije, kot to, da model ima podatke, controller pove katere od teh podatkov 
se prikažejo in kako, medtem ko view jih pokaže.
Sedaj si tako naredil, da si nekaj logike iz controllerja premaknil v sam factory (recimo showOnlyCompleted). 
Model se s tem ne ukvarja, s tem se ukvarja izključno controller/view. Za "proper" MVC bi tako 4
factory imel samo (v tvojem primeru) add, remove, ter getTasks. Vse ostalo je domena controllerja :) 
Drugače pa kot vedno, super da uporabljaš druge module :)*/
angular.module("frello").controller("FrelloController",function($scope,FrelloFactory,$rootScope){
	
	$scope.model = FrelloFactory;

	$scope.tasks = $scope.model.getTasks();
	$scope.showOnlyCompleted ={
			text: "Show Only Completed",
			show: false
		};
	$scope.showOnlyUncompleted = {
			text: "Show Only Uncompleted",
			show: false
		};


	$scope.add = function(task){
		$scope.model.add(task);
	};

	$scope.remove = function(task){
		$scope.model.remove(task);
	};

	$scope.toggleCompleted =  function(){
			if(this.showOnlyCompleted.show)
			{
				this.showOnlyCompleted.text = "Show Only Completed";
				this.showOnlyCompleted.show = false;
			}else{
				this.showOnlyCompleted.text = "Show All";
				this.showOnlyCompleted.show = true;
			}

		};

	$scope.toggleUncompleted =function(){
			if(this.showOnlyUncompleted.show)
			{
				this.showOnlyUncompleted.text = "Show Only Uncompleted";
				this.showOnlyUncompleted.show = false;
			}else{
				this.showOnlyUncompleted.text = "Show All";
				this.showOnlyUncompleted.show = true;
			}
		};



	
});

angular.module("frello").factory("FrelloFactory", function($rootScope,$timeout){
	
	var tasks=[];

	return {
		
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
		getTasks : function(){
			return tasks;
		}
	};
});