angular.module("miCalendar", ['ngMaterial', 'ngMessages' ,'mdPickers'])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('orange');
  });