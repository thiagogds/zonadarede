/*global angular:false */
angular.module('zonadarede', ['facebook', 'userController']).config(function ($facebookProvider) {
    'use strict';

    $facebookProvider.init({
        'appId' : '1436290429925267',
        'channelUrl' : 'http://www.zonadarede.herokuapp.com'
    });
});
