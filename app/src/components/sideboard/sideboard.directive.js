/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('budget.ui')
    .directive('budgetSideboard', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/sideboard/sideboardView.html',
                controller: 'sideboardController',
                controllerAs: 'vm'
            };
        }
    ]);
