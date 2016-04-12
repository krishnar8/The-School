//var app = angular.module("myKidSchool", []);
var app =angular.module('myKidSchool',
		['ngHamburger', 'ui.bootstrap','ngSanitize','ngTouch', 'ui.grid', 'ui.grid.selection',  'textAngular', 'ngLoadingSpinner']);
//alert('in servuce');
app.factory('dataService', function(){
	 
	var data =
	{
	   
	    	selectedMenu:'login',
	    	showNavigationBar:false,
	viewSchoolMenu: '',
	viewProfileMenu: '',
	userName:'',
	viewBranchMenu:'',
	schoolName:'',
	schoolId:'',
	branchId:'',
	studentId:'',
	loginAsSchool:'',
	loginAsBranch:'',
	loginAsAdmin:'',
	viewStudentMenu:'',
	viewHomeMenu: '',
	viewEntitlmentMenu:'',
	viewActivityInfoMenu:'',
	classId:'',
    viewClassMenu:''
		
	}; 
    
    return {
    	
    	getSelectedMenu: function () {
    		 
            return data.selectedMenu;
        },
        setSelectedMenu: function (selectedMenu) {
         
            data.selectedMenu = selectedMenu;
        },
        
        getViewEntitlmentMenu: function () {
   		 
            return data.viewEntitlmentMenu;
        },
        setViewEntitlmentMenu: function (viewEntitlmentMenu) {
         
            data.viewEntitlmentMenu = viewEntitlmentMenu;
        },
        
        
        
        getViewActivityInfoMenu: function () {
      		 
            return data.viewActivityInfoMenu;
        },
        setViewActivityInfoMenu: function (viewActivityInfoMenu) {
         
            data.viewActivityInfoMenu = viewActivityInfoMenu;
        },
        
        getViewStudentMenu: function () {
   		 
            return data.viewStudentMenu;
        },
        setViewStudentMenu: function (viewStudentMenu) {
         
            data.viewStudentMenu = viewStudentMenu;
        },
        
        getStudentId: function () {
      		 
            return data.studentId;
        },
        setStudentId: function (studentId) {
         
            data.studentId = studentId;
        },
        
        getClassId: function () {
     		 
            return data.classId;
        },
        setClassId: function (classId) {
         
            data.classId = classId;
        },
        
        getBranchId: function () {
   		 
            return data.branchId;
        },
        setBranchId: function (branchId) {
         
            data.branchId = branchId;
        },

        getLoginAsSchool: function () {
   		 
            return data.loginAsSchool;
        },
        setLoginAsSchool: function (loginAsSchool) {
         
            data.loginAsSchool = loginAsSchool;
        },

        getLoginAsBranch: function () {
      		 
            return data.loginAsBranch;
        },
        
        setLoginAsBranch: function (loginAsBranch) {
         
            data.loginAsBranch = loginAsBranch;
        },
        
        getLoginAsAdmin: function () {
      		 
            return data.loginAsAdmin;
        },
        setLoginAsAdmin: function (loginAsAdmin) {
         
            data.loginAsAdmin = loginAsAdmin;
        },
        
        
        getSchoolId: function () {
   		 
            return data.schoolId;
        },
        setSchoolId: function (schoolId) {
         
            data.schoolId = schoolId;
        },

        
        getSchoolName: function () {
   		 
            return data.schoolName;
        },
        setSchoolName: function (schoolName) {
         
            data.schoolName = schoolName;
        },
        
        getViewBranchMenu: function () {
        	
            return data.viewBranchMenu;
        },
        setViewBranchMenu: function (viewBranchMenu) {
            data.viewBranchMenu = viewBranchMenu;
        },
    	
    	getViewHomeMenu: function () {
    	
            return data.viewHomeMenu;
        },
        setViewHomeMenu: function (viewHomeMenu) {
            data.viewHomeMenu = viewHomeMenu;
        },
        getUserName: function () {
            return data.userName;
        },
        setUserName: function (userName) {
            data.userName = userName;
        },
        
        getViewProfileMenu: function () {
            return data.viewProfileMenu;
        },
        setViewProfileMenu: function (viewProfileMenu) {
            data.viewProfileMenu = viewProfileMenu;
        },
        getViewClassMenu: function () {
            return data.viewClassMenu;
        },
        setViewClassMenu: function (viewClassMenu) {
            data.viewClassMenu = viewClassMenu;
        },
        
        getViewSchoolMenu: function () {
            return data.viewSchoolMenu;
        },
        setViewSchoolMenu: function (viewSchoolMenu) {
            data.viewSchoolMenu = viewSchoolMenu;
        },
        getShowNavigationBar: function () {
            return data.showNavigationBar;
        },
        setShowNavigationBar: function (showNavigationBar) {
            data.showNavigationBar = showNavigationBar;
        }
        
    };
});

	    
    

 
//app.service("dataService", MyService);
 /*

app.controller("myController", function($scope, dataService) {

	$scope.message = dataService.doIt();

});

*/


app.directive('resize', function ($window) {
    return function (scope, element) {
 
    	var w = angular.element($window);
        var changeHeight = function() {element.css('height', (w.height() - ((w.height()*30/100) )) + 'px' );};  
                    w.bind('resize', function () {        
              changeHeight();   // when window size gets changed             
        });  
        changeHeight(); // when page loads          
    }
});
/*
app.directive("scroll", function ($div) {
	 
    return function (scope, element, attrs) {

        function getScrollOffsets(w) {

            // Use the specified window or the current window if no argument 
            w = w || window;

            // This works for all browsers except IE versions 8 and before
            if (w.pageXOffset != null) return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };

            // For IE (or any browser) in Standards mode
            var d = w.document;
            if (document.compatMode == "CSS1Compat") {
            	
                return {
                    x: d.documentElement.scrollLeft,
                    y: d.documentElement.scrollTop
                };
            }

            // For browsers in Quirks mode
            return {
            
                x: d.body.scrollLeft,
                y: d.body.scrollTop
            };
        }

        angular.element($div).bind("scroll", function () {
            var offset = getScrollOffsets($div);
         
             if (offset.y >= 50) {
                 scope.boolChangeClass = true;
             } else {
                 scope.boolChangeClass = false;
             }
            scope.$apply();
        });
    };
})
*/
app.directive('whenscrollends', function() {    
	 
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var visibleHeight = element.height();
            var threshold = 50;
            $(element[0]).scroll(function() {
             if($(element[0]).scrollTop() + $(element[0]).innerHeight() >= ($(document).height()-40)) {
            	 scope.$apply(attrs.whenscrollends);
             }
             
   
             //   if (hiddenContentHeight -  $(element[0]).scrollTop() <= threshold) {
                    // Scroll is almost at the bottom. Loading more rows
                	
             //   	 scope.$apply(attrs.whenscrollends);
                    
             //   }
            });
        }
    };
});