
app
		.controller(
				'profileController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {
					getProfile();
					function getProfile() {
						var profileIdObject = {
							"studentId" : dataService.getStudentId(),
							"mailId" : dataService.getEmailId(),
							"mobileNumber" : dataService.getMobileNumber()
						}
						 
						$http(
								{
									
									
									method : 'POST',
									url : 'http://localhost:8080/MyKidSchool/rest/student/getStudentProfile',
									data : profileIdObject,
									"Content-Type" : "application/json"
								}).success(
								function(data, status, headers, config) {
									//$scope.imageActivity = data;
									$scope.profileListData = data;

								}).error(
								function(data, status, headers, config) {
									$scope.message = 'Unexpected Error';
								});
					}
				})
				
				
	.filter("getProfilePropertyName", function(){
   return function(label){
	  
	   return label.split('1p2r3o4f5i6l7e8')[0];
       
   }
}).filter("getProfilePropertyValue", function(){
	   return function(label){
		   
		   return propertyName= label.split('1p2r3o4f5i6l7e8')[1];
	     
	   }
	})
;
