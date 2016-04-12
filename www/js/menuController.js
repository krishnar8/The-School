app.controller("menuController", function($scope,$http, dataService, $sanitize ) {
	// alert('in menu controler');
	$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
	$scope.viewProfileMenu= dataService.getViewProfileMenu();
	$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
	$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
	$scope.viewStudentMenu= dataService.getViewStudentMenu();
	$scope.viewClassMenu= dataService.getViewClassMenu();
	$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
	$scope.viewloginMenu= false;
	$scope.schoolName="My Kid School"; 
	//alert(dataService.getUserName());

	$scope.getHomePage = function()
	{
		
		var myEl1 = angular.element( document.querySelector( '#profile' ) );
		myEl1.removeClass('active');
		var myEl1 = angular.element( document.querySelector( '#school' ) );
		myEl1.removeClass('active');
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.addClass('active');
		
		var myEls = angular.element( document.querySelector( '#student' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		 selectedMenu='home';
		 $scope.hideSideBarForClick();
			dataService.setSelectedMenu(selectedMenu);
	
			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}
	
	$scope.getProfilePage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');  
		var myEl1 = angular.element( document.querySelector( '#profile' ) );
		myEl1.removeClass('active');
		var myEl1 = angular.element( document.querySelector( '#profile' ) );
		myEl1.addClass('active');
		
		var myEls = angular.element( document.querySelector( '#student Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		selectedMenu='profile';
		 $scope.hideSideBarForClick();
		 
		 $scope.viewHomeMenu= dataService.getViewHomeMenu(); 
		 $scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	 
			dataService.setSelectedMenu(selectedMenu);
	
	}

	$scope.hideSideBarForClick = function()
	{
		 
		  
		
	 $scope.tgState=false;
	  var child = document.querySelector('.material-design-hamburger__icon').childNodes[0].classList;
	//  angular.element(document.querySelector('.material-design-hamburger__icon')).addClass('hidden');

     if (child.contains('material-design-hamburger__icon--to-arrow')) {
       child.remove('material-design-hamburger__icon--to-arrow');
       child.add('material-design-hamburger__icon--from-arrow');
     } else {
       child.remove('material-design-hamburger__icon--from-arrow');
       child.add('material-design-hamburger__icon--to-arrow');
     }
    
	}
	
	$scope.getSchoolInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myEl1 = angular.element( document.querySelector( '#profile' ) );
		myEl1.removeClass('active');

		var myEls = angular.element( document.querySelector( '#student Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myEl1 = angular.element( document.querySelector( '#School Info' ) );
		myEl1.addClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		selectedMenu='School Info';
		 
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
	
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}
	
	$scope.getBranchInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myE2 = angular.element( document.querySelector( '#profile' ) );
		myE2.removeClass('active');
		
		var myE3 = angular.element( document.querySelector( '#School Info' ) );
		myE3.removeClass('active');
		

		var myEls = angular.element( document.querySelector( '#student Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myE4 = angular.element( document.querySelector( '#Branch Info' ) );
		myE4.addClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		 selectedMenu='Branch Info';
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
	

			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}

//111111111111111111111111111111111111111
	$scope.getStudentInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myE2 = angular.element( document.querySelector( '#profile' ) );
		myE2.removeClass('active');
		
		var myE3 = angular.element( document.querySelector( '#School Info' ) );
		myE3.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#student' ) );
		myEls.addClass('active');
		
		var myE4 = angular.element( document.querySelector( '#Branch Info' ) );
		myE4.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		 
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		 selectedMenu='Student Info';
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
	

			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}
	
	$scope.getEntitlmentInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myE2 = angular.element( document.querySelector( '#profile' ) );
		myE2.removeClass('active');
		
		var myE3 = angular.element( document.querySelector( '#School Info' ) );
		myE3.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Student Info' ) );
		myEls.removeClass('active');
		
		var myE4 = angular.element( document.querySelector( '#Branch Info' ) );
		myE4.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.addClass('active');
		
		 selectedMenu='Entitlment Info';
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
	

			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}

	$scope.getActivityInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myE2 = angular.element( document.querySelector( '#profile' ) );
		myE2.removeClass('active');
		
		var myE3 = angular.element( document.querySelector( '#School Info' ) );
		myE3.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Student Info' ) );
		myEls.removeClass('active');
		
		var myE4 = angular.element( document.querySelector( '#Branch Info' ) );
		myE4.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Activity Info' ) );
		myEls.addClass('active');
		
		 selectedMenu='Activity Info';
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
			

			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}
	
	$scope.getClassInfoPage = function()
	{
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myE2 = angular.element( document.querySelector( '#profile' ) );
		myE2.removeClass('active');
		
		var myE3 = angular.element( document.querySelector( '#School Info' ) );
		myE3.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Student Info' ) );
		myEls.removeClass('active');
		
		var myE4 = angular.element( document.querySelector( '#Branch Info' ) );
		myE4.removeClass('active');
		
		var myEls = angular.element( document.querySelector( '#Class Info' ) );
		myEls.addClass('active');
		
		var myEls = angular.element( document.querySelector( '#Entitlment Info' ) );
		myEls.removeClass('active');
		
		var myElAI = angular.element( document.querySelector( '#Activity Info' ) );
		myElAI.removeClass('active');
		
		 selectedMenu='Class Info';
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
	

			$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
			$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
			$scope.viewProfileMenu= dataService.getViewProfileMenu();
			$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
			$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
			$scope.viewStudentMenu= dataService.getViewStudentMenu();
			$scope.viewClassMenu= dataService.getViewClassMenu();
			$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
			$scope.viewloginMenu= false;
			
	}

//2222222222222222222222222222
	
	
	$scope.getLoginPage = function()
	{
		
		var myEl = angular.element( document.querySelector( '#home' ) );
		myEl.removeClass('active');
		
		var myEl1 = angular.element( document.querySelector( '#profile' ) );
		myEl1.removeClass('active');
		
		var myEl1 = angular.element( document.querySelector( '#School Info' ) );
		myEl1.addClass('active');
		 selectedMenu='login';
		 
		// angular.element(document.querySelector('.material-design-hamburger__icon')).addClass('hidden1');
		 
		 $scope.hideSideBarForClick();
		 
			dataService.setSelectedMenu(selectedMenu);
	
			dataService.setShowNavigationBar(false);
	

	}
	//from tab
	
	  $scope.getTemplate = function()
		{
		  
			selectedMenu= dataService.getSelectedMenu();
		
		//	alert(selectedMenu);
			if(selectedMenu==''){
				selectedMenu='login';
			}
			 
		// alert('in menu controler-->gettemplete()');
			if (selectedMenu =='home' )
				{
				
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewActivityInfoMenu= dataService.getViewStudentMenu();
				

				return "daily.html";
				}
			else if (selectedMenu =='profile' )
			{
				 
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "profile.html";
			}
			else if (selectedMenu =='School Info' )
			{
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "schoolInfo.html";
			}

			else if (selectedMenu =='Student Info' )
			{
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "studentInfo.html";
			}
			else if (selectedMenu =='Class Info' )
			{
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "classInfo.html";
			}
			else if (selectedMenu =='Entitlment Info' )
			{
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "entitlmentInfo.html";
			}
			else if (selectedMenu =='Branch Info' )
			{
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "branchInfo.html";
			}
			else if (selectedMenu =='Activity Info' )
			{
				 
				$scope.viewHomeMenu= dataService.getViewHomeMenu(); 
				$scope.viewEntitlmentMenu= dataService.getViewEntitlmentMenu(); 
				$scope.viewProfileMenu= dataService.getViewProfileMenu();
				$scope.viewSchoolMenu= dataService.getViewSchoolMenu();
				$scope.viewBranchMenu= dataService.getViewBranchMenu(); 
				$scope.viewloginMenu= false;
				$scope.schoolName= dataService.getSchoolName();
				$scope.viewStudentMenu= dataService.getViewStudentMenu();
				$scope.viewClassMenu= dataService.getViewClassMenu();
				$scope.viewActivityInfoMenu= dataService.getViewActivityInfoMenu();
				return "activityInfo.html";
			}
			else if (selectedMenu =='login' )
			{
				$scope.schoolName== dataService.getViewBranchMenu();
				  angular.element(document.querySelector('.material-design-hamburger__icon')).addClass('hidden');
					$scope.schoolName="My Kid School"; 
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
	
 

 