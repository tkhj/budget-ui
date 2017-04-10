/**
 * Created by brandonj on 4/10/17.
 */

angular
	.module('budget.ui')
	.controller('createAccountController', createAccountController);


createAccountController.$inject = [
	'$rootScope',
	'$scope',
	'$log',
	'$state',
	'UserService'
];


function createAccountController($rootScope, $scope, $log, $state, UserService) {

	var vm = this;
	$log.debug("createAccountController");


	// Setup functions
	vm.checkUserLogin = checkUserLogin;


	// Setup variables
	//


	/*
	 * TODO: TEMPORARY NEEDS TO BE REMOVED
	 */
	function checkUserLogin() {
		$log.debug('dashboardController::checkUserLogin');

		UserService.checkLoggedIn().then(function(response) {

				$log.debug('dashboard - check log in - response:');
				$log.debug(response.data);

			},
			function (errorResp) {
				$log.debug('UserService errorResp:');
				$log.debug(errorResp);
			});
	}
}
