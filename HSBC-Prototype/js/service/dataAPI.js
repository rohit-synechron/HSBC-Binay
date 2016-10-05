/**
 * Created by Pramod.Bichkule on 9/7/2016.
 */

var myApp = angular.module('HSBCApp');
myApp.factory('apiService', ["$http", "$q", function($http, $q){
        function apiService() {
        var self = this;
        self.URLData = null;

        self.getJSONData = function(jsonURL) {
            // Create a deferred operation.
            var deferred = $q.defer();

            //If we already have the customURLs object, we can resolve the promise.
            if(self.URLData !== null) {
                deferred.resolve(self.config);
            } else {
                //Get the customURLs JSON data from the server.
                $http.get(jsonURL)
                    .then(function(response) {
                        self.URLData = response.data;
                        deferred.resolve(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                        deferred.reject(error);
                    });
            }
            //return the promise.
            return deferred.promise;
        };
    }
    return new apiService();
}]);

myApp.factory('dataStore', ["$q","$rootScope","$timeout", function($q,$rootScope,$timeout) {
        function dataStore(){
            var self = this;
            self.appData = {};

            self.store = function(k,v) {
                if (!self.appData)
                self.appData = {};

                if (self.appData[k]) {
                    $timeout(function() {
                        $rootScope.$broadcast(k + ':updated');
                        console.log(k + ':updated' + "  [dataStore]");
                    });
                }
                else {
                    $timeout(function() {
                    $rootScope.$broadcast(k+':created');
                    console.log(k+':created' + "  [dataStore]");
                    });
                }

                var deferred = $q.defer();
                self.appData[k] = v;
                deferred.resolve();
                return deferred.promise;
            };

            self.getData = function(k) {
                var deferred = $q.defer();

                if (self.appData){
                    if (self.appData[k]) {
                        deferred.resolve(self.appData[k]);
                    }
                    else {
                        deferred.reject(JSON.parse('{"' + k + '": "failed"}'));
                    }
                } else {
                    deferred.reject(JSON.parse('{"' + k + '": "failed"}'));
                }

                return deferred.promise;
            };

            self.eraseData = function(k){
               delete self.appData[k];
            }
        }
        return new dataStore();
    }]);
