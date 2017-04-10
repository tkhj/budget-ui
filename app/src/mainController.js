/**
 * Created by brandonj on 2/3/16.
 */

(function() {
    "use strict";

    angular
        .module('budget.ui')
        .controller('mainController', mainController);


    mainController.$inject = [
        '$rootScope',
        '$scope',
        '$log'
    ];


    function mainController($rootScope, $scope, $log) {

        var vm = this;
        $log.debug('mainController');


        // Setup functions
        //


        // Setup variables
        vm.isSideboardOpen = false;
		vm.isUserLoading = true;


        /*
         * toggleSideboard
         */
        $rootScope.$on('sideboardToggle', function() {
            vm.isSideboardOpen = !vm.isSideboardOpen;
        });


		/*
		 * the run block has retrieved initial user data
		 */
		$rootScope.$on('UserDataLoaded', function() {
			vm.isUserLoading = false;
		});

    }
})();
