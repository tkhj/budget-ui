/**
 * Created by brandonj on 4/10/17.
 */

angular
	.module('budget.ui')
	.controller('createAccountController', createAccountController);


createAccountController.$inject = [
	'$scope',
	'$log',
	'$state',
	'AccountService',
	'UtilsService'
];


function createAccountController($scope, $log, $state, AccountService, UtilsService) {

	var vm = this;
	$log.debug("createAccountController");


	// Setup functions
	vm.checkAccountName = checkAccountName;
	vm.createAccount = createAccount;


	// Setup variables
	vm.accountData = {
		acctName: null,
		acctNameError: false,
		acctBalance: null,
		acctBalanceError: false
	};


	/*********************************************************************
	 * Scope Functions
	 *********************************************************************/

	/*
	 * checkAccountName
	 */
	function checkAccountName() {

		$log.debug('createAccountController :: checkAccountName');

		// Sanitize user input text
		var acctName = UtilsService.sanitizeText(vm.accountData.acctName);

		if (acctName.length >= 3) {

			// Send account name to API to check for duplicate
			AccountService.checkAcctNameDuplicate(acctName).then(
				function(response) {

					$scope.addAccountForm.acctName.$setValidity("duplicate", !response.data.nameExists);
				}
			);
		}
	}


	/*
	 * createAccount
	 */
	function createAccount() {

		$log.debug('createAccountController :: createAccount');

		// Sanitize user input text
		var acctName = UtilsService.sanitizeText(vm.accountData.acctName);
		var acctBalance = UtilsService.sanitizeText(vm.accountData.acctBalance);

		if (acctName.length >= 3 && acctBalance.length > 0) {

			// Send account name to API to check for duplicate
			AccountService.createNewAccount(acctName, acctBalance).then(
				function(response) {

					$state.go('account.view', {accountId: response.data.id});
				}
			);
		}
	}
}
