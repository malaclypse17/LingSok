/// <reference path='../_all.ts' />
module LingSearchApp {
    var app = angular.module('lingSearchApp', ['ngRoute', 'firebase', 'ui.bootstrap', 'iso', 'angular-bootstrap-select', 'angular-bootstrap-select.extra', 'ngResize','LocalStorageModule']);
    export class Config {
        constructor($routeProvider: ng.route.IRouteProvider,firebase) {
            $routeProvider.when("/list", {
                templateUrl: "App/Templates/LingDocList.html",
                controller: "lingDocListCtrl"
            })
            .otherwise({
                    redirectTo: '/list'
            });
        }
    }
    Config.$inject = ['$routeProvider'];
    app.config(Config);
}
