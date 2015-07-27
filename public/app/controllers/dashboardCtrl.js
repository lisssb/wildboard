'use strict';
angular.module('dashboardApp')
.controller('dashboardCtrl', function ($scope, $http, DashboardActions, Widgets) {
  var controller = this;
  controller.dashboard_selected = null;
  controller.dashboardList = [];
  controller.widget_list = [];
  controller.widget_object_list = {};
  controller.dashboardSelected = {};
  $scope.showModal = false;

  var init = function(){
    controller.dashboard_list();
  };

  $scope.toggleModal = function(){
    controller.name = '';
    $scope.showModal = !$scope.showModal;

  };

  controller.dashboard_list = function(){
    DashboardActions.dashboardList()
    .then(function(result){
      controller.dashboardList = result.data;
      if ( result.data.length >= 1 ) {
        controller.dashboardSelected = result.data[0];
        $scope.item = controller.dashboardSelected;
        controller.no_dashboard = false;
        $scope.showDashboard();
      }
      else{
        controller.no_dashboard = true;
      }

    })
    .catch(function(error){
      controller.no_dashboard = true;
    });
  };



  $scope.showDashboard = function(){
    controller.dashboard_selected = true;
    controller.dashboardSelected = $scope.item;
    controller.widget_list = [];
    controller.widget_object_list = {};

 //Load the dashboards' wodgets
    Widgets.get(controller.dashboardSelected.id)
    .success(function(result){
      var i = 0;
      var current_list = result;
      var current;
      for(i; i < current_list.length; i += 1){
        current = current_list[i];
        controller.widget_object_list[current.id] = {
          sizeX : current.position.width,
          sizeY : current.position.height,
          col : current.position.col,
          row : current.position.row,
          template : '<first-widget></first-widget>',
          data : current
        };
      }

      controller.widget_list = controller.getCollection(controller.widget_object_list);
    });

  };

  controller.getCollection = function(obj){
    var i;
    var result = [];
    for (i in obj){
      result.push(obj[i]);
    }
    return result;
  };

  $scope.createDashboard = function(){
    DashboardActions.dashboardCreate({
      name : controller.name,
      owner : 'me'
    })
    .success(function(data){
      controller.no_dashboard = false;
      $scope.showModal = false;
      controller.name = '';
      controller.dashboardList.push(data);
      setTimeout(function () {changeValue(data)}, 0);
    })
    .error(function(a,b){
    });
  };

  var changeValue = function(data){
    controller.dashboardSelected = data;
    $scope.item = data;
    $scope.showDashboard();
  };

  init();

});
