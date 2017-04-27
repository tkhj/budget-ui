/**
 * Created by brandonj on 10/6/15.
 */

angular.module('budget.ui', [
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.bootstrap'
])
    .config([
        '$stateProvider', '$urlRouterProvider', '$translateProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider, $httpProvider) {

            // Allows cross-domain api request / response
            $httpProvider.defaults.useXDomain = true;


            $locationProvider.hashPrefix(''); // Removes index.html in URL
            $locationProvider.html5Mode({enabled: true, requireBase: false});

            $urlRouterProvider.otherwise('/'); //redirects undefined states to /
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home/homeView.html',
                    controller: 'homeViewController',
                    controllerAs: 'vm',
                    stateLabel: 'budget.TITLE'
                })
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/dashboardView.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm',
                    stateLabel: 'budget.TITLE'
                })
				.state('account', {
					url: '/account',
					templateUrl: 'views/account/accountView.html',
					controller: 'accountController',
					controllerAs: 'vm',
					stateLabel: 'budget.TITLE'
				})
				.state('account.create', {
					url: '/create',
					templateUrl: 'views/account/create/createAccountView.html',
					controller: 'createAccountController',
					controllerAs: 'vm',
					stateLabel: 'budget.TITLE'
				})
                ;


            // Configure translations
            // TODO: Update language keys section appropriately. See https://angular-translate.github.io/docs/#/guide/09_language-negotiation
            $translateProvider
                .useStaticFilesLoader({
                    prefix: 'i18n/',
                    suffix: '.json'
                })
                .registerAvailableLanguageKeys(['en'], {
                    'pseudo': 'pseudo',
                    'en_US': 'en'
                })
                .determinePreferredLanguage()
                .fallbackLanguage('en');

            // Protect from insertion attacks in the translation values.
            $translateProvider.useSanitizeValueStrategy("sanitizeParameters");


        }
    ])
    .run(['$rootScope', '$log', '$state', 'UserService',
        function($rootScope, $log, $state, UserService) {

            $log.debug('run block started');

            /*
             * On app load, check is user has a session
             */
            UserService.checkLoggedIn().then(function(response) {

                if(response.data.loggedin) {

					// User is logged in, save their data
                    UserService.setUserData(response.data);



                } else {

					// User isn't logged in, set user data to false and send to home view
                    UserService.setUserData(false);
					$state.go("home");
                }

                $rootScope.$broadcast('UserDataLoaded');

            },
            function error() {

				// There was an error, unset user and send to dashboard
                console.log('checkLoggIn error');
				UserService.setUserData(false);
				$state.go("home");

            });

        }
    ]);
