(function(){
  'use strict';

  /**
  * @ngdoc function
  * @name dashboardApp.controller:LoginIndexCtrl
  * @description
  * # LoginIndexCtrl
  * Controller of the dashboardApp
  */
  angular.module('dashboardApp')
  .controller('SignupIndexCtrl', ['$location', '$scope', 'Authentication', function ($location, $scope, Authentication) {
    var ctrl = this;

    this.signup = function(){
      Authentication.signup(ctrl)
      .then(function(data){
        Authentication.login(ctrl).then(function(){
          Authentication.logged();
        });
      })
      .catch(function(error){
        ctrl.username = '';
        ctrl.password = '';
        ctrl.confirmPassword = '';
        ctrl.email = '';
        $scope.message = error.message;
      });
    };
  }]);
}());
