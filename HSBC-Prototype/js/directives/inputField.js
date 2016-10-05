var myApp = angular.module('HSBCApp');

myApp.directive("helloWorld", function(){
  return {
    require: "?ngModel",
    scope: true,
    //restrict: 'AE',
    //replace: 'true',
    template: "<input type='text' name='name' class='border-input' id='first_name' placeholder='First name on passport' ng-change='onChange()'>"
    
    //template: "<input ng-model='value' ng-change='onChange()'>",
    /*link: function(scope, element, attrs, ngModel){
      if (!ngModel) return;

      scope.onChange = function(){
        ngModel.$setViewValue(scope.value);
      };

      ngModel.$render = function(){
        scope.value = ngModel.$modelValue;
      };
    }*/
  };
});