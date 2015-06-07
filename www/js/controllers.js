angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope, Bluetooth, $state) {
	$scope.start = function(){
		$state.go('connect');
	}
})
.controller('ConnectCtrl', function($rootScope, $scope, Bluetooth, $state) {
	$scope.devices = [];
	$scope.imagesOff = $rootScope.imagesOff;
	$scope.imagesOn = $rootScope.imagesOn;
	$scope.web = false;
	
	$scope.scan = function(){	   
		$scope.devices = Bluetooth.getDevicesTemplate();
		if(!$scope.web){
			Bluetooth.disconnect();
			Bluetooth.scan($scope);	
			//$scope.devices = Bluetooth.getPuzzle();
		}
		else{
			$scope.devices = Bluetooth.getPuzzle();
			console.log($scope.devices);
		}
	};
	
	
	$scope.connectDevice = function(index){
		Bluetooth.connect($scope, index);
	};
	
	$scope.ready = function(){
//		$scope.names = "";
//		for(var i = 0; i < 7; i++){
//			if($scope.devices[i].name != undefined){
//				$scope.names += $scope.devices[i].name;
//				$scope.names += ", ";
//			}
//		}		
		$rootScope.devices = $scope.devices;
		$state.go('tab.challenges');
	};
})
.controller('ChallengesCtrl', function($scope, Challenges) {
	$scope.challenges = Challenges.all();




})



.controller('ColorsCtrl', function($rootScope, $scope, Bluetooth) {	
	$scope.imagesOff = $rootScope.imagesOff;
	$scope.imagesOn = $rootScope.imagesOn;
	$scope.color = new Uint8Array(3);
	$scope.id = "";
	
	$scope.$watch(function(){
			return $rootScope.devices;
		}, function(){
			$scope.devices = $rootScope.devices;
		    console.log($scope.devices);
 		}
	);
		
	$scope.changeId = function(id){
		$scope.id = id;
		alert("id set: "+ $scope.id);
	};
	
	$scope.sendColor = function(color){	
		$scope.color = color;
		alert("sending "+$scope.color+" to: "+$scope.id);
		Bluetooth.sendColor($scope.id, $scope.color);
	};
	
})
.controller('SettingsCtrl', function($scope, Bluetooth, $state) {
	$scope.disconnect = function(){
			Bluetooth.disconnect();
			setTimeout(function(){$state.go('start');}, 1000);
	};
})
.directive('device', function() {
  return {
    //template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
});
