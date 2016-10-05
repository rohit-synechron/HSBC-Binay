var myApp = angular.module('HSBCApp');

myApp.controller('stepOneCCController',function($scope,$state,datajQueryModel,dataStore){
  var monthlyBal, residentialStatus;
  var salaried = true;
  
  $scope.salariedForm = true;
  $scope.selfEmpForm = false;

  $scope.balance = ['Your Average monthly balance',
                  'AED 0 - 100,000',
                  'AED 100,000 - 350,000',
                  'AED 350,000 and above'
                  ];   
  $scope.selectBalance = $scope.balance[0];

  $scope.resStatus = ['Your UAE Residency Status',
                        'Resident',
                        'Residency In Process',
                        'Not A Resident'
                        ];

  $scope.selectResStatus = $scope.resStatus[0];
  

  $scope.onEmpNatureClick = function(isSalary){
    salaried = isSalary;
    if(!isSalary){
      $scope.salariedForm = false;
      $scope.selfEmpForm = true;
    }else{
      $scope.salariedForm = true;
      $scope.selfEmpForm = false;
    }
  }

  $scope.GetMonthlyBalValue = function (bal) {   
    monthlyBal = $scope.balance.indexOf($scope.selectBalance);
  }

  $scope.GetResStatusValue = function (st) { 
    residentialStatus = $scope.resStatus.indexOf($scope.selectResStatus);
  }
  
  $scope.checkAllFilled = function(){
    var count = 0;
    if(!salaried){
      if(monthlyBal > 0 && residentialStatus > 0){
        count = 1;
        angular.element(document.querySelector("#step1Account")).removeClass("disabled");
      }else if(monthlyBal == 0 || residentialStatus == 0){
        count = 0;
        angular.element(document.querySelector("#step1Account")).addClass("disabled");
      }
    }else{
      console.log($scope.mySal+"--"+$scope.myCompany+"--"+monthlyBal+"--"+residentialStatus)
      if($scope.mySal != undefined && $scope.myCompany!= undefined && monthlyBal > 0 && residentialStatus > 0){
        count = 1;
        angular.element(document.querySelector("#step1Account")).removeClass("disabled");
      }else if($scope.mySal == undefined || $scope.myCompany== undefined || monthlyBal == 0 || residentialStatus == 0){
        count = 0;
        angular.element(document.querySelector("#step1Account")).addClass("disabled");
      }
    }
    return count;
  }  

  $scope.gotoAccountsStepTwoCC = function(){
    var userCardId = 1;
    if(!salaried){
      //Do not have salary field here, show 1st card always
      userCardId = 1;      
    }else{
      if($scope.mySal > 50000){
        userCardId = 1;
      }else  if($scope.mySal == 50000){
        userCardId = 2;
      }else  if($scope.mySal >= 15000 && $scope.mySal <= 49999){
        userCardId = 3;
      }else  if($scope.mySal >= 7500 && $scope.mySal <= 14999){
        userCardId = 4;
      }
    }
    $state.go('step2_CreditCard',{cardId:userCardId});
  }
});
