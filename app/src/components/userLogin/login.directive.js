/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('budget.ui')
    .directive('dndLoginForm', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/userLogin/loginView.html',
                controller: 'loginController',
                controllerAs: 'vm'
            };
        }
    ]);
