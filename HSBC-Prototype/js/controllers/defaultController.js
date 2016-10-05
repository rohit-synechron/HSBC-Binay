var myApp = angular.module('HSBCApp');

myApp.controller('defaultController',function($scope,$state,dataStore){

	var appliedFor;
	var customerType;
	var isSalaried;

	$scope.show1 = true;
	$scope.show2 = false;
	
	$scope.showSecondStep = function(applyFor){
		appliedFor = applyFor;
		$scope.show1 = false;
		$scope.show2 = true;
		
		dataStore.store("appliedFor", applyFor).then(function () {
            //
        });
	}	

	$scope.gotoStepOne = function(type){
		customerType = type;
		dataStore.store("customerType", type).then(function () {
            if(appliedFor == "account"){
			    $state.go('step1');
			}else{
				$state.go('step1_CC');
			}
        });	
	}	
});
