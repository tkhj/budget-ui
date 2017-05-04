/**
 * Created by brandonj on 5/4/17.
 */

angular
	.module('budget.ui')
	.controller('userNavController', userNavController);


userNavController.$inject = [
	'$scope',
	'$log',
	'$state',
	'UserService'
];


function userNavController($scope, $log, $state, UserService) {

	var vm = this;
	$log.debug('userNavController');


	// Setup functions
	vm.logout = logout;


	// Setup variables
	//


	/*******************************************************************
	 * Public Functions
	 *******************************************************************/

	/*
	 * logout
	 */
	function logout() {
		$log.debug('userNavController :: logout()');

		UserService.logoutUser().then(function(response) {

			// update user data ( should be {"loggedin": false} )
			UserService.setUserData(response.data);

			$state.go('home');

		},
		function (errorResp) {
			$log.debug('UserService errorResp:');
			$log.debug(errorResp);
		});
	}

}
