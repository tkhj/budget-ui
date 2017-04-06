/**
 * Created by brandonj on 8/18/16.
 */

(function() {
    "use strict";

    angular
        .module('budget.ui')
        .factory('UserService', UserService);

    UserService.$inject = ['$log', '$http'];

    function UserService($log, $http) {

        var service = {
            checkLoggedIn: checkLoggedIn,
            setUserData: setUserData,
            getUserData: getUserData,
            signupUser: signupUser,
            loginUser: loginUser,
            logoutUser: logoutUser
        };

        return service;


        var currUserData = null;


        /*
         * checkLoggedIn - see if the user already has a session
         */
        function checkLoggedIn() {

            return $http({
                url: '/api.php/api/user/currentUser', // http://localhost/personal/budget-api/api.php/api/user/currentUser
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }


        /*
         * setUserData - save data for use throughout the application
         * @userData - object {name, email, id}
         */
        function setUserData(userData) {
            currUserData = userData;
        }


        /*
         * getUserData - returns the current user's data
         */
        function getUserData() {

            return currUserData;
        }


        /*
         * signupUser - sign up a new user
         * @userData - object {name, email, password}
         */
        function signupUser(userData) {

            var postData = {
                'name': userData.userName,
                'email': userData.userEmail,
                'password': userData.userPassword
            };

            return $http({
                url: '/api.php/api/user/signup', // http://localhost/personal/budget-api/api.php/api/user/signup
                method: 'POST',
                data: postData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }


        /*
         * signupUser - sign up a new user
         * @userData - object {name, email, password}
         */
        function loginUser(userData) {

            var postData = {
                'email': userData.userEmail,
                'password': userData.userPassword
            };

            return $http({
                url: '/api.php/api/user/login', // http://localhost/personal/budget-api/api.php/api/user/login
                method: 'POST',
                data: postData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }


        /*
         * logoutUser - sign up a new user
         */
        function logoutUser() {

            return $http({
                url: '/api.php/api/user/logout', // http://localhost/personal/budget-api/api.php/api/user/logout
                method: 'POST',
                data: currUserData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }

    }
})();
