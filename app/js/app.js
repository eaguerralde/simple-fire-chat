'use strict';

// Declare app level module which depends on filters, and services
angular.module('ake',
      ['ake.config', 'ake.routes', 'ake.filters', 'ake.services', 'ake.directives', 'ake.controllers',
         'simpleLoginTools', 'routeSecurity', 'ngAnimate']
   )

   .run(['loginService', '$rootScope', 'FBURL', 'syncData', function(loginService, $rootScope, FBURL, syncData) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
         
         $rootScope.user = {};
         var initProfile = function(){
            syncData(['users', $rootScope.auth.user.uid]).$bind($rootScope, 'user').then(function(unBind) {
               $rootScope.unBindAccount = unBind;
            });
         }
         $rootScope.$on('$firebaseSimpleLogin:login', initProfile);
         $rootScope.$on('$firebaseSimpleLogin:logout', function(){$rootScope.user = {};});
         $rootScope.$on('$firebaseSimpleLogin:error', function(){$rootScope.user = {};});
      }
   }]);
