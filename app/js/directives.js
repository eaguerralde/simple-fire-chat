'use strict';

/* Directives */


angular.module('ake.directives', []).
  directive('akeAppVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
