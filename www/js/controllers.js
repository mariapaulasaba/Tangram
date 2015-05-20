angular.module('starter.controllers', [])

.controller('ConnectCtrl', function($scope, $state) {
	$scope.connect = function(){
		console.log("connect");
		$state.go('tab.challenges');
	}
})
.controller('ChallengesCtrl', function($scope) {

})
.controller('ColorsCtrl', function($scope) {

})
.controller('SettingsCtrl', function($scope, $state) {
	$scope.disconnect = function(){
			console.log("disconnect");
			$state.go('connect');
	}
});
