/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('budget.ui')
    .directive('budgetTopNav', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/topNav/topNavView.html',
                controller: 'topNavController',
                controllerAs: 'vm'
            };
        }
    ]);
