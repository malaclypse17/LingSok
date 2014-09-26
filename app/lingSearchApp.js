/// <reference path='../_all.ts' />
var LingSearchApp;
(function (LingSearchApp) {
    var app = angular.module('lingSearchApp', ['ngRoute', 'firebase', 'ui.bootstrap', 'iso', 'angular-bootstrap-select', 'angular-bootstrap-select.extra', 'ngResize', 'LocalStorageModule']);
    var Config = (function () {
        function Config($routeProvider, firebase) {
            $routeProvider.when("/list", {
                templateUrl: "App/Templates/LingDocList.html",
                controller: "lingDocListCtrl"
            }).otherwise({
                redirectTo: '/list'
            });
        }
        return Config;
    })();
    LingSearchApp.Config = Config;
    Config.$inject = ['$routeProvider'];
    app.config(Config);
})(LingSearchApp || (LingSearchApp = {}));
//# sourceMappingURL=lingSearchApp.js.map
