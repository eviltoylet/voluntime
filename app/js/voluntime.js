'use strict';

(function () {
  var getVolunteerShifts = function () {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    
    var schedule = [
      {title: 'Joe Smith', start: new Date(year, month, day, 11), end: new Date(year, month, day, 12), allDay: false},
      {title: 'Jill Smith', start: new Date(year, month, day, 11), end: new Date(year, month, day, 12), allDay: false},
      {title: 'Lana Lee', start: new Date(year, month, day, 12), end: new Date(year, month, day, 14), allDay: false},
      {title: 'Jerry Scott', start: new Date(year, month, day, 7), end: new Date(year, month, day, 18), allDay: false},
      {title: 'Jack Bauer', start: new Date(year, month, day, 16), end: new Date(year, month, day, 17), allDay: false},
      {title: 'Jenny Jones', start: new Date(year, month, day, 17), end: new Date(year, month, day, 18), allDay: false},
      {title: 'Garret Ashton', start: new Date(year, month, day, 7), end: new Date(year, month, day, 8), allDay: false},
      {title: 'Lucy Barm', start: new Date(year, month, day, 9), end: new Date(year, month, day, 12), allDay: false},
      {title: 'Lenny Bernstein', start: new Date(year, month, day, 18), end: new Date(year, month, day, 19), allDay: false}
    ];
    
    return schedule;
  };
  
  var voluntime = angular.module('voluntime', ['ngRoute', 'ui.calendar', 'snap']);
  voluntime.config(function($routeProvider, snapRemoteProvider){
    $routeProvider
    .when('/schedule', {
      templateUrl: 'pages/schedule.html',
      controller: 'ScheduleController'
    })
    .when('/volunteers', {
      templateUrl: 'pages/volunteers.html',
      controller: 'VolunteersController'
    })
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'LoginController'
    })
    .when('/splash', {
      templateUrl: 'pages/splash.html',
      controller: 'SplashController'
    })
    .otherwise({
      redirectTo: '/splash'
    });
    
    snapRemoteProvider.globalOptions.disable = 'left';
  });
  
  voluntime.controller('ScheduleController', function($scope){
    $scope.changeView = function(date, view) {
      $scope.volunteerSchedule.fullCalendar('changeView', view);
      $scope.volunteerSchedule.fullCalendar('gotoDate', date);
    };
    
    $scope.switchToDayView = function(date, event, view) {
      $scope.changeView(date, 'agendaDay');
    };
    
    $scope.events = getVolunteerShifts();
    $scope.eventSources = [$scope.events];
    $scope.calendarConfig = {
      dayClick: $scope.switchToDayView,
      header: {
        left: 'title',
        center: '',
        right: 'today agendaDay,month prev,next'
      }
    };
  });
  
  voluntime.controller('LoginController', function($scope) {
  });
  
  voluntime.controller('SplashController', function($scope) {
  });
  
  voluntime.controller('VolunteersController', function($scope){
    $scope.volunteers = [
      {
        'id': 1,
        'firstName': 'Brian',
        'lastName': 'Chang',
        'phoneNumber': '(555)123-4567'
      },
      {
        'id': 2,
        'firstName': 'Erki',
        'lastName': 'Ruubas',
        'phoneNumber': '(555)525-1242'
      },
      {
        'id': 3,
        'firstName': 'Jack',
        'lastName': 'Slinger',
        'phoneNumber': '(555)545-1552'
      },
      {
        'id': 4,
        'firstName': 'Emilie',
        'lastName': 'Bauer',
        'phoneNumber': '(555)732-1200'
      },
      {
        'id': 5,
        'firstName': 'Nadia',
        'lastName': 'Zoi',
        'phoneNumber': '(555)912-5991'
      }
    ];
  });
})();