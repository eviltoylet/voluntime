'use strict';

(function () {
  var voluntime = angular.module('voluntime', ['ngRoute', 'ui.calendar']);
  
  voluntime.config(function($routeProvider){
    $routeProvider
    .when('/schedule', {
      templateUrl: 'pages/schedule.html',
      controller: 'ScheduleController'
    })
    .when('/volunteers', {
      templateUrl: 'pages/volunteers.html',
      controller: 'VolunteersController'
    });
  });
  
  voluntime.controller('ScheduleController', function($scope){
    $scope.changeView = function(date, view) {
      $scope.volunteerSchedule.fullCalendar('changeView', view);
      $scope.volunteerSchedule.fullCalendar('gotoDate', date);
    };
    
    $scope.switchToDayView = function(date, event, view) {
      $scope.changeView(date, 'agendaDay');
    };

    $scope.eventSources = [];
    $scope.calendarConfig = {
      dayClick: $scope.switchToDayView,
      header: {
        left: 'title',
        center: '',
        right: 'today agendaDay,month prev,next'
      }
    };
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