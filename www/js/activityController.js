app
		.controller(
				'activityController',
				function($scope, $http, $log, $timeout, uiGridConstants,$sanitize,
						dataService) {

					getActivityGridData();
					
					$scope.gridOptions = {
						enableRowSelection : true,
						enableRowHeaderSelection : false
					};

					
					$scope.datepickerOptions = {
					    format: 'yyyy-mm-dd',
					    language: 'en',
					    autoclose: true,
					    weekStart: 0,
					}
					  $scope.date = '2000-03-12';
					
				
					
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
					
					 if($scope.selectedClass)
					 {
					 
						 getStudentList();
					 }
					 
					 $scope.getStudentList = function() {
						 
						 
						 var classIdObject = {
									 
								 "classId" :$scope.selectedClass.classId
								}
						 
								
						
						  $http({
								method: 'POST',
								url:'http://myschool-myfirstschool.rhcloud.com/rest/student/getAllStudentInfoDetailsByClassId',
								data:classIdObject,
								"Content-Type": "application/json"
							}).success(function (data, status, headers, config) {
						         $scope.studentList = data;
									
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


					$scope.postActivityForm = function() {
							var classId='';
							var branchId='';
							var studentId='';
						if($scope.selectedClass){
							classId =$scope.selectedClass.classId;
							}
						
						if($scope.selectedBranch){
							branchId =$scope.selectedBranch.branchId;
							}
						
						if($scope.selectedStudent){
							studentId =$scope.selectedStudent.studentId;
							}
						
						alert($scope.htmlcontent);
						 //"activityMessage" : ($scope.activityMessage),
						var dataObj = {
							"activityMessage" : ($scope.htmlcontent),
							"activityMessageTitle": ($scope.activityMessageTitle),
							"schoolId" : dataService.getSchoolId(),
							"status" :  ($scope.selectedStatus.value),
							"activityId" :  ($scope.activityId),
							"classId" :classId,
							"startDate" : ($scope.startDate),
							"endDate" :  ($scope.endDate),
							"activityType" : ($scope.activityType),
							"branchId" : branchId,
							"studentId":studentId
							
						}
					 

						var url = 'http://myschool-myfirstschool.rhcloud.com/rest/activity/createActivityDetails';

						if ($scope.mode == 'edit')
						{
							url = 'http://myschool-myfirstschool.rhcloud.com/rest/activity/modifyActivityDetails';
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
													alert("Activity information edited sucessfully.");
												} else {
													alert("Activity information created sucessfully.");
												}
												$scope.showBasicInfo = false;
												getActivityGridData();
												/*
												$http
														.get(
																' http://myschool-myfirstschool.rhcloud.com/rest/activity/getAllActivityInfoDetails')
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
												$scope.errorMsg = "Unable to submit Activity form";
											}
										})
								.error(function(data, status, headers, config) {
									$scope.errorMsg = 'Unable to submit form';
								})
					}

					$scope.showBasicInfo = false;
					$scope.addActivityInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "add";
						$scope.startDate= "";
						$scope.endDate= "";
						$scope.activityType= "D";
						
						
						$scope.activityId = "";
						$scope.activityMessage= "";
						$scope.activityMessageTitle= "";
						$scope.classId= "";
						$scope.branchId= "";
						var status = 'A';
						$scope.selectedStatus = getByValue2($scope.statusList,status);
						//var schoolId = dataService.getSchoolId();
					//	$scope.selectedSchool= getByValue3($scope.schoolList,schoolId);
						
						
						
					};
					$scope.editActivityInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "edit";
						$scope.activityId = "";
						$scope.activityMessage= "";
						$scope.activityMessageTitle= "";
						 
						$scope.classId= "";
						$scope.branchId= "";
						$scope.startDate= "";
						$scope.endDate= "";
						$scope.activityType= "";
						$scope.listStatus = 'I';
						
						$scope.activityId = $scope.gridApi.selection.getSelectedRows()[0].activityId;
						$scope.activityMessage = $scope.gridApi.selection.getSelectedRows()[0].activityMessage.trim();
						 
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
					//	$scope.selectedSchool= getByValue3($scope.schoolList,dataService.getSchoolId());
						 
						
					};

					$scope.viewActivityInfo = function() {
						 
						$scope.showBasicInfo = true;
						$scope.edit = true;
						$scope.isShowSaveButton = false;
						$scope.mode = "view";
						$scope.activityMessage = $scope.gridApi.selection.getSelectedRows()[0].activityMessage.trim();
						 alert('a1222')
						$scope.activityMessageTitle=  $scope.gridApi.selection.getSelectedRows()[0].activityMessageTitle.trim();
					 
						$scope.activityType= $scope.gridApi.selection.getSelectedRows()[0].activityType.trim();
						
						
						
					//	$scope.startDate = new Date($scope.gridApi.selection.getSelectedRows()[0].startDate.trim());
					//	 $scope.endDate=new Date($scope.gridApi.selection.getSelectedRows()[0].endDate);
						 
					//	 alert($scope.startDate);
					//	 alert($scope.gridApi.selection.getSelectedRows()[0].endDate);
						
						 var startDate1=$scope.gridApi.selection.getSelectedRows()[0].startDate;
						 
						
						 $scope.startDate=new Date(startDate1);
						 var endDate1= $scope.gridApi.selection.getSelectedRows()[0].endDate;
						 $scope.endDate=new Date(endDate1);
						 alert('--->'+endDate1);
						 $scope.endDate=new Date(endDate1);
						 
						 
						var status2 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status2);
						
					  
						/*
						$scope.address1 = $scope.gridApi.selection.getSelectedRows()[0].address.address1.trim();
						$scope.address2 = $scope.gridApi.selection.getSelectedRows()[0].address.address2.trim();
						$scope.city = $scope.gridApi.selection.getSelectedRows()[0].address.city.trim();
						$scope.state = $scope.gridApi.selection.getSelectedRows()[0].address.state.trim();
						$scope.country = $scope.gridApi.selection.getSelectedRows()[0].address.country.trim();
						$scope.emailId = $scope.gridApi.selection.getSelectedRows()[0].address.emailId.trim();
						$scope.mobileNumber = $scope.gridApi.selection.getSelectedRows()[0].address.mobileNumber.trim();
						$scope.pinCode = $scope.gridApi.selection.getSelectedRows()[0].address.pinCode.trim();
						
						$scope.addressId = $scope.gridApi.selection.getSelectedRows()[0].address.addressId;
						*/
						
					
						
					//	$scope.selectedSchool= getByValue3($scope.schoolList,dataService.getSchoolId());
					};

					$scope.removeActivityInfo = function() {
						$scope.activityId = $scope.gridApi.selection.getSelectedRows()[0].activityId;
					};

					$scope.gridOptions.columnDefs = [
					{
						name : 'activityMessageTitle'
					},
					{
						name : 'activityMessage'
					}, {
						name : 'branchId' 
						 
					}, {
						name : 'classId'
						
					},
				 
					 {
						name : 'startDate',
						 
					},
					
					 {
						name : 'status',
						 
					}];
					$scope.gridOptions.multiSelect = false;
					$scope.gridOptions.modifierKeysToMultiSelect = false;
					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
					$scope.gridApi = gridApi;
					};
					$scope.ActivityInfoClose = function() {
					$scope.showBasicInfo = false;
					};
					$scope.resetActivityInfo = function() {
					$scope.gridApi.selection.clearSelectedRows();
					$scope.showBasicInfo = false;
					$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};

					$timeout(function() {
						$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
						$(".ngViewport").focus();

					});

					function getActivityGridData() {
							
					
					 if(dataService.getLoginAsBranch())
						{
						  $scope.isShowAddButton=false;
						  $scope.isShowDeleteButton=false;
						  var activityIdObject = {
									
									
									"activityId" : dataService.getActivityId()
									}
						  
						  $http({
								method: 'POST',
								url:'http://myschool-myfirstschool.rhcloud.com/rest/activity/getActivityInfoDetailsById',
								data:activityIdObject,
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
								url:'http://myschool-myfirstschool.rhcloud.com/rest/activity/getAllActivityInfoDetailsBySchoolId',
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
					$http.get('http://myschool-myfirstschool.rhcloud.com/rest/activity/getAllActivityInfoDetailsBySchoolId')
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
				})
				 
				
				;
				
