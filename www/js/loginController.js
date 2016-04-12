app.controller("loginController", function($scope,$http, dataService,$sanitize ) {
//alert('in login controller');
	$scope.showMenuPage=false;	
$scope.addSchoolInfo1 = function() {
	//alert('in login woowowowo');	
}


	$scope.postForm = function() {
//alert('in post form');
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
				alert('in successs form');			 
				var jsObj = angular.fromJson(data);
				
		alert('login controlleer');
				if ( jsObj.result=='success') {
					 
//					
//					
//					alert('login--->>>>'+jsObj['view-home-menu']);
//					alert('login2--->>>>'+jsObj['view-profile-menu']);
//					alert('login-3-->>>>'+jsObj['view-school-menu']);
//					
//					 
					dataService.setUserName(jsObj['userName']);
					dataService.setViewHomeMenu(jsObj['view-home-menu']);
					dataService.setViewProfileMenu(jsObj['view-profile-menu']);
					dataService.setViewSchoolMenu(jsObj['view-school-menu']);
					dataService.setSchoolName(jsObj['schoolName']);
					dataService.setSchoolId(jsObj['schoolId']);
					dataService.setStudentId(jsObj['studentId']);
					dataService.setClassId(jsObj['classId']); 
					dataService.setViewSchoolMenu(jsObj['view-school-menu']);

					
				alert('login controller-->'+dataService.getClassId());
				alert('login controller-->'+dataService.getStudentId());
					
					var userName= dataService.getUserName(); 
					var viewHomeMenu= dataService.getViewHomeMenu(); 
					var viewProfileMenu= dataService.getViewProfileMenu();
					var viewSchoolMenu= dataService.getViewSchoolMenu();
					$scope.viewBranchMenu= dataService.getViewBranchMenu();

					//alert('menu page from 11111111111111111111111'+viewProfileMenu);
					
					 selectedMenu='home';
					dataService.setSelectedMenu(selectedMenu);
					//window.location.href = 'menu.html';
				} else {
					$scope.errorMsg = "Login not correct";
				}
			})
			.error(function(data, status, headers, config) {
				alert('in erroo form');
				$scope.errorMsg = 'Unable to submit form';
			})
		
	}

});