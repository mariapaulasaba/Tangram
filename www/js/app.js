// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, Bluetooth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	  
	$rootScope.imagesOff = [
		"img/piece-0-off.png","img/piece-1-off.png","img/piece-2-off.png","img/piece-3-off.png","img/piece-4-off.png","img/piece-5-off.png","img/piece-6-off.png"];
	$rootScope.imagesOn = [
		"img/piece-0-on.png","img/piece-1-on.png","img/piece-2-on.png","img/piece-3-on.png","img/piece-4-on.png","img/piece-5-on.png","img/piece-6-on.png"];			

//	$rootScope.devices = Bluetooth.getPuzzle();
//	console.log($rootScope.devices);
  });
	   	
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('start', {
    url: "/start",
    templateUrl: "templates/start.html",
	controller: 'StartCtrl'
  })
  
  .state('connect', {
    url: "/connect",
    templateUrl: "templates/connect.html",
	controller: 'ConnectCtrl'
  })
  
  
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  
  
  // Each tab has its own nav history stack:
  .state('tab.challenges', {
    url: '/challenges',
    views: {
      'tab-challenges': {
        templateUrl: 'templates/tab-challenges.html',
        controller: 'ChallengesCtrl'
      }
    }
  }) 
   .state('tab.colors', {
    url: '/colors',
    views: {
      'tab-colors': {
        templateUrl: 'templates/tab-colors.html',
        controller: 'ColorsCtrl'
      }
    }
  })  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  }) 
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
})


