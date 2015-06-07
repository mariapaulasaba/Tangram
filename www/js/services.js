angular.module('starter.services', [])

.factory('Challenges', function() {
	var challenges = [{
		id: 1,
		name: "House",
		text: "What about building a house?",
		img: "img/chall_01.png"
	},{
		id: 2,
		name: "Cat",
		text: "Meow! I thought I saw a pussycat.",
		img: "img/chall_02.png"
	},{
		id: 3,
		name: "Tree",
		text: "Just for texting",
		img: "img/chall_03.png"
	}];
					  
	return {
		all: function() {
		  return challenges;
		},
		get: function(id) {
			for (var i = 0; i < challenges.length; i++) {
				if (challenges[i].id === parseInt(id)) {
					return challenges[i];
				}
			}
		 	return null;
		}					
	};				  
})
.factory('Bluetooth', function(){
	var serviceUUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
	var rgbUUID = "A495FF21-C5B1-4B44-B512-1370F02D74DE";
	
	var devicesTemplate = [{
			id: 0,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 1,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 2,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
					
		},{
			id: 3,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""		
		},{
			id: 4,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 5,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 6,
			name: "empty",
			uuid: "",
			connected: false,
			color: ""
		}];

	var puzzle = [{
			id: 0,
			name: "big_triangle_1",
			uuid: "",
			connected: true,
			color: ""
		},{
			id: 1,
			name: "big_triangle_2",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 2,
			name: "square",
			uuid: "",
			connected: true,
			color: ""
					
		},{
			id: 3,
			name: "trapeze",
			uuid: "",
			connected: false,
			color: ""		
		},{
			id: 4,
			name: "medium_triangle",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 5,
			name: "small_triangle_1",
			uuid: "",
			connected: false,
			color: ""
		},{
			id: 6,
			name: "small_triangle_2",
			uuid: "",
			connected: false,
			color: ""
		}];



	return {
	   scan: function($scope) {		   
	   
		   var onDeviceDiscovery = function(device){
			   for(var i = 0; i < puzzle.length; i++){
					if(device.advertising.kCBAdvDataLocalName == puzzle[i].name ){
							puzzle[i].uuid = device.id;
							if(puzzle[i].uuid != "") $scope.devices[i] = puzzle[i];
							$scope.$apply();
					}
				}   
		   };
		   ble.scan([], 10, onDeviceDiscovery, this.onError);
		   
  		},
		connect: function($scope, index){
			var success = function(){
				alert("connected to "+puzzle[index].name);
				puzzle[index].connected = true;	
				$scope.devices[index].connected = true;
				$scope.$apply();
			};
			ble.connect(puzzle[index].uuid, success, this.onError);
		},
		disconnect: function(){						
			var success = function(){
				for(var i = 0; i < puzzle.length; i++){
					puzzle[i].connected = false;
				}
			};			
			for(var i = 0; i < puzzle.length; i++){
				if(puzzle[i].connected == true){	
 					ble.disconnect(puzzle[i].uuid, success, this.onError);
				}
			}
		},
		readData: function(){	
		//		var success = function(data){
		//			var receivedData = new Uint8Array(data, 0, 3);			
		//			alert("Previous color:" + receivedData[0] + "," + receivedData[1] + "," + receivedData[2] + ".");	
		//		}
		//		ble.read(deviceId, scratchServiceUUID, readCharacteristicUUID, success, app.onError);

		},
		sendColor: function(index, color){		
			alert("trying to send "+color );
	
			var rgb = new Uint8Array(3);
			
			if(color == "red"){
				rgb[0] = 0xFF;
				rgb[1] = 0x00;
				rgb[2] = 0x00;			
			}
			else if (color == "blue"){
				rgb[0] = 0x00;
				rgb[1] = 0x00;
				rgb[2] = 0xFF;			
			}

			var success = function(){
				puzzle[index].color = color;
				alert("sent "+rgb[0]+rgb[1]+rgb[2]);
			}		
			ble.write(puzzle[index].uuid, serviceUUID, rgbUUID, rgb.buffer, success, this.onError);

		},
		onError: function(error){
			alert(error);
		},
		getPuzzle: function(){
			return puzzle;
	    },
		getDevicesTemplate: function(){
			return devicesTemplate;
	    }
	};
});
					  
