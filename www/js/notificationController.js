/*
app.controller("notificationController", function($scope,$http, dataService,$sanitize ) {
//profile controller
$scope.notifications="notifications from controller";
     
 
}); 

 */
app
		.controller(
				'notificationController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {


					getActivitiesList();
					function getActivitiesList() {

						var activityIdObject = {
							"schoolId" : dataService.getSchoolId(),
							"branchId" : dataService.getBranchId(),
							"classId" : dataService.getClassId(),
							"studentId" : dataService.getStudentId(),
							"activityType":'N'
						}

						$http(
								{
									method : 'POST',
									url : 'http://myschool-myfirstschool.rhcloud.com/rest/activity/getAllNotificationInfoDetailsByStudent',
									data : activityIdObject,
									"Content-Type" : "application/json"
								}).success(
								function(data, status, headers, config) {
									$scope.notifications = data;
								}).error(
								function(data, status, headers, config) {
									$scope.message = 'Unexpected Error';
								});
					}
				

				});

//  $scope.loadMoreRecords();

