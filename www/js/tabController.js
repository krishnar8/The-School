 
app.controller("tabController", function($scope,$http, dataService,$sanitize ) {

  $scope.getTemplate = function()
	{
		selectedMenu= dataService.getSelectedMenu();
	//	alert(selectedMenu);
		if(selectedMenu==''){
			selectedMenu='login';
		}
		 
	 
		if (selectedMenu =='home' )
			{
				return "daily.html";
			}
		else if (selectedMenu =='profile' )
		{
			 
		 
			return "profile.html";
		}
		else if (selectedMenu =='School Info' )
		{
			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewloginMenu= false;
		
		
		//	var myEl = angular.element( document.querySelector( '.material-design-hamburger__icon' ) );
	//		 angular.element(document.querySelector('.material-design-hamburger__icon')).removeClass('hidden');
		return "schoolInfo.html";
		}
		
		
		
		else if (selectedMenu =='login' )
		{
			  angular.element(document.querySelector('.material-design-hamburger__icon')).addClass('hidden');
			return "login.html";
		}
		 
	}
	 
	$scope.tab = 1;

      $scope.setTab = function(newTab){
    	 
        $scope.tab = newTab;
      };

      $scope.isSet = function(tabNum){
    	 
        return $scope.tab === tabNum;
      };
  
      $scope.dailyDate = new Date();
      
      $scope.shouldDateBeDisabled = function ($event) {
    	  
    	  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    		
      }
      
      $scope.valuationDatePickerOpen = function ($event) {
    	 
          
          if ($event) {
              $event.preventDefault();
              $event.stopPropagation(); // This is the magic
          }
          this.valuationDatePickerIsOpen = true;
      };
      
      //profile controller
      $http.get("http://www.w3schools.com/angular/customers.php")
      .success(function (response) {
    	 
    	  $scope.users = response.records;
    	  
      });
      
	 
}); 
 

 