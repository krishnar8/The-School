 
app.controller('studentController',  
                                 function ($scope, $http, $log, $timeout, uiGridConstants,dataService) {
   
	  $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };
	  getStudentGridData();
	  getBranchList();
	  $scope.statusList = [
	                          { name: 'Active', value: 'A' },
	                          { name: 'InActive', value: 'I' },
	                          { name: 'deleted', value: 'D' },
	                      ];

	
	 function getByValue2(arr, value) {

		  var result  = arr.filter(function(o){return o.value == value;} );

		   return result? result[0] : null; // or undefined

		}
		function getByValue3(data,key) {
		    var found = null;
		    for (var i = 0; i < data.length; i++) {
		        var element = data[i];
		        if (element.branchId == key) {
		           found = element;
		       } 
		    }

		    return found;
		}
		 if($scope.selectedBranch)
		 {
		 
		 	getClassList();
		 }
		
		 $scope.getClassList = function() {
			 
			 
		 	 
			 
			 var schoolIdObject = {
						 
					 "branchId" :$scope.selectedBranch.branchId
					}
			 
					
			
			  $http({
					method: 'POST',
					url:'http://myschool-myfirstschool.rhcloud.com/rest/class/getAllClassInfoDetailsByBranchId',
					data:schoolIdObject,
					"Content-Type": "application/json"
				}).success(function (data, status, headers, config) {
			         $scope.classList = data;
						
			     }).error(function (data, status, headers, config) {
			         $scope.message = 'Unexpected Error';
			     });
			  }
		
		
	 function getBranchList() {
			
		 var schoolIdObject = {
					 "schoolId" : ($scope.schoolId)
					 

				}
		 
		  $http({
				method: 'POST',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/branch/getAllBranchInfoDetailsBySchoolId',
				data:schoolIdObject,
				"Content-Type": "application/json"
			}).success(function (data, status, headers, config) {
		         $scope.branchList = data;
					
		     }).error(function (data, status, headers, config) {
		         $scope.message = 'Unexpected Error';
		     });
		  }
	  
	  
		$scope.postStudentForm = function() {
			
			var addressDataObj = {
					"addressId" : ($scope.addressId),
			"address1" : ($scope.address1),
			"address2" : ($scope.address2),
			"city" : ($scope.city),
			"state" : ($scope.state),
			"country" : ($scope.country),
			"emailId" : ($scope.emailId),
			"mobileNumber" : ($scope.mobileNumber),
			"pinCode" : ($scope.pinCode)
			
			};
			
			 
/*	    	
	    	   schoolId
	    	   addressId
	    	   branchId
	    	   studentId
			studentSurName
			studentName
			classId
			parentName
			studentDOB
			joinedDate
	*/		
			var jsonStr = JSON.stringify(addressDataObj);
			var dataObj = {
					"schoolId" : ($scope.schoolId),
					"branchId" :($scope.selectedBranch.branchId),
				//	"branchId" :21,
					"studentSurName" : ($scope.studentSurName),
					"studentName" : ($scope.studentName),
					"classId" : ($scope.selectedClass.classId),
					"parentName" : ($scope.parentName),
					"studentDOB" : ($scope.studentDOB),
					"joinedDate" : ($scope.joinedDate)					
					
					
					}
			dataObj["address"] = addressDataObj;

			var url ='http://myschool-myfirstschool.rhcloud.com/rest/student/createStudentDetails';
			
 			
			if($scope.mode=='edit')
				{
					url ='http://myschool-myfirstschool.rhcloud.com/rest/student/modifyStudentDetails';
				}
			
			 $http({
					method: 'POST',
					url:url,
 					data:dataObj,
					"Content-Type": "application/json"
				})
				.success(function(data, status, headers, config) {
					var jsObj = angular.fromJson(data);
			//		alert('jsObj.result==>'+jsObj.result);
					if ( jsObj.result=='success') {
						
						if($scope.mode=='edit')
						{
					alert("Student information edited sucessfully.");
						}
					else  						{
						alert("Student information created sucessfully.");
					}
					
						
						
						  $scope.showBasicInfo=false;

						  getStudentGridData();
						  /*
						 $http.get(' http://myschool-myfirstschool.rhcloud.com/rest/student/getAllStudentInfoDetails')
						   .success(function(data) {
					      $scope.gridOptions.data = data;

					      // $interval whilst we wait for the grid to digest the data we just gave it
					      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

					    });
					    */
						
						//window.location.href = 'menu.html';
					} else {
						$scope.errorMsg = "Login not correct";
					}
				})
				.error(function(data, status, headers, config) {
					$scope.errorMsg = 'Unable to submit form';
				})
		}
	  
	  
	
		  $scope.showBasicInfo=false;
		  $scope.addStudentInfo = function() {

			  $scope.studentId="";
 			  $scope.studentSurName="r";
			  $scope.studentName="dheeru sruji";
			  $scope.classId="nurc";
			  $scope.parentName="ramya gopi";
			  $scope.studentDOB="3";
			  $scope.joinedDate="3";
			  
			  
				
			  $scope.showBasicInfo=true;
			  $scope.isShowSaveButton=true;
			  $scope.edit=false;
			  $scope.mode="add";
			  $scope.addressId = "";
			 
			  $scope.address1= "";
			  $scope.address2="";
			  $scope.city= "";
			  $scope.state=  "";
			  $scope.country= "";
			  $scope.emailId=  "";
			  $scope.mobileNumber=  "";
			  $scope.pinCode=  "";
			  var status='A';
			  $scope.selectedStatus=getByValue2($scope.statusList, status);
			  var  vbranchId= dataService.getBranchId();
			  $scope.selectedBranch= getByValue3($scope.branchList,vbranchId);
			  
			   };
			   
			   $scope.editStudentInfo =function() {
				   $scope.showBasicInfo=true;
				   $scope.isShowSaveButton=true;
				   $scope.edit=false;
				   $scope.mode="edit";
				   //alert('abcccw');
					  $scope.studentId = "";
					  $scope.studentSurName="";
					  $scope.studentName="";
					  $scope.classId="";
					  $scope.parentName="";
					  $scope.studentDOB="";
					  $scope.joinedDate="";


					  
					  $scope.studentName = "";
					  $scope.address1= "";
					  $scope.address2="";
					  $scope.city= "";
					  $scope.state=  "";
					  $scope.country= "";
					  $scope.emailId=  "";
					  $scope.mobileNumber=  "";
					  $scope.pinCode=  "";
					  $scope.status = "";
					  $scope.addressId = "";
					  
					  
					  $scope.studentId = $scope.gridApi.selection.getSelectedRows()[0].studentId;
					
					  $scope.studentSurName=$scope.gridApi.selection.getSelectedRows()[0].studentSurName;
					  $scope.studentName=$scope.gridApi.selection.getSelectedRows()[0].studentName;
					  $scope.classId=$scope.gridApi.selection.getSelectedRows()[0].studentId;
					  $scope.parentName=$scope.gridApi.selection.getSelectedRows()[0].classId;
					  $scope.studentDOB=$scope.gridApi.selection.getSelectedRows()[0].studentDOB;
					  $scope.joinedDate=$scope.gridApi.selection.getSelectedRows()[0].joinedDate;

					  
					  $scope.studentName = $scope.gridApi.selection.getSelectedRows()[0].studentName.trim();
					  $scope.address1= $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
					  $scope.address2= $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
					  $scope.city= $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
					  $scope.state= $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
					  $scope.country= $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
					  $scope.emailId= $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
					  $scope.mobileNumber= $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
					  $scope.pinCode= $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
					  $scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;
					  
					  var status=$scope.gridApi.selection.getSelectedRows()[0].status.trim();
					  $scope.selectedStatus=getByValue2($scope.statusList, status);
					  
					  var  vbranchId= $scope.gridApi.selection.getSelectedRows()[0].branchId;
 					  $scope.selectedBranch= getByValue3($scope.branchList,vbranchId);
					  
					  
					  
					  /*
					  $scope.studentId = $scope.studentId.trim();
					  $scope.studentName = $scope.studentName.trim();
					  $scope.address1= $scope.address1.trim();
					  $scope.address2= $scope.address2.trim();
					  $scope.city= $scope.city.trim();
					  $scope.state= $scope.state.trim();
					  $scope.country= $scope.country.trim();
					  $scope.emailId= $scope.emailId.trim();
					  $scope.mobileNumber= $scope.mobileNumber.trim();
					  $scope.pinCode= $scope.pinCode.trim();
					  
					  */
					  //studentId
					   };
			 
				  $scope.viewStudentInfo = function() {
					   $scope.showBasicInfo=true;
					  $scope.edit=true;
					  $scope.isShowSaveButton=false;
					  //alert('abcccw');
					 // alert($scope.gridApi.selection.getSelectedRows()[0].studentName);
					  $scope.mode="view";    
					  $scope.studentName = $scope.gridApi.selection.getSelectedRows()[0].studentName.trim();
					  $scope.address1= $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
					  $scope.address2= $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
					  $scope.city= $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
					   
					  $scope.state= $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
					  $scope.country= $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
					  $scope.emailId= $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
					  $scope.mobileNumber= $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
					  $scope.pinCode= $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
					   
					//  $scope.status = $scope.gridApi.selection.getSelectedRows()[0].address.trim();
					  $scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;
					   
					  $scope.studentSurName=$scope.gridApi.selection.getSelectedRows()[0].studentSurName;
					  $scope.studentName=$scope.gridApi.selection.getSelectedRows()[0].studentName;
					  $scope.classId=$scope.gridApi.selection.getSelectedRows()[0].studentId;
					  $scope.parentName=$scope.gridApi.selection.getSelectedRows()[0].classId;
					  $scope.studentDOB=$scope.gridApi.selection.getSelectedRows()[0].studentDOB;
					  $scope.joinedDate=$scope.gridApi.selection.getSelectedRows()[0].joinedDate;

					  var status=$scope.gridApi.selection.getSelectedRows()[0].status.trim();
					  $scope.selectedStatus=getByValue2($scope.statusList, status);
					  var  vbranchId= $scope.gridApi.selection.getSelectedRows()[0].branchId;
 					  $scope.selectedBranch= getByValue3($scope.branchList,vbranchId);
					  /*
					  $scope.studentId = $scope.studentId.trim();
					  $scope.studentName = $scope.studentName.trim();
					  $scope.address1= $scope.address1.trim();
					  $scope.address2= $scope.address.trim();
					  $scope.city= $scope.city.trim();
					  $scope.state= $scope.state.trim();
					  $scope.country= $scope.country.trim();
					  $scope.emailId= $scope.emailId.trim();
					  $scope.mobileNumber= $scope.mobileNumber.trim();
					  $scope.pinCode= $scope.pinCode.trim();
*/
				  };
					  		   
		  
		  $scope.removeStudentInfo = function() {
			  $scope.studentId = $scope.gridApi.selection.getSelectedRows()[0].studentId;
		  };
	  
	  
	  $scope.gridOptions.columnDefs = [
	    
	    { name: 'studentName' },
	    { name: 'address.mobileNumber', displayName:"Mobile Number", },
	    { name: 'address.emailId' , displayName:"EMail Id", }
	  ];

	  $scope.gridOptions.multiSelect = false;
	  $scope.gridOptions.modifierKeysToMultiSelect = false;
	  $scope.gridOptions.noUnselect = true;

	  $scope.gridOptions.onRegisterApi = function( gridApi ) {
	    $scope.gridApi = gridApi;
	  };
	  

	  $scope.studentInfoClose = function() {
		  $scope.showBasicInfo=false;
	  };

	  
	  $scope.resetStudentInfo = function() {
	    $scope.gridApi.selection.clearSelectedRows();
		  $scope.showBasicInfo=false;

	//    $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
	    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
	  };

	  $timeout(function(){
		  $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
		  $(".ngViewport").focus();
		  
	  });
	
	  function getStudentGridData() 
	  {
	  if(dataService.getLoginAsSchool())
		{
		  
		  $scope.isShowAddButton=true;
		  $scope.isShowDeleteButton=true;
		  
		  $scope.schoolId=dataService.getSchoolId();
		  var schoolObject = {"schoolId" : $scope.schoolId }
		  
		  $http({
				method: 'POST',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/student/getAllStudentInfoDetailsBySchoolId',
				data:schoolObject,
				"Content-Type": "application/json"
			})
	   .success(function(data) {
      $scope.gridOptions.data = data;
      // $interval whilst we wait for the grid to digest the data we just gave it
      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

    });
		}
	  else if(dataService.getLoginAsBranch())
		{
		  
		   $scope.isShowAddButton=true;
		  $scope.isShowDeleteButton=true;
		  
		  $scope.schoolId=dataService.getSchoolId();
		  $scope.branchId= dataService.getBranchId();
		  var branchIdObject = {
					
					"branchId" : $scope.branchId
			
		  }
		 
		  $http({
				method: 'POST',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/student/getAllStudentInfoDetailsByBranchId',
				data:branchIdObject,
				"Content-Type": "application/json"
			})
	   .success(function(data) {
    $scope.gridOptions.data = data;
    // $interval whilst we wait for the grid to digest the data we just gave it
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

  });
		}

	  else if(dataService.getLoginAsAdmin())
		  {
		  $scope.isShowAddButton=true;
		  $scope.isShowDeleteButton=true;
		  
		  $http.get(' http://myschool-myfirstschool.rhcloud.com/rest/student/getAllStudentInfoDetails')
		   .success(function(data) {
	      $scope.gridOptions.data = data;

	      // $interval whilst we wait for the grid to digest the data we just gave it
	      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

	    });
		  }
	  
	}
});

 