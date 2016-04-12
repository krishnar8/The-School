
app.controller("indexController", function($scope,$http,dataService,$sanitize ) {
	//profile controller
	 
      $http.get("http://www.w3schools.com/angular/customers.php")
      .success(function (response) {
    	 
    	  $scope.users = response.records;
    	  
      });
      
      

      $scope.loginSchool = function() {
    	  $scope.loginData.username= '9999';
    	  $scope.loginData.password= '9999';
    	  postLoginForm();
      };

      $scope.loginS1 = function() {
    	  $scope.loginData.username= '50';
    	  $scope.loginData.password= '50';
    	  postLoginForm();
      };

      $scope.loginS2 = function() {
    	  $scope.loginData.username= '51';
    	  $scope.loginData.password= '51';
    	  postLoginForm();
      };

      
    //  var child = document.querySelector('.material-design-hamburger__icon').childNodes[0].classList;
     // alert('chiildd-->'+child);
     
      $scope.postLoginForm = function() {
      
    //  alert('in post login form');
     // alert('in post form');
		var dataObj = {
		
				"mobileNumber" : encodeURIComponent($scope.loginData.username),
				"pasword" : encodeURIComponent($scope.loginData.password)
				 
		};	
		 
		 
		 
		 $http({
				method: 'POST',
			//	url:'http://myschool-myfirstschool.rhcloud.com/rest/login/processLoginDetails',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/user/getUserCredentialsByLogin',
				data:dataObj,
				"Content-Type": "application/json"
			})
			.success(function(data, status, headers, config) {
	//			alert('in successs form');			 
				var jsObj = angular.fromJson(data);
				 
		
				if ( jsObj.result=='success') {
					 
					
					
					dataService.setUserName(jsObj['userName']);
					dataService.setViewHomeMenu(jsObj['view-home-menu']);
					dataService.setViewProfileMenu(jsObj['view-profile-menu']);
					dataService.setViewSchoolMenu(jsObj['view-school-menu']);
					dataService.setViewBranchMenu(jsObj['view-branch-menu']);
					dataService.setViewStudentMenu(jsObj['view-student-menu']);
				//	alert('index con.. brachmenu-->'+jsObj['view-branch-menu']);
					dataService.setSchoolName(jsObj['schoolName']);
					dataService.setSchoolId(jsObj['schoolId']);
					
					dataService.setLoginAsSchool(jsObj['loginAsSchool']);
					dataService.setLoginAsBranch(jsObj['loginAsBranch']);
					dataService.setLoginAsAdmin(jsObj['loginAsAdmin']);
					dataService.setBranchId(jsObj['branchId']);
					
					dataService.setStudentId(jsObj['studentId']);
					dataService.setClassId(jsObj['classId']); 
					//alert('index controller-->'+dataService.getSchoolId());
					 
					$scope.userName= dataService.getUserName(); 
					$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
					$scope.viewProfileMenu= dataService.getViewProfileMenu();
					$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
					$scope.viewBranchMenu= dataService.getViewBranchMenu();
					$scope.viewStudentMenu= dataService.getViewStudentMenu();
					
					$scope.setSchoolName= dataService.setSchoolName("Euro kids");
					
					  dataService.setShowNavigationBar(true);
					 selectedMenu='home';
					dataService.setSelectedMenu(selectedMenu);
					
				 
					
					$scope.viewloginMenu= false;
					
					var myEl = angular.element( document.querySelector( '.material-design-hamburger__icon' ) );
					 angular.element(document.querySelector('.material-design-hamburger__icon')).removeClass('hidden');
					
				} else {
					$scope.errorMsg = "Login not correct";
				}
			})
			.error(function(data, status, headers, config) {
				
				$scope.errorMsg = 'Unable to submit form';
			})
		
	
      };
      
	 
}); 
 

 