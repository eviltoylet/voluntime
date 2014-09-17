'use strict';

(function () {
  var voluntime = angular.module('voluntime', []);
  
  voluntime.controller('VolunteerListController', function(){
    this.volunteers = [
      {'id': 1,
       'firstName': 'Brian',
       'lastName': 'Chang'},
      {'id': 2,
       'firstName': 'Erki',
       'lastName': 'Ruubas'}
    ];
  });
})();