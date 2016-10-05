var myApp = angular.module('HSBCApp');

myApp.controller('stepFourCCController',function($scope,$filter,$state,$stateParams,dataStore){       
    $scope.accountInfo;
    $scope.cardInfo;
    $scope.currCardImage;

    $scope.currCard = $state.params.obj.cardId;
    $scope.currAccount = $state.params.obj.accId;
    $scope.appliedFor = $state.params.obj.applyFor;
    $scope.refNumber = $state.params.obj.refNo;
    $scope.headTitle;
    $scope.calender = false;

   
    //2nd box details
    $scope.ccLimit = "AED 50,000";
    $scope.ccFeesAndCharges = "Free for life";
    $scope.ccIntRate = "2.25%";

    var mybtn = angular.element( document.querySelector('#card-setup'));
    var scr = angular.element( document.querySelector('#cardSetupScr'));
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
          $scope.headTitle = $scope.cardInfo[$scope.currCard-1].Title;       
          $scope.ccFeesAndCharges = $scope.cardInfo[$scope.currCard-1].FeesAndCharges;
      });
  });

    $scope.onDateClick = function(){
      console.log("onDateClick called")
      var mytimepicker = angular.element( document.querySelector('#timepicker'));
      if(mytimepicker.hasClass('hide')) {
        mytimepicker.removeClass('hide');
      }else{
        mytimepicker.addClass('hide');
      }
    }
});