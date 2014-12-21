var testApp = angular.module('testApp',[]);


testApp.factory("demoFac", ['$http',function($http){  
	var obj = {};
	
	obj.fetchUserDetails = function(){   /*This just to demonstrate common usage of factories to serve $http responses, by returning the entire promise */
		return $http.get('mockjson/userprofile.json');
	}
	
	obj.getUserFriends = function(){    /*This just to demonstrate common usage of factories to serve $http responses, by returning the entire promise */
		return $http.get('mockjson/userfriendlist.json');
	}
	
	obj.getOverallUserInfo = function(){  /*This is an example of how you can process and return the required result*/
		return $http.get('mockjson/userprofile.json').then(function(response){   //returns a call back
			this.userDetails = response.data;										//store data of 1st call in this.userDetails
			return $http.get('mockjson/userfriendlist.json').then(function(response){ //returns a call back
				this.userDetails.friends = response.data.userfriends;				//Append the response of second call to the data we stored previously
				return this.userDetails;									//Return processed result .
			});
		});
	}
	
	return obj;		

}]);

testApp.controller('testCtrl',function($scope,demoFac){
	$scope.getInfo = function(){
		demoFac.fetchUserDetails().success(function(response){ /*This just to demonstrate common usage of factories to serve $http responses, by returning the entire promise */
			$scope.userDetail = response;
		});
		
		demoFac.getUserFriends().success(function(response){ /*This just to demonstrate common usage of factories to serve $http responses, by returning the entire promise */
			$scope.userfriends = response;
		});
		
		demoFac.getOverallUserInfo().then(function(response){ /*This is an example of how you can process and return the required result (Notice here we use '.then')*/
			$scope.requiredInfo = response;
		});
	}
	
});