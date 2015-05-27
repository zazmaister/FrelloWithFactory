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