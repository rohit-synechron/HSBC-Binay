var myApp = angular.module('HSBCApp');

myApp.controller('stepFourController',function($scope,$filter,$state,$stateParams,dataStore,datajQueryModel){	      
    $scope.accountInfo;
    $scope.cardInfo;
    $scope.currCardImage;

    $scope.currCard = $state.params.obj.cardId;
    $scope.currAccount = $state.params.obj.accId;
    $scope.appliedFor = $state.params.obj.applyFor;
    $scope.refNumber = $state.params.obj.refNo;
    $scope.headTitle;
    $scope.box1Title;

    $scope.accDetails = true;
    $scope.ccDetails = false;
    $scope.calender = false;

    //2nd box details

    var randomNum = Math.floor(Math.random() * 900000) + 100000;
    $scope.accNo = "ACC"+randomNum;
    $scope.sccBelowBalFee = "AED 200 per month";
    $scope.overdraftLim = "AED 25,000";
    $scope.overdrafIntLimit = "AED 15,000";
    $scope.overdraftIntRate = "19% p.a. on balance over interest free limit*";
    $scope.ccLimit = "AED 25,000";
    $scope.ccFeesAndCharges = "";
    $scope.ccIntRate = "2.95%";


    console.log("$scope.currCard :"+$scope.currCard)  
    console.log("$scope.currAccount :"+$scope.currAccount)  
    console.log("$scope.appliedFor :"+$scope.appliedFor)    

    var mybtn = angular.element( document.querySelector('#card-setup'));
    var scr = angular.element( document.querySelector('#cardSetupScr'));

    var accDetails = angular.element( document.querySelector('#acc'));
    var ccDetails = angular.element( document.querySelector('#crd'));

    mybtn.click(function(e){
       if(!scr.hasClass('opened')) {
        scr.slideDown(1000,function(){$(this).addClass('opened')});
       } else {
        scr.slideUp(1000,function(){$(this).removeClass('opened')});
      }
    });

    var mybtn1 = angular.element( document.querySelector('#supplementary-button'));
    var scr1 = angular.element( document.querySelector('#sppCardScr1'));
    var scr2 = angular.element( document.querySelector('#sppCardScr2'));
    mybtn1.click(function(e){
       if(!scr1.hasClass('opened')) {
        scr1.slideDown(1000,function(){$(this).addClass('opened')});
        scr2.slideDown(1000,function(){$(this).addClass('opened')});
       } else {
        scr1.slideUp(1000,function(){$(this).removeClass('opened')});
        scr2.slideUp(1000,function(){$(this).removeClass('opened')});
      }
    }); 
    

    dataStore.getData("fetchCardsData").then(function (cardData) {
      $scope.cardInfo = cardData;

      dataStore.getData("fetchAccountsData").then(function (accData) {
          $scope.accountInfo = accData;
          $scope.ccFeesAndCharges = $scope.cardInfo[$scope.currCard-1].FeesAndCharges;
          if($scope.appliedFor == "card"){
            $scope.headTitle = $scope.cardInfo[$scope.currCard-1].Title;
            $scope.box1Title = $scope.headTitle;            
          }else{
            if($scope.currCard != undefined){
              $scope.headTitle = $scope.accountInfo[$scope.currAccount-1].Title+" and "+$scope.cardInfo[$scope.currCard-1].Title;
              $scope.box1Title = $scope.accountInfo[$scope.currAccount-1].Title+" and Card";
            }else{
              $scope.headTitle = $scope.accountInfo[$scope.currAccount-1].Title;
              $scope.box1Title = $scope.headTitle;
            }
          }

          $scope.onAccDetailsClick = function(){
            console.log("onAccDetailsClick called")
            $scope.accDetails = true;
            $scope.ccDetails = false;
            accDetails.addClass('active');
            ccDetails.removeClass('active');
          }

          $scope.onCCDetailsClick = function(){
            console.log("onCCDetailsClick called")
            $scope.accDetails = false;
            $scope.ccDetails = true;
            ccDetails.addClass('active');
            accDetails.removeClass('active');
          }
          
      });
  });

  $scope.onDateClick = function(){    
    var mytimepicker = angular.element( document.querySelector('#timepicker'));
    if(mytimepicker.hasClass('hide')) {
      mytimepicker.removeClass('hide');
    }else{
      mytimepicker.addClass('hide');
    }
  }
});