/**
 * Created by brandonj on 5/4/17.
 */

angular
	.module('budget.ui')
	.directive('budgetUserNav', [
		function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {},
				templateUrl: 'components/userNav/userNavView.html',
				controller: 'userNavController',
				controllerAs: 'vm'
			};
		}
	]);
