app
		.controller(
				'classController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {

					
					$scope.gridOptions = {
						enableRowSelection : true,
						enableRowHeaderSelection : false
					};

					

					getSchoolList();  
					 //gopi
					getClassGridData()	;				 
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
					
					
					getBranchList();
					 function getBranchList() {
							
						 var schoolIdObject = {
									 "schoolId" : dataService.getSchoolId()
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



					function getBranchName(data,key) {
					    var found = null;

					    for (var i = 0; i < data.length; i++) {
					        var element = data[i];
					        if (element.branchId == key) {
					           found = element;
					       } 
					    }

					    return found;
					}


					
					$scope.postClassForm = function() {
					
						var dataObj = {
							"branchId" : ($scope.selectedBranch.branchId),
							"schoolId" : ($scope.selectedSchool.schoolId),
							"status" : ($scope.selectedStatus.value),
							
							"classId" : ($scope.classId),
							"classDesc" : ($scope.classDesc)

						}
					 

						var url = 'http://myschool-myfirstschool.rhcloud.com/rest/class/createClassDetails';

						if ($scope.mode == 'edit')
						{
							url = 'http://myschool-myfirstschool.rhcloud.com/rest/class/modifyClassDetails';
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
													alert("Class information edited sucessfully.");
												} else {
													alert("Class information created sucessfully.");
												}
												$scope.showBasicInfo = false;
												getClassGridData();
												var schoolIdObject = {
														"schoolId" : dataService.getSchoolId()
														}
											  
											  $http({
													method: 'POST',
													url:'http://myschool-myfirstschool.rhcloud.com/rest/class/getAllClassInfoDetailsBySchoolId',
													data:schoolIdObject,
													"Content-Type": "application/json"
												})
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
/*
												$http
												.get(
														' http://myschool-myfirstschool.rhcloud.com/rest/class/getAllClassInfoDetailsByBranchId')
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
												$scope.errorMsg = "Unable to submit Class form";
											}
										})
								.error(function(data, status, headers, config) {
									$scope.errorMsg = 'Unable to submit form';
								})
					}

					$scope.showBasicInfo = false;
					$scope.addClassInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "add";
						$scope.classDesc="";
						var status = 'A';
						$scope.selectedStatus = getByValue2($scope.statusList,status);
					 	var schoolId = dataService.getSchoolId();
					  	$scope.selectedSchool= getByValue3($scope.schoolList,schoolId);
				//alert('a');
					 	var branchId =dataService.getBranchId();
					 	if(branchId)
					 		{
					 		//alert('d');
					  	$scope.selectedBranch= getBranchName($scope.branchList,branchId);
					 		}
 					  	
					};
					$scope.editClassInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "edit";
						 
						//alert('d');
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
						
						$scope.classId = $scope.gridApi.selection.getSelectedRows()[0].classId;
						 
						var branchId = $scope.gridApi.selection.getSelectedRows()[0].branchId;
						//alert('branch list id-->'+$scope.branchList);
					  	$scope.selectedBranch= getBranchName($scope.branchList,branchId);
					  	//alert($scope.selectedBranch);
					  	
					  	var schoolId = $scope.gridApi.selection.getSelectedRows()[0].schoolId;
					  	//alert('school id-->'+schoolId);
					  	$scope.selectedSchool= getByValue3($scope.schoolList,schoolId);
					  	//alert('school name-->'+$scope.selectedSchool);
					  	$scope.classDesc = $scope.gridApi.selection.getSelectedRows()[0].classDesc.trim();
					};

					$scope.viewClassInfo = function() {
						$scope.showBasicInfo = true;
						$scope.edit = true;
						$scope.isShowSaveButton = false;
						$scope.mode = "view";
						
						$scope.classDesc = $scope.gridApi.selection.getSelectedRows()[0].classDesc.trim();
						
						
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
						var branchId = $scope.gridApi.selection.getSelectedRows()[0].branchId;
					  	$scope.selectedBranch= getBranchName($scope.branchList,branchId);
					  	
					  	var schoolId = $scope.gridApi.selection.getSelectedRows()[0].schoolId;
					  	$scope.selectedSchool= getByValue3($scope.schoolList,schoolId);
									};

					$scope.removeClassInfo = function() {
						$scope.branchId = $scope.gridApi.selection.getSelectedRows()[0].branchId;
					};

					$scope.gridOptions.columnDefs = [

					{
						name : 'classDesc'
					}, {
						name : 'status',
						 
					}, {
						name : 'schoolId',
						displayName : "schoolId",
					},
					{
						name : 'branchId',
						displayName : "branchId",
					}];
					$scope.gridOptions.multiSelect = false;
					$scope.gridOptions.modifierKeysToMultiSelect = false;
					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
					$scope.gridApi = gridApi;
					};
					$scope.classInfoClose = function() {
					$scope.showBasicInfo = false;
					};
					$scope.resetClassInfo = function() {
					$scope.gridApi.selection.clearSelectedRows();
					$scope.showBasicInfo = false;
					$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};

					$timeout(function() {
						$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
						$(".ngViewport").focus();

					});

					function getClassGridData() {
							
					
					  
						  $scope.isShowAddButton=true;
						  $scope.isShowDeleteButton=true;
						   
						  var schoolIdObject = {
									"schoolId" : dataService.getSchoolId()
									}
						  
						  $http({
								method: 'POST',
								url:'http://myschool-myfirstschool.rhcloud.com/rest/class/getAllClassInfoDetailsBySchoolId',
								data:schoolIdObject,
								"Content-Type": "application/json"
							})
					   .success(function(data) {
				      $scope.gridOptions.data = data;
				      // $interval whilst we wait for the grid to digest the data we just gave it
				      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);

				    });
					
					 
					  
						  }
				});
				
