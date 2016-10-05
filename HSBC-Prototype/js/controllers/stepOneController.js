'use strict';
var myApp = angular.module('HSBCApp');

myApp.controller('stepOneController',function($scope,$state,datajQueryModel,dataStore){

  var monthlyBal, residentialStatus;
  var accountType = 1;
  var salaried = true;

  $scope.salariedForm = true;
  $scope.selfEmpForm = false;
    
  $scope.balance = ['Average monthly balance',
                  'AED 0 - 100,000',
                  'AED 100,000 - 350,000',
                  'AED 350,000 and above'
                  ];   
  $scope.selectBalance = $scope.balance[0];

  $scope.resStatus = ['UAE Residency Status',
                        'Resident',
                        'Residency In Process',
                        'Not A Resident'
                        ];

  $scope.selectResStatus = $scope.resStatus[0];

  $scope.accType = [
                        'Sole Account',
                        'Joint Account'
                     ];
  $scope.selectAccType = $scope.accType[0];

  $scope.onEmpNatureClick = function(isSalary){
    salaried = isSalary;
    if(!isSalary){
      $scope.salariedForm = false;
      $scope.selfEmpForm = true;
    }else{
      $scope.salariedForm = true;
      $scope.selfEmpForm = false;
    }
    resetFields();
  }

  function resetFields(){ 
    $scope.selectResStatus = $scope.resStatus[0];
    $scope.selectBalance = $scope.balance[0];
    $scope.selectAccType = $scope.accType[0];
    console.log($scope.selectAccType)
    $scope.mySal = "";
  }

  $scope.GetMonthlyBalValue = function () {
    monthlyBal = $scope.balance.indexOf($scope.selectBalance);
  }

  $scope.GetResStatusValue = function () {      
    residentialStatus = $scope.resStatus.indexOf($scope.selectResStatus);
  }

  $scope.GetAccTypeValue = function () {      
    accountType = $scope.accType.indexOf($scope.selectAccType);
  }

  $scope.checkAllFilled = function(){
    var count = 0;
    //console.log("monthlyBal:"+monthlyBal+"::residentialStatus:"+residentialStatus);
    console.log(salaried)
    console.log("$scope.mySal:"+$scope.mySal+"::monthlyBal:"+monthlyBal+"::residentialStatus:"+residentialStatus)
    if(!salaried){
      if(monthlyBal > 0 && residentialStatus > 0){
        count = 1;
        angular.element(document.querySelector("#step1Account")).removeClass("disabled");
      }else if(monthlyBal == 0 || residentialStatus == 0){
        count = 0;
        angular.element(document.querySelector("#step1Account")).addClass("disabled");
      }
    }else{
      if($scope.mySal != undefined && monthlyBal > 0 && residentialStatus > 0){        
        count = 1;
        angular.element(document.querySelector("#step1Account")).removeClass("disabled");
      }else if($scope.mySal == undefined || monthlyBal == 0 || residentialStatus == 0){
        count = 0;
        angular.element(document.querySelector("#step1Account")).addClass("disabled");
      }
    }   
    return count;
  }  

  $scope.gotoAccountsStepTwo = function(){
    var userAccId = 1;
    if(!salaried){
      if(monthlyBal == 3){
        userAccId = 1;
      }else  if(monthlyBal == 2){
        userAccId = 3;
      }else  if(monthlyBal == 1){
        userAccId = 5;
      }
    }else{
      if($scope.mySal > 50000 || monthlyBal == 3){
        userAccId = 1;
      }else  if($scope.mySal == 50000 || monthlyBal == 3){
        userAccId = 2;
      }else  if(($scope.mySal > 15000 && $scope.mySal <= 49999) || monthlyBal == 2){
        userAccId = 3;
      }else  if($scope.mySal == 15000 || monthlyBal == 2){
        userAccId = 4;
      }else  if(($scope.mySal > 7500 && $scope.mySal <= 14999) || monthlyBal == 1){
        userAccId = 5;
      }else  if($scope.mySal <= 7500 || monthlyBal == 1){
        userAccId = 6;
      }
    }

    $state.go('step2',{accId:userAccId});
  }
});