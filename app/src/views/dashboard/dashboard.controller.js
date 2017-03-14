/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('dashboardController', dashboardController);


dashboardController.$inject = [
    '$rootScope',
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function dashboardController($rootScope, $scope, $log, $state, UserService) {

    var vm = this;
    $log.debug('dashboardController');


    // Setup functions
    vm.logout = logout;
    vm.checkUserLogin = checkUserLogin;
    vm.checkUserData = checkUserData;


    // Setup variables
    vm.userData = null;


    /*
     * Get any user data
     */
    checkUserData();


    /*
     * logout
     */
    function logout() {
        $log.debug('dashboardController::logout');

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


    /*
     * UserDataLoaded - initial run user data has been returned
     * this helps users if they are already logged in on first page load
     */
    function checkUserData() {

        vm.userData = UserService.getUserData();

		// We have userData & loggedin is false - send to the homepage instead of the dashboard
        if (vm.userData && !vm.userData.loggedin) {
            $state.go('home');
        }
    }


    $rootScope.$on('UserDataLoaded', function() {
        checkUserData();
    });

}