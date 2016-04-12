app
		.controller(
				'entitilmentController',
				function($scope, $http, $log, $timeout, uiGridConstants,
						dataService) {

					
					$scope.gridOptions = {
						enableRowSelection : true,
						enableRowHeaderSelection : false
					};

					
					getEntitilmentGridData();	
					
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
					
 
					$scope.postEntitilmentForm = function() {

					 var dataObj = {
							"groupCode" : ($scope.groupCode),
							"menuId" : ($scope.menuId),
							"status" : ($scope.selectedStatus.value),
							"menuCode" : ($scope.menuCode)
 
						}
					 
						var url = 'http://myschool-myfirstschool.rhcloud.com/rest/menu/createmenuDetails';

						if ($scope.mode == 'edit')
						{
							url = 'http://myschool-myfirstschool.rhcloud.com/rest/menu/modifymenuDetails';
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
													alert("Entitilment information edited sucessfully.");
												} else {
													alert("Entitilment information created sucessfully.");
												}
												$scope.showBasicInfo = false;
												getEntitilmentGridData();
												 } else {
												$scope.errorMsg = "Unable to submit Entitilment form";
											}
										})
								.error(function(data, status, headers, config) {
									$scope.errorMsg = 'Unable to submit form';
								})
					}

					$scope.showBasicInfo = false;
					$scope.addEntitilmentInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "add";
					 
						
						$scope.groupCode = "";
						$scope.menuId = "";
						$scope.menuCode = "";
						var status = 'A';
						$scope.selectedStatus = getByValue2($scope.statusList,status);
	  					
					};
					$scope.editEntitilmentInfo = function() {
						$scope.showBasicInfo = true;
						$scope.isShowSaveButton = true;
						$scope.edit = false;
						$scope.mode = "edit";
						$scope.groupCode = "";
						$scope.menuId = "";
						$scope.menuCode = "";
						var status = 'A';
		
						$scope.menuId = $scope.gridApi.selection.getSelectedRows()[0].menuId;
						$scope.groupCode = $scope.gridApi.selection.getSelectedRows()[0].groupCode.trim();
						$scope.menuCode = $scope.gridApi.selection.getSelectedRows()[0].menuCode.trim();
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
						
					};

					$scope.viewEntitilmentInfo = function() {
						$scope.showBasicInfo = true;
						$scope.edit = true;
						$scope.isShowSaveButton = false;
						$scope.mode = "view";
						$scope.menuId = $scope.gridApi.selection.getSelectedRows()[0].menuId;
						$scope.groupCode = $scope.gridApi.selection.getSelectedRows()[0].groupCode.trim();
						$scope.menuCode = $scope.gridApi.selection.getSelectedRows()[0].menuCode.trim();
						var status1 = $scope.gridApi.selection.getSelectedRows()[0].status.trim();
						$scope.selectedStatus = getByValue2($scope.statusList,status1);
											};

					$scope.removeEntitilmentInfo = function() {
						$scope.entitilmentId = $scope.gridApi.selection.getSelectedRows()[0].entitilmentId;
					};

					$scope.gridOptions.columnDefs = [

					{
						name : 'menuId'
					}, {
						name : 'groupCode',
						 
					}, {
						name : 'menuCode',
						 
					} ];
					$scope.gridOptions.multiSelect = false;
					$scope.gridOptions.modifierKeysToMultiSelect = false;
					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
					$scope.gridApi = gridApi;
					};
					$scope.entitilmentInfoClose = function() {
					$scope.showBasicInfo = false;
					};
					$scope.resetEntitilmentInfo = function() {
					$scope.gridApi.selection.clearSelectedRows();
					$scope.showBasicInfo = false;
					$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};

					$timeout(function() {
						$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
						$(".ngViewport").focus();

					});

					function getEntitilmentGridData() {
							
 
					$http.get('http://myschool-myfirstschool.rhcloud.com/rest/menu/getAllmenuInfoDetails')
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
 				});
				
