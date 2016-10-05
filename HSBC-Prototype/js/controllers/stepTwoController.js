var myApp = angular.module('HSBCApp');

myApp.controller('stepTwoController',function($scope,$filter,$state,$stateParams,apiService,dataStore,datajQueryModel){
	  
  $scope.showfirstItem = false; 
  $scope.accountInfo;
  $scope.cardInfo;
  $scope.currAccount = $stateParams.accId; //This will change based on step 1 information
  $scope.currCard;
  $scope.currCardImage;
  $scope.initialCardImage;

  $scope.selectedcard = false;
  $scope.plusBtn = false;
  $scope.blankImg = false;
  $scope.cardImg = false;
  $scope.removeBtn = true;
  $scope.addCard;
  $scope.relatedCard;
  $scope.hvRelatedAcc = false; 

  $scope.Tabs = [];
  $scope.accordianTitle = "This credit card and account benefits"; 

  console.log("$stateParams.accId :"+$stateParams.accId)   

  apiService.getJSONData("data/cardsAndAccount.json").then(function(jsonData){        
     $scope.accountInfo = jsonData.AccountItems;
     $scope.cardInfo = jsonData.CardItems;
     dataStore.store("fetchCardsData", $scope.cardInfo).then(function () {
          //
      });

     dataStore.store("fetchAccountsData", $scope.accountInfo).then(function () {
          //
      });

     renderPage();
  });

  function renderPage(){
    //IMAGE UPDATE CODE
     $scope.addCard = [];
     var temp = $scope.accountInfo[$scope.currAccount-1].AddCard.split(',');    
     for(var i=0; i<temp.length; i++){
        if(temp[i] != "*" && temp[0] != ""){
          $scope.addCard.push($filter('filter')($scope.cardInfo, {ID: temp[i] })[0]);
        }
     }
      
     if(temp[0] != "*"){
        if($scope.addCard.length == 0){         
          $scope.accordianTitle = "This account benefits";
        }else{
          $scope.currCard = temp[0];
        }
     }else{
        $scope.accordianTitle = "This account benefits";
        $scope.cardImg = false;
        $scope.blankImg = true;
     }
    
     if(temp[0] != "*" && $scope.addCard.length != 0){          
       $scope.initialCardImage = ($filter('filter')($scope.cardInfo, {ID: $scope.currCard } )[0]).ImageUrl; 
       $scope.blankImg = false;
       $scope.cardImg = true;
       updateTabInfo(true);
     }else{
        $scope.cardImg = false;
        $scope.blankImg = true; 
        $scope.selectedcard = false; 
        $scope.plusBtn = true;
        updateTabInfo(false);
     }

     if($scope.addCard.length == 1){
      $scope.removeBtn = false;
     }
      
    //Related accounts
    $scope.relatedCard = [];
    $scope.relatedCard = $scope.accountInfo[$scope.currAccount-1].RelatedCard.split(',');
    if($scope.relatedCard[0] != ""){    
      $scope.hvRelatedAcc = true;  
    }else{
      $scope.hvRelatedAcc = false;
    } 
  }

  $scope.hoverIn = function(){
      this.hoverEdit = true;
  };

  $scope.hoverOut = function(){
      this.hoverEdit = false;
  };

  $scope.onRelatedCardClick = function(acc){
    $scope.currAccount = acc;
    renderPage();
  }

	$scope.gotoAccountThirdStep = function(){
    //console.log("step2-$scope.currCard:"+$scope.currCard);
    var myobj = {accId:$scope.currAccount,cardId:$scope.currCard,applyFor:"account"}
		$state.go('step3',{obj: myobj});
	}

  function updateTabInfo(onlyAcc){
      //We are taking 3 credit card and 2 account benifits
      $scope.Tabs = [];   
      if(onlyAcc){
        for(var i=0; i<3; i++){
            $scope.Tabs.push({header:$scope.cardInfo[$scope.currCard-1].Benefits[i].Title,
                content:$scope.cardInfo[$scope.currCard-1].Benefits[i].Content  
            });
        }
        for(var k=1; k<3; k++){
            $scope.Tabs.push({header:$scope.accountInfo[$scope.currAccount-1].Benefits[k].Title,
                content:$scope.accountInfo[$scope.currAccount-1].Benefits[k].Content  
            });
        }
      }else{
        for(var j=0; j<$scope.accountInfo[$scope.currAccount-1].Benefits.length; j++){
          $scope.Tabs.push({header:$scope.accountInfo[$scope.currAccount-1].Benefits[j].Title,
            content:$scope.accountInfo[$scope.currAccount-1].Benefits[j].Content  });
        }
      }
  }  

  $scope.onRemoveCardClick = function(){
     $scope.accordianTitle = "This account benefits";
    
      $scope.blankImg = true;
      $scope.cardImg = false;
      $scope.plusBtn = true;
      updateTabInfo(false);
  };

  $scope.onCardOptionClick = function(card){      
      $scope.accordianTitle = "This credit card and account benefits";
      
      $scope.selectedcard = true;
      $scope.plusBtn = false;
      $scope.cardImg = true;
      $scope.blankImg = false;

      $scope.currCard = card.ID;
      $scope.initialCardImage = $scope.cardInfo[$scope.currCard-1].ImageUrl;
      //$scope.currCardImage = $scope.cardInfo[$scope.currCard-1].ImageUrl;
      updateTabInfo(true);
  };
});