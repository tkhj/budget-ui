/**
 * Created by brandonj on 4/27/17.
 */

(function() {
	"use strict";

	angular
		.module('budget.ui')
		.factory('AccountService', AccountService);

	AccountService.$inject = ['$log', '$http'];

	function AccountService($log, $http) {

		var service = {
			checkAcctNameDuplicate: checkAcctNameDuplicate,
			createNewAccount: createNewAccount,
			getAllAccounts: getAllAccounts
		};

		return service;


		/*
		 * checkAcctNameDuplicate - check if the account name already exists
		 */
		function checkAcctNameDuplicate(accountName) {

			$log.debug("AccountService :: checkAcctNameDuplicate()");

			var data = {
				'accountName': accountName
			};

			return $http({
				url: '/api.php/api/account/checkName',
				method: 'POST',
				data: data,
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			});
		}


		/*
		 * createNewAccount - create a new account
		 */
		function createNewAccount(accountName, acctBalance) {

			$log.debug("AccountService :: createNewAccount()");

			var data = {
				'accountName': accountName,
				'acctBalance': acctBalance
			};

			return $http({
				url: '/api.php/api/account/create',
				method: 'POST',
				data: data,
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			});
		}


		/*
		 * getAllAccounts - gets all available user accounts
		 */
		function getAllAccounts() {

			$log.debug("AccountService :: getAllAccounts()");

			return $http({
				url: '/api.php/api/account/getAccounts',
				method: 'GET',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			});
		}

	}
})();
