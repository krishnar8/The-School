 app
		.controller(
				'dailyController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {
	
	//$scope.dailyActivity="<b>daily activity from controller</b>";
	//$scope.dailyActivity1= $sanitize("<b><h3>daily activity from controller</b></h3>");
	// getAllBranchInfoDetailsBySchoolId
 
 	getActivitiesList();
	 function getActivitiesList() {
			
		
		 
		 var activityIdObject = {
				 	 "schoolId" : dataService.getSchoolId(),
					 "branchId" : dataService.getBranchId(),
					 "classId" :  dataService.getClassId(),
				 	 "studentId" : dataService.getStudentId(),
				 	 "activityType":'D'

				}
		 
		 $http({
				method: 'POST',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/activity/getAllActivityInfoDetailsByStudent',
				data:activityIdObject,
				"Content-Type": "application/json"
			})
		 
		 
		/*
		  $http({
				method: 'GET',
				url:'http://www.w3schools.com/angular/customers.php',
				"Content-Type": "application/json"
			})
			*/
			.success(function (data, status, headers, config) {
		       //  $scope.branchList = data;
				
		         $scope.dailyActivity= data;
		         
					
		     }).error(function (data, status, headers, config) {
		         $scope.message = 'Unexpected Error';
		     });
		  }
	/*
	  
    $http.get("http://localhost:8080/SpringMVC/rest/login/getDailyActivity/1")
    .success(function (response) {
    	// $scope.dailyActivity = response.records;
    	// $scope.dailyActivity=response.records;
    	 $scope.dailyActivity= (response.records);
    	 
    
    });
	*/
	  $scope.loadMoreRecords = function() {
         
		  $http.get("http://localhost:8080/SpringMVC/rest/login/getDailyActivity/1")
		    .success(function (response) {
		    	 $scope.dailyActivity = $scope.dailyActivity.concat( response.records);
		    });
          
      };
      
    //  $scope.loadMoreRecords();
      
      $scope.abcd = function(a) {  
    
    
    	 
    	  if($scope.collapsed)
    		  {
    		  
    		  $scope.collapsed = false;
    		  }
    	  
    	  else
    		  {
    		  $scope.collapsed = true;
    		  }
    		 
    	 
    	 
    	  return  $scope.collapsed;
    	  
      }
      
      
      
  $scope.collapsed = true;
      
 

  
}).directive('collapseToggler', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
            elem.on('click', function() {
        $(this).siblings('.collapse').toggleClass('in');
          });
    }
  };
})

; 
 

 