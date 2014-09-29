/// <reference path='../_all.ts' />
var LingSearchApp;
(function (LingSearchApp) {
    var app = angular.module('lingSearchApp', ['ngRoute', 'firebase', 'ui.bootstrap', 'iso', 'angular-bootstrap-select', 'angular-bootstrap-select.extra', 'ngResize', 'LocalStorageModule', 'dialogs.main', 'pascalprecht.translate']);
    var Config = (function () {
        function Config($routeProvider, $translateProvider) {
            $routeProvider.when("/list", {
                templateUrl: "App/Templates/LingDocList.html",
                controller: "lingDocListCtrl"
            }).otherwise({
                redirectTo: '/list'
            });
            $translateProvider.translations('sv-SE', {
                DIALOGS_ERROR: "Fel",
                DIALOGS_ERROR_MSG: "Ett okänt fel har uppstått.",
                DIALOGS_CLOSE: "Stäng",
                DIALOGS_PLEASE_WAIT: "Var god vänta",
                DIALOGS_PLEASE_WAIT_ELIPS: "Var god vänta...",
                DIALOGS_PLEASE_WAIT_MSG: "Väntar på att åtgärden skall bli färdig.",
                DIALOGS_PERCENT_COMPLETE: "% Färdig",
                DIALOGS_NOTIFICATION: "Meddelande",
                DIALOGS_NOTIFICATION_MSG: "Okänt applikationsmeddelande.",
                DIALOGS_CONFIRMATION: "Bekräftelse",
                DIALOGS_CONFIRMATION_MSG: "Bekräfta åtgärden.",
                DIALOGS_OK: "OK",
                DIALOGS_YES: "Ja",
                DIALOGS_NO: "Nej"
            });

            $translateProvider.preferredLanguage('sv-SE');
        }
        return Config;
    })();
    LingSearchApp.Config = Config;
    Config.$inject = ['$routeProvider', '$translateProvider'];
    app.config(Config);
})(LingSearchApp || (LingSearchApp = {}));
//# sourceMappingURL=lingSearchApp.js.map
