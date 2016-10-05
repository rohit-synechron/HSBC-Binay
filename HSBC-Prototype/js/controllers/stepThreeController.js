var myApp = angular.module('HSBCApp');

myApp.controller('stepThreeController',function($scope,$filter,$http,$state,$stateParams,dataStore){

  var callButtonFlag = false;
  $scope.firstname = "";
  $scope.lastname = "";
  $scope.isAccountView = false;
  $scope.isCardView = false;
  $scope.activeTabs = [];
  $scope.activeTabs.push("one");
  $scope.accountInfo;
  $scope.cardInfo;
  $scope.summary;
  $scope.refNumber = "";
  $scope.isRefGenerated = false;

  $scope.currCard = $state.params.obj.cardId;
  $scope.currAccount = $state.params.obj.accId;
  $scope.appliedFor = $state.params.obj.applyFor;

  $scope.fieldData;
  $scope.paenlOneData = [];
  $scope.paenlTwoData = [];
  $scope.paenlThreeData = [];
  $scope.paenlFourData = [];

  $scope.showRelatedProducts = true;
  $scope.Tabs = [];
  console.log("---:---");
  console.log($state.params.obj);  

  $scope.$on('onFNameChange', function(event, param){ 
    $scope.firstname = param;
  })
  $scope.$on('onLNameChange', function(event, param){
    $scope.lastname = param;
  })

  dataStore.getData("fetchCardsData").then(function (cardData) {
    $scope.cardInfo = cardData;    
    dataStore.getData("fetchAccountsData").then(function (accData) {
        $scope.accountInfo = accData;

        if($scope.appliedFor == "card"){
          $scope.summary = $scope.cardInfo[$scope.currCard-1].Summary;          
          $scope.isCardView = true;
        }else{
          $scope.summary = $scope.accountInfo[$scope.currAccount-1].Summary;
          $scope.isAccountView = true;
        }

        updateTabInfo();
    });
  });

// $('.panel-collapse.collapse').on('hidden.bs.collapse', function () {
//     $(this).prev().find('a[role="button"]').css({
//       "background-color": "#FFF",
//       "color": "#000",
//       "background-image": "url('images/plus-sign-red.png')",
//       "background-repeat": "no-repeat",
//       "background-position": "96% center"
//     });
//   });
//   $('.panel-collapse.collapse').on('shown.bs.collapse', function () {
//    $(this).prev().find('a[role="button"]').css({
//              "background-color": "#db0011",
//              "color": "#FFF",
//              "background-image": "url('images/edit-sign.png')",
//              "background-repeat": "no-repeat",
//              "background-position": "96.5% center"
//            });
//   });

  var btns =$('.status-button');
  $(btns[0]).click(function(){


    var randomNum = Math.floor(Math.random() * 900000) + 100000;    
    $scope.refNumber = "AE"+randomNum;
    $scope.isRefGenerated = true;
    $('#saveforlater').removeClass('disabledbtn');
    $scope.$digest();
  });
    $(btns[3]).click(function(){
        console.log('click');
        $('#related-products').removeClass('collapse');
    });
  $(btns).click(function(){
    //console.log($(this).closest('.panel').next().find('.collapse'))
    var nextele =  $(this).closest('.panel').next();
    if($(nextele).hasClass('panel')){
      var p = $(this).closest('.panel').next().find('.panel-heading').find('a');
     p.trigger('click');
      $(this).closest('.panel').next().find('a.collapsed').removeClass('disabledTrue');
      $(this).closest('.panel').find('a').css({
             "background-color": "#FFF",
             "color": "#000",
             "background-image": "url('images/plus-sign-red.png')",
             "background-repeat": "no-repeat",
             "background-position": "96% center"
           });

    $(this).closest('.panel').next().find('a.collapsed').css({
             "background-color": "#db0011",
             "color": "#FFF",
             "background-image": "url('images/edit-sign.png')",
             "background-repeat": "no-repeat",
             "background-position": "96.5% center"
           });
    } else{
       var p = $(this).closest('.panel').next().next().find('.panel-heading').find('a');
       p.trigger('click');
      $(this).closest('.panel').next().next().find('a.collapsed').removeClass('disabledTrue');
      $(this).closest('.panel').find('a').css({
             "background-color": "#FFF",
             "color": "#000",
             "background-image": "url('images/plus-sign-red.png')",
             "background-repeat": "no-repeat",
             "background-position": "96% center"
           });

    $(this).closest('.panel').next().next().find('a.collapsed').css({
             "background-color": "#db0011",
             "color": "#FFF",
             "background-image": "url('images/edit-sign.png')",
             "background-repeat": "no-repeat",
             "background-position": "96.5% center"
           });
    }
       
    $(this).closest('.panel').find('a').removeClass('disabledTrue');


  });


$http.get('data/step3FieldsNew.json').success(function(response){
  console.log(response);
  $scope.fieldData=response;
  $scope.PanelOne= $scope.fieldData.PanelOne;
  $scope.PanelTwo= $scope.fieldData.PanelTwo;
  $scope.PanelThree= $scope.fieldData.PanelThree;
  $scope.PanelFour= $scope.fieldData.PanelFour;
  $scope.PanelFive= $scope.fieldData.PanelFive;  
});

  function updateTabInfo(){    
      $scope.Tabs = [];
      var cCount = 0;
      var aCount = 0;
      if($scope.currCard != undefined && $scope.currAccount != undefined){
        cCount = 3;
        aCount = 2
      }else if($scope.currCard == undefined){
        aCount = 4;
      }else if($scope.currAccount == undefined){
        cCount = 4;
      }

      for(var i=0; i<cCount; i++){
          $scope.Tabs.push({header:$scope.cardInfo[$scope.currCard-1].Benefits[i].Title,
              content:$scope.cardInfo[$scope.currCard-1].Benefits[i].Content  
          });
      }
      for(var k=0; k<aCount; k++){
          $scope.Tabs.push({header:$scope.accountInfo[$scope.currAccount-1].Benefits[k].Title,
              content:$scope.accountInfo[$scope.currAccount-1].Benefits[k].Content  
          });
      }
  }

  $scope.onCallButtonClick = function(){
    var myEl = angular.element( document.querySelector('#callbuttonScreen'));
    if(!callButtonFlag){      
      myEl.removeClass('hide');
      callButtonFlag = true;
    }else{
      myEl.addClass('hide');
      callButtonFlag = false;
    }
  }

  $scope.gotoAccountsStepFour = function(){    
    var myobj = {cardId:$scope.currCard,accId:$scope.currAccount,applyFor:$scope.appliedFor,refNo:$scope.refNumber};
    if(myobj.applyFor == "card"){
      $state.go('step4_CreditCard',{obj: myobj});
    }else{
      $state.go('step4',{obj: myobj});
    }
  }


  $scope.fileNameChanged = function (ele) {
    var files = ele.files;
    console.log(files);

    $http.get('data/passport.json').success(function(res){
      console.log(res);
      
      //updatePanelObj(res);
    });

  }

  function updatePanelObj(res){
    console.log(res);    
    console.log($scope.fieldData);
    //console.log(Object.keys(res).length);     
    
    for(var keyName in res){
       // console.log(keyName + ":::: "+res[keyName])
        var rowObj;
        for(var key in $scope.fieldData.PanelOne){            
          rowObj = $scope.fieldData.PanelOne[key];
          for(var i=0; i<Object.keys(rowObj).length; i++){
            if((rowObj[i].backendField) == keyName){
              rowObj[i].DataValues = res[keyName];
            }
          }
        }

        for(var key in $scope.fieldData.PanelTwo){            
          rowObj = $scope.fieldData.PanelTwo[key];
          for(var i=0; i<Object.keys(rowObj).length; i++){
            if((rowObj[i].backendField) == keyName){
              rowObj[i].DataValues = res[keyName];
            }
          }
        }
    } 

    console.log("AFTER UPDATE");
    console.log($scope.fieldData);

    $scope.PanelOne= $scope.fieldData.PanelOne;
    $scope.PanelTwo= $scope.fieldData.PanelTwo;
    $scope.PanelThree= $scope.fieldData.PanelThree;
    $scope.PanelFour= $scope.fieldData.PanelFour;
    $scope.PanelFive= $scope.fieldData.PanelFive;
  }

  
  
  //check if the tab is active
  $scope.isOpenTab = function (tab) {
      //check if this tab is already in the activeTabs array
      if ($scope.activeTabs.indexOf(tab) > -1) {
          //if so, return true          
          return true;
      } else {
          //if not, return false
          return false;
      }
  }
   
   $scope.selected1 = "one";
   $scope.selected2 = "";
   console.log($scope.selected2);
   console.log($scope.selected1);
  //function to 'open' a tab
  $scope.openTab = function (tab) {
  	  if(tab === "one"){
  	  	$scope.selected1 = tab;
  	  	$scope.selected2 = "";
   	  }
   	  else if(tab === "two"){
   	  	$scope.selected2 = tab;
   	  	$scope.selected1 = "";
   	  }

  	  $scope.activeTabs = [];
  	  $scope.activeTabs.push(tab);
      //check if tab is already open
      //if ($scope.isOpenTab(tab)) {
          //if it is, remove it from the activeTabs array
          //$scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
      //} else {
          //if it's not, add it!
          //$scope.activeTabs.push(tab);
      //}
  }

  $scope.openRelatedProducts = function(){
  	$scope.showRelatedProducts = false;
  }


  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    var p = $('#collapseOne').find('.panel-body').children();
    // console.log(">>>>>>>>>>>>>",p);
  });

  var p = angular.element(document.querySelector("#collapseOne")).children();
  console.log("-------------",$(p));
  console.log($())

  // var m =angular.element(p).childern();


})

    .directive("custDir", function($compile) {
      return {
        restrict: "E",
        replace:true,
        link: function (scope, ele, attr) {
          // ele.append($compile(angular.element('<div '+attr.datatype+'="" inputType='+attr.datavalue+'></div>'))(scope));
          
          if(attr.datavalue){
            var data = JSON.parse(attr.datavalue);
          }
          else{
            var data = attr.datavalue;
          }
          ele.append($compile(angular.element('<div dataholder="'+attr.dataholder+'" '+attr.datatype+'="" inputType="'+data+'"></div>'))(scope));
        }
      }
    })

    .directive("select", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype.split(',');
          // scope.selectedValue=scope.typevalue[0];
          scope.selectedValue=attr.dataholder;
          // scope.placeHolder=attr.dataholder;

        },
        template: "<select class='change-color custSelect'><option ng-repeat='d in typevalue track by $index'>{{d}}</option></select>"
        //   template:"<div bs-dropdown bs-dropdown-display='MyBalance' ng-model='selectedValue' bs-dropdown-items='typevalue' class='change-color custSelect'></div>"
      }
    })


    .directive("input", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;
          // scope.classValue = attr.dataholder;
          // console.log(ele[0].attributes.dataholder.nodeValue)
          // if((ele[0].attributes.dataholder.nodeValue== "Previous/other first name(s)") || (ele[0].attributes.dataholder.nodeValue== "Previous/other Last name(s)")){
          //   // ele.css("display","none");
          //   console.log($(ele));
          // }


        },
        template: "<input class=' border-input change-color' type='text' ng-model='typevalue' placeholder='{{placeHolder}}' required/>"
      }
    })

    .directive("firstname", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;
          
          scope.$watch('fname', function(newValue, oldValue) {            
            scope.$emit('onFNameChange', newValue);           
          });

        },
        template: "<input class=' border-input change-color'  type='text' ng-model='fname' placeholder='{{placeHolder}}' required/>"
      }
    })

    .directive("lastname", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;

          scope.$watch('lname', function(newValue, oldValue) {                 
            scope.$emit('onLNameChange', newValue);            
          });
        },
        template: "<input class=' border-input change-color'  type='text' ng-model='lname' placeholder='{{placeHolder}}' required/>"
      }
    })

    .directive("email", function() {
        return {
            scope: {
                'typeValue' : '@',
                'placeHolder':'@'
            },
            restrict: "A",
            link: function(scope,ele,attr){
                scope.typevalue = attr.inputtype;
                scope.placeHolder=attr.dataholder;

                scope.$watch('email', function(newValue, oldValue) {
                    scope.$emit('onLNameChange', newValue);
                });
            },
            template: "<input class=' border-input change-color'  type='email' ng-model='email' placeholder='{{placeHolder}}' required/>"
        }
    })
    
    

    .directive("date", function() {
      return {
          scope: {
            'typeValue' : '@',
            'placeHolder':'@',
            'datepickerOptions':'@'
          },
          restrict: "A",
          controller:function($scope){

          },
          link: function(scope,ele,attr){
            scope.typevalue = attr.inputtype;
            scope.placeHolder=attr.dataholder;
          },
          template: "<input type='date' class='change-color'>"
      }
    })

    .directive("numeric", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;
        },
        template: "<input class=' border-input change-color' type='number' ng-model='typevalue' placeholder='{{placeHolder}}' required/>"
      }
    })

    .directive("subheading", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;
        },
        template: "<div class='form-subheading remove-margin-top'><span>{{placeHolder}}</span></div>"
      }
    })

    .directive("subtext", function() {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.placeHolder=attr.dataholder;
        },
        template: "<div class='form-question'>{{placeHolder}}</div>"
      }
    })

    .directive("radio", function($compile) {
      return {
        scope: {
          'typeValue' : '@',
          'placeHolder':'@'
        },
        restrict: "A",
        link: function(scope,ele,attr){
          scope.typevalue = attr.inputtype;
          scope.selectedValue=scope.typevalue.split(',');
          // ele.append($compile(angular.element("<a class='radio-yes-1'>{{selectedValue[0]}}</a> <a class='radio-no-1'>{{selectedValue[1]}}"))(scope));
        },
        // template: "<select class=''><option ng-repeat='d in typevalue track by $index'>{{d}}</option></select>"
        template:"<a class='radio-yes-1'>{{selectedValue[0]}}</a> <a class='radio-no-1'>{{selectedValue[1]}}</a>"
      }
    })

    .directive("changeColor", function() {
      return {
        restrict: "C",
        link: function(scope,ele,attr){
          // console.log(ele);
          var inputs;
          var fill = 0;
          var evt;
          if($(ele).hasClass('custSelect')){
            evt = 'change'
          }
          else{
            evt = 'blur'
          }
          var cnt;
          ele.on(evt,function(e){
            cnt = 0;
            //console.log($(this).closest('form').find('.change-color'))
            inputs = $(this).closest('form').find('.change-color');
            var length = inputs.length;
            inputs.each(function(){
             var  tag= $(this).prop("tagName") ;
              if(($(this).val() == '') || ($(this).val() == 'Title') || ($(this).val() == 'Country of Citizenship') || ($(this).val() == 'Country of Birth') || ($(this).val() == 'Gender') ||($(this).val() == 'Marital Status')
              || ($(this).val() == 'Dependents Number') ||($(this).val() == 'Education Level') || ($(this).val() == 'Residence City') ||($(this).val() == 'Residence Country')||($(this).val() == 'Residence Accommodation')||
                  ($(this).val() == 'Home Country') ||($(this).val() == 'Job Occupation')||($(this).val() == 'Job Employment Type')||($(this).val() == 'Job Employment Status')||($(this).val() == 'Industry')||($(this).val() == 'Business Sector')||($(this).val() == 'Office Country')||($(this).val() == 'Office City')||
                  ($(this).val() == 'Branch Location')||($(this).val() == 'Preffered Address')||($(this).val() == '')||($(this).val() == '')){
                //$(e.target).css('border-bottom','2px solid red');
              }else{
                cnt = cnt+ 1;
              }
              if($(e.target).val() == ''){
                $(e.target).css('border-bottom','2px solid red');
              }else {
                $(e.target).css('border-bottom','2px solid black');
              }
              fill = 100* cnt/length;
            });
            $(this).closest('form').find('.btnspan').css('width',fill+'%')
            if(fill >= 100){
              //console.log($(this).closest('form').find('.status-button'))
              $(this).closest('form').find('.status-button').removeClass('disabledbtn')
              // $(this).closest('.panel').next().find('a').removeClass('disabledTrue')
            }
            console.log(length,cnt,fill)
          });
        }
      }
    });