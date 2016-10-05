var HSBCApp = angular.module('HSBCApp', ['ui.router','ngAnimate','ui.bootstrap','ng.bs.dropdown','ngInputDate']);

HSBCApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1 
  $urlRouterProvider.otherwise("/");

  // Now set up the states 
  $stateProvider
    .state('defaultState', {
      url: "/",
      templateUrl: "view/default.html",
      controller: "defaultController"
    })
    .state('step1', {
            url: '/step1',            
            templateUrl: 'view/step-1.html'
    })  
    .state('step1_CC', {
            url: '/step1_CC',           
            templateUrl: 'view/step-1_creditCard.html'
    })
    .state('step2', {
            url: '/step2/:accId',
            templateUrl: 'view/step-2.html'
    })
    .state('step2_CreditCard', {
            url: '/step2_CreditCard/:cardId',
            templateUrl: 'view/step-2_CreditCard.html'
    })
    .state('step3', {
            url: '/step3', 
            params:{
                obj: null
            },          
            templateUrl: 'view/step-3.html'
    })
    .state('step3_CreditCard', {
            url: '/step3_CreditCard',
            params:{
                obj: null
            },            
            templateUrl: 'view/step-3.html'
    })
    .state('step4', {
            url: '/step4',
            params:{
                obj: null
            },            
            templateUrl: 'view/step-4.html'
    })
    .state('step4_CreditCard', {
            url: '/step4_CreditCard',
            params:{
                obj: null
            },            
            templateUrl: 'view/step-4_CreditCard.html'
    })
    
});

HSBCApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess',function(){
        $("html, body").animate({ scrollTop: 0 }, 200);
    })
 })