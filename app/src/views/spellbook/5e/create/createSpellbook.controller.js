/**
 * Created by brandonj on 11/11/16.
 */

angular
    .module('dnd.ui')
    .controller('createSpellbookController', createSpellbookController);


createSpellbookController.$inject = [
    '$scope',
    '$log',
    '$translate',
    '$state',
    'UserService',
    'SpellListService',
    'SpellbookService'
];


function createSpellbookController($scope, $log, $translate, $state, UserService, SpellListService, SpellbookService) {

    var vm = this;
    $log.debug('createSpellbookController');


    // Setup functions
	vm.checkUserLogin = checkUserLogin;
    vm.isListDisabled = isListDisabled;
    vm.checkSaveButton = checkSaveButton;
    vm.createSpellbook = createSpellbook;


    // Setup variables
    var translationKeys = [
        'dndspells.SPELL_LIST.CLASS_FILTER_LABEL',
        'dndspells.SPELL_LIST.ALL'
    ];
    vm.userData = null;
    vm.spellListConfig = {
        mode: 'create'
    };
    vm.spellClassesDropdown = {};
    vm.spellbookData = {
        charName: null,
        charClass: null,
        userId: null,
        private: false,
        spells: [],
        formError: false
    };


    $translate(translationKeys).then(function(translations) {
        init(translations);
    });


    $scope.$on('UserDataLoaded', function() {
        checkUserData();
    });


    /*
     * Initialize
     */
    function init(translations) {

        // Add the 'All' option to the filter dropdown
        var option = {
            id: '0',
            name: translations['dndspells.SPELL_LIST.ALL'],
            value: null
        };

        vm.spellClassesDropdown = angular.copy(SpellListService.spellClassConfig(option));

        // Get user data
        checkUserData();
    }


    /*
     * Watch for changes to the class dropdown and update the spellbook object
     */
    $scope.$watch('vm.spellClassesDropdown.selectedClass', function() {
        vm.spellbookData.charClass = angular.copy(vm.spellClassesDropdown.selectedClass.value);
    });


    /*
     * checkUserData - load user data
     */
    function checkUserData() {

        vm.userData = UserService.getUserData() || null;
        vm.spellbookData.userId = vm.userData && vm.userData.id ? vm.userData.id : null;
    }


	/*
	 * TODO: TEMPORARY NEEDS TO BE REMOVED
	 */
	function checkUserLogin() {
		$log.debug('createSpellbookController::checkUserLogin');

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
     * isListDisabled - returns true / false if spell list should be disabled
     */
    function isListDisabled() {

        return vm.spellClassesDropdown.selectedClass &&
                vm.spellClassesDropdown.selectedClass.value !== '0' &&
                vm.spellClassesDropdown.selectedClass.value ? false : true;
    }


    /*
     * checkSaveButton
     */
    function checkSaveButton() {

        return vm.spellbookData.charName && !isListDisabled();
    }


    /*
     * createSpellbook
     */
    function createSpellbook() {

		$log.debug('createSpellbookController createSpellbook() vm.spellbookData:');
		$log.debug(vm.spellbookData);

        SpellbookService.createSpellbook(vm.spellbookData).then(function(response) {

			$log.debug("create spellbook response:");
			$log.debug(response.data);

            //$state.go('spellbook.view', {spellbookId: response.data.spellbookID});
        });
    }
}
