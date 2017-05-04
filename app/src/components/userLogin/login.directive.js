/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('budget.ui')
    .directive('budgetLoginForm', [
        function () {
            return {
                restrict: 'E',
				replace: true,
                scope: {},
                templateUrl: 'components/userLogin/loginView.html',
                controller: 'loginController',
                controllerAs: 'vm'
            };
        }
    ]);
