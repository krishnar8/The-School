app
		.controller(
				'branchController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {

					
					$scope.gridOptions = {
						enableRowSelection : true,
						enableRowHeaderSelection : false
					};

					

					getSchoolList();  
					 //gopi
					getBranchGridData()	;				 
					function getSchoolList() {
						$http({
							method : 'GET',
							url : 'http://myschool-myfirstschool.rhcloud.com/rest/school/getAllSchoolInfoDetails',
							"Content-Type" : "application/json"
						}).success(function (data, status, headers, config) {
					         $scope.schoolList = data;
					     }).error(function (data, status, headers, config) {
					         $scope.message = 'Unexpected Error';
					     });
					 }				
					
					
					
					
					
					$scope.statusList = [ {
						name : 'Active',
						value : 'A'
					}, {
						name : 'InActive',
						value : 'I'
					}, {
						name : 'deleted',
						value : 'D'
					} ];

					
					function getByValue2(arr, value) {

						var result = arr.filter(function(o) {
							
							return o.value == value;
						});
							
						return result ? result[0] : null; 
						
					}
					

					function getByValue3(data,key) {
					    var found = null;

					    for (var i = 0; i < data.length; i++) {
					        var element = data[i];
					        if (element.schoolId == key) {
					           found = element;
					       } 
					    }

					    return found;
					}


					$scope.postBranchForm = function() {

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
					
						var dataObj = {
							"branchName" : ($scope.branchName),
							"schoolId" : ($scope.selectedSchool.schoolId),
							"status" : ($scope.selectedStatus.value),
							"branchId" : ($scope.branchId),
							"addressSameAsSchoolFlag" : "N"

						}
						dataObj["address"] = addressDataObj;

						var url = 'http://myschool-myfirstschool.rhcloud.com/rest/branch/createBranchDetails';

						if ($scope.mode == 'edit')
						{
							url = 'http://myschool-myfirstschool.rhcloud.com/rest/branch/modifyBranchDetails';
						}
						$http({
							method : 'POST',
							url : url,
							data : dataObj,
							"Content-Type" : "application/json"
						}).success(
										function(data, status, headers, config) {
											var jsObj = angular.fromJson(data);
											if (jsObj.result == 'success') {
												if ($scope.mode == 'edit') {
													alert("Branch information edited sucessfully.");
												} else {
													alert("Branch information created sucessfully.");
												}
												$scope.showBasicInfo = false;
												getBranchGridData();
												/*
												$http
														.get(
																' http://myschool-myfirstschool.rhcloud.com/rest/branch/getAllBranchInfoDetails')
														.success(
																function(data) {
																	$scope.gridOptions.data = data;
																	$interval(
																			function() {
																				$scope.gridApi.selection
																						.selectRow($scope.gridOptions.data[0]);
																			},
																			0,
																			1);

																});
																*/
											} else {
												$scope.errorMsg = "Unable to submit Branch form";
											}
										})
								.error(function(data, status, headers, config) {
									$scope.errorMsg = 'Unable to submit form';
								})
					}

					$scope.showBasicInfo = false;
					$scope.addBranchInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "add";
						$scope.branchId = "";
						$scope.addressId = "";
						$scope.branchName = "";
						$scope.address1 = "";
						$scope.address2 = "";
						$scope.city = "";
						$scope.state = "";
						$scope.country = "";
						$scope.emailId = "";
						$scope.mobileNumber = "";
						$scope.pinCode = "";
						var status = 'A';
						$scope.selectedStatus = getByValue2($scope.statusList,status);
						
						var schoolId = dataService.getSchoolId();
						
						//alert(getByValue2($scope.schoolList,"3"));
						$scope.selectedSchool= getByValue3($scope.schoolList,schoolId);
					//	$scope.selectedSchool=schoolId;
						
					};
					$scope.editBranchInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "edit";
						$scope.branchId = "";
						$scope.branchName = "";
						$scope.address1 = "";
						$scope.address2 = "";
						$scope.city = "";
						$scope.state = "";
						$scope.country = "";
						$scope.emailId = "";
						$scope.mobileNumber = "";
						$scope.pinCode = "";
						$scope.listStatus = 'I';
						$scope.addressId = "";
						$scope.branchId = $scope.gridApi.selection.getSelectedRows()[0].branchId;
						$scope.branchName = $scope.gridApi.selection.getSelectedRows()[0].branchName.trim();
						$scope.address1 = $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
						$scope.address2 = $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
						$scope.city = $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
						$scope.state = $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
						$scope.country = $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
						$scope.emailId = $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
						$scope.mobileNumber = $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
						$scope.pinCode = $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
						$scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;
						
						$scope.selectedSchool= getByValue3($scope.schoolList,dataService.getSchoolId());
					};

					$scope.viewBranchInfo = function() {
						$scope.showBasicInfo = true;
						$scope.edit = true;
						$scope.isShowSaveButton = false;
						$scope.mode = "view";
						$scope.branchName = $scope.gridApi.selection.getSelectedRows()[0].branchName.trim();
						$scope.address1 = $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
						$scope.address2 = $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
						$scope.city = $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
						$scope.state = $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
						$scope.country = $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
						$scope.emailId = $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
						$scope.mobileNumber = $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
						$scope.pinCode = $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
						var status2 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status2);
						$scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;
						$scope.selectedSchool= getByValue3($scope.schoolList,dataService.getSchoolId());
					};

					$scope.removeBranchInfo = function() {
						$scope.branchId = $scope.gridApi.selection.getSelectedRows()[0].branchId;
					};

					$scope.gridOptions.columnDefs = [

					{
						name : 'branchName'
					}, {
						name : 'address.mobileNumber',
						displayName : "Mobile Number",
					}, {
						name : 'address.emailId',
						displayName : "EMail Id",
					} ];
					$scope.gridOptions.multiSelect = false;
					$scope.gridOptions.modifierKeysToMultiSelect = false;
					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
					$scope.gridApi = gridApi;
					};
					$scope.BranchInfoClose = function() {
					$scope.showBasicInfo = false;
					};
					$scope.resetBranchInfo = function() {
					$scope.gridApi.selection.clearSelectedRows();
					$scope.showBasicInfo = false;
					$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};

					$timeout(function() {
						$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
						$(".ngViewport").focus();

					});

					function getBranchGridData() {
							
					 if(dataService.getLoginAsBranch())
						{
						 
						  $scope.isShowAddButton=false;
						  $scope.isShowDeleteButton=false;
						  var branchIdObject = {
									
									
									"branchId" : dataService.getBranchId()
									}
						  
						  $http({
								method: 'POST',
								url:'http://myschool-myfirstschool.rhcloud.com/rest/branch/getBranchInfoDetailsById',
								data:branchIdObject,
								"Content-Type": "application/json"
							})
					   .success(function(data) {
				      $scope.gridOptions.data = data;
				      // $interval whilst we wait for the grid to digest the data we just gave it
				      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

				    });
						}
					  else if(dataService.getLoginAsSchool())
						  {
						 
						  $scope.isShowAddButton=true;
						  $scope.isShowDeleteButton=true;
						  
						  var schoolIdObject = {
									
									"schoolId" : dataService.getSchoolId()
									
									}  
						  $http({
								method: 'POST',
								url:'http://myschool-myfirstschool.rhcloud.com/rest/branch/getAllBranchInfoDetailsBySchoolId',
								data:schoolIdObject,
								"Content-Type": "application/json"
							})						   .success(function(data) {
					      $scope.gridOptions.data = data;

					      // $interval whilst we wait for the grid to digest the data we just gave it
					      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

					    });
						  }
					  else if(dataService.getLoginAsAdmin())
						  {
						  
						  $scope.isShowAddButton=true;
						  $scope.isShowDeleteButton=true;
					$http.get('http://myschool-myfirstschool.rhcloud.com/rest/branch/getAllBranchInfoDetailsBySchoolId')
							.success(function(data) {
										$scope.gridOptions.data = data;
										if($scope.gridOptions.data[0])
											{
										$interval(
												function() {
													
							$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
												}, 0, 1);
											}

									});
						  }
						  }
				});
				
