/**
 * Created by brandonj on 11/2/16.
 */

angular
    .module('budget.ui')
    .directive('budgetOptionDropdown', [
        function () {
            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    changeFn: "&?",
                    config: '=?',
                    placeholder: "@?",
                    selectOptions: "=",
                    dropdownDisabled: "=?"
                },
                templateUrl: 'components/optionDropdown/optionDropdownView.html',
                controller: 'budgetOptionDropdownController',
                controllerAs: 'vm'
            };
        }
    ]);
