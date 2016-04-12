 
app.controller('schoolController',  
                                 function ($scope, $http, $log, $timeout, uiGridConstants,dataService) {
   
	  $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };
	  getSchoolGridData();
	  
	  $scope.statusList = [
	                          { name: 'Active', value: 'A' },
	                          { name: 'InActive', value: 'I' },
	                          { name: 'deleted', value: 'D' },
	                      ];

	
	 function getByValue2(arr, value) {

		  var result  = arr.filter(function(o){return o.value == value;} );

		   return result? result[0] : null; // or undefined

		}

	  
	  
		$scope.postSchoolForm = function() {
			
			 //alert('poss');
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
			//alert('poss111');
			var jsonStr = JSON.stringify(addressDataObj);
			var dataObj = {
					"schoolName" : ($scope.schoolName),
					"status" :($scope.selectedStatus.value),
					"schoolId" : ($scope.schoolId)
					
					}
			dataObj["address"] = addressDataObj;

			var url ='http://myschool-myfirstschool.rhcloud.com/rest/school/createSchoolDetails';
			//alert(url);
			
			
			if($scope.mode=='edit')
				{
				
					url ='http://myschool-myfirstschool.rhcloud.com/rest/school/modifySchoolDetails';
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
					alert("School information edited sucessfully.");
						}
					else  						{
						alert("School information created sucessfully.");
					}
					
						
						
						  $scope.showBasicInfo=false;

						  getSchoolGridData();
						  /*
						 $http.get(' http://myschool-myfirstschool.rhcloud.com/rest/school/getAllSchoolInfoDetails')
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
		  $scope.addSchoolInfo = function() {
			  //alert('a');
			  $scope.showBasicInfo=true;
			  $scope.isShowSaveButton=true;
			  $scope.edit=false;
			  $scope.mode="add";
			  $scope.schoolId = "";
			  $scope.addressId = "";
			  //$scope.status = "";
			   $scope.schoolName = "";
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
			   };
			   
			   $scope.editSchoolInfo =function() {
				   $scope.showBasicInfo=true;
				   $scope.isShowSaveButton=true;
				   $scope.edit=false;
				   $scope.mode="edit";
				   //alert('abcccw');
					  $scope.schoolId = "";
					   $scope.schoolName = "";
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
					  
					  
					  $scope.schoolId = $scope.gridApi.selection.getSelectedRows()[0].schoolId;
					
					  $scope.schoolName = $scope.gridApi.selection.getSelectedRows()[0].schoolName.trim();
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
					  /*
					  $scope.schoolId = $scope.schoolId.trim();
					  $scope.schoolName = $scope.schoolName.trim();
					  $scope.address1= $scope.address1.trim();
					  $scope.address2= $scope.address2.trim();
					  $scope.city= $scope.city.trim();
					  $scope.state= $scope.state.trim();
					  $scope.country= $scope.country.trim();
					  $scope.emailId= $scope.emailId.trim();
					  $scope.mobileNumber= $scope.mobileNumber.trim();
					  $scope.pinCode= $scope.pinCode.trim();
					  
					  */
					  //schoolId
					   };
			 
				  $scope.viewSchoolInfo = function() {
					   $scope.showBasicInfo=true;
					  $scope.edit=true;
					  $scope.isShowSaveButton=false;
					 //alert('abcccw');
					 // alert($scope.gridApi.selection.getSelectedRows()[0].schoolName);
					  $scope.mode="view";      
					  $scope.schoolName = $scope.gridApi.selection.getSelectedRows()[0].schoolName.trim();
					  $scope.address1= $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
					  $scope.address2= $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
					  $scope.city= $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
					  $scope.state= $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
					  $scope.country= $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
					  $scope.emailId= $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
					  $scope.mobileNumber= $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
					  $scope.pinCode= $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
					  $scope.status = $scope.gridApi.selection.getSelectedRows()[0].address.trim();
					  $scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;

					  var status=$scope.gridApi.selection.getSelectedRows()[0].status.trim();
					  $scope.selectedStatus=getByValue2($scope.statusList, status);
					  
/*
					  $scope.schoolId = $scope.schoolId.trim();
					  $scope.schoolName = $scope.schoolName.trim();
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
					  		   
		  
		  $scope.removeSchoolInfo = function() {
			  $scope.schoolId = $scope.gridApi.selection.getSelectedRows()[0].schoolId;
		  };
	  
	  
	  $scope.gridOptions.columnDefs = [
	    
	    { name: 'schoolName' },
	    { name: 'address.mobileNumber', displayName:"Mobile Number", },
	    { name: 'address.emailId' , displayName:"EMail Id", }
	  ];

	  $scope.gridOptions.multiSelect = false;
	  $scope.gridOptions.modifierKeysToMultiSelect = false;
	  $scope.gridOptions.noUnselect = true;

	  $scope.gridOptions.onRegisterApi = function( gridApi ) {
	    $scope.gridApi = gridApi;
	  };
	  

	  $scope.schoolInfoClose = function() {
		  $scope.showBasicInfo=false;
	  };

	  
	  $scope.resetSchoolInfo = function() {
	    $scope.gridApi.selection.clearSelectedRows();
		  $scope.showBasicInfo=false;

	//    $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
	    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
	  };

	  $timeout(function(){
		  $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
		  $(".ngViewport").focus();
		  
	  });
	
	  function getSchoolGridData() 
	  {
	  if(dataService.getLoginAsSchool())
		{
		  $scope.isShowAddButton=false;
		  $scope.isShowDeleteButton=false;
		  
		  var schoolIdObject = {
					
					"schoolId" : dataService.getSchoolId()
					
					}
		  
		  $http({
				method: 'POST',
				url:'http://myschool-myfirstschool.rhcloud.com/rest/school/getSchoolInfoDetailsById',
				data:schoolIdObject,
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
		  
		  $http.get('http://myschool-myfirstschool.rhcloud.com/rest/school/getAllSchoolInfoDetails')
		   .success(function(data) {
	      $scope.gridOptions.data = data;

	      // $interval whilst we wait for the grid to digest the data we just gave it
	      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

	    });
		  }
	  
	}
});

 