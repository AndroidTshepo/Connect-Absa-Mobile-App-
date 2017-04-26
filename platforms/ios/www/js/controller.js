app.controller("mainCtrl", function($scope,$http, defaultService) {


	$scope.time = new Date(new Date().getTime()).toLocaleTimeString(); // 11:18:48 AM
	$scope.seen = 0; // initial value
	$scope.receive = 0; // initial value
	$scope.seenComments = []; 
	$scope.tempComments = []; 
	$scope.color="#E64A19";
	$scope.tick = "ion-android-done";
	$scope.showButton = true;
	$scope.getComments = function(){
							
							$scope.Data = {};
							$scope.Data.method = "getComments";
							defaultService.data($scope.Data)
							.then(function(response){
								$scope.comments = response.data.data;
								$scope.tempComments = $scope.comments ;
								$scope.receive = $scope.comments.length;
								$scope.color="#E64A19";
								$scope.tick = "ion-android-done";
								$scope.showButton = true;
								//$scope.seen = 0;
								for (var i = 0; i < $scope.comments.length; i++) {
								    $scope.comments[i].cDateTime =new Date($scope.comments[i].cDateTime).getHours() +":"+new Date($scope.comments[i].cDateTime).getMinutes(); 
								}


								 //alert(JSON.stringify($scope.comments));
							}, function(error) {
								$scope.error = "";
			                });
	}
	$scope.getComments();


			//remove by attr
			$scope.removeByAttr = function(arr, attr, value){
			    var i = arr.length;
			    while(i--){
			       if( arr[i] 
			           && arr[i].hasOwnProperty(attr) 
			           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

			           arr.splice(i,1);

			       }
			    }
			    return arr;
			}
	$scope.refresh = function(){
		$scope.time = new Date(new Date().getTime()).toLocaleTimeString(); // 11:18:48 AM
		$scope.getComments();
	}
	$scope.Seen = function(item){
		$scope.seen = $scope.seen + 1;
		$scope.receive = $scope.receive - 1;
		$scope.seenComments.push(item); 
		$scope.removeByAttr($scope.comments , 'cID', item.cID);  
		$scope.tempComments = $scope.comments ;
							$scope.Data = {};
							$scope.Data.method = "updateSeen";
							$scope.Data.id = item.cID;
							defaultService.data($scope.Data)
							.then(function(response){
								
							}, function(error) {
								$scope.error = "";
			                });

	}
	$scope.getSeen = function(){
		$scope.color="#757575";
		$scope.tick = "ion-android-done-all";
		$scope.showButton = false;
		$scope.comments = $scope.seenComments ; 
	}
	$scope.getReceived = function(){
		$scope.color="#E64A19";
		$scope.tick = "ion-android-done";
		$scope.showButton = true;
		$scope.comments = $scope.tempComments ; 
	}



})