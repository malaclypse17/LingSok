/// <reference path='../../_all.ts' />
var app = angular.module('lingSearchApp');

class LingSearchAuthCtrl {
    private $scope:Interfaces.ILingSearchAuthScope;
    private $routeParams: Interfaces.ILingSearchRouteParams;
    private dataSvc: Interfaces.ILingDataSvc;
    private $modal: ng.ui.bootstrap.IModalService;
    private dialogs;
    private localStorageService;
    constructor(localStorageService,dialogs, $modal, $rootScope, $scope: Interfaces.ILingSearchAuthScope, lingDataSvc: Interfaces.ILingDataSvc, $timeout) {
        var self = this;
        self.localStorageService = localStorageService;    
        self.dialogs = dialogs;
        self.dataSvc = lingDataSvc;
        self.$scope = $scope;
        self.$modal = $modal;
        //Try autologin
        if (!$rootScope.authData) {
            var token = self.localStorageService.get("lingSokToken");
            if (token) {
                self.dataSvc.auth.authWithCustomToken(token,
                    function (error, authData) {
                        if (error === null) {
                            //successful autologin
                            $rootScope.authData = authData;
                            $timeout((function () { self.$scope.$emit('iso-method', { name: null, params: null }); }), 100);
                        } else {
                            //Failed autologin
                            self.localStorageService.remove("lingSokToken");
                        }
                    });
            }
        }
        self.$scope.login = (function () {
            var passwd = self.$scope.password;
            if (!passwd || passwd.length == 0) passwd = "bogus";
            self.dataSvc.auth.authWithPassword({
                email: self.$scope.email,
                password: passwd
            }, self.$scope.onAuthComplete);
        });
        self.$scope.logout = (function () {
            self.dataSvc.auth.unauth();
            self.$scope.password = null;
            $rootScope.authData = null;
            self.localStorageService.remove("lingSokToken");
            $timeout((function () { self.$scope.$emit('iso-method', { name: null, params: null }); }), 100);
        });
        self.$scope.sendMail = (function () {
            self.dataSvc.auth.resetPassword({ email: self.$scope.email }, function (error) {
                if (error === null) {
                    self.dialogs.notify("Email skickat", "Inom några minuter borde du få ett email med ett engångslösenord till mailaddressen du angav.")
                                } else {
                    self.dialogs.error("Email kunde inte skickas", error);
                }
            });
        });
        self.$scope.onAuthComplete = (function (error, authData) {
            if (error === null) {
                ///Successful login
                if (authData.password.isTemporaryPassword) {
                    var registerModal = self.$modal.open({
                        templateUrl: '/app/templates/LingDocRegister.html',
                        windowClass: 'modal',
                        controller: 'lingDocRegisterCtrl',
                        backdrop: 'static',
                        resolve: {
                            email: function () { return self.$scope.email; },
                            oldpassword: function () { return self.$scope.password; }
                        }
                    });
                    registerModal.result.then(function (success) {
                        if (success) {
                            self.dialogs.notify("Lösenordet uppdaterat", "Ditt nya lösenord är nu registrerat.")
                            $rootScope.authData = authData;
                            self.localStorageService.set("lingSokToken", authData.token);
                        } else {
                            self.dialogs.error("Lösenordet kunde inte uppdateras", error);
                        }
                    }, function () { });

                } else {
                    $rootScope.authData = authData;
                    self.localStorageService.set("lingSokToken",authData.token);
                    $timeout((function () { self.$scope.$emit('iso-method', { name: null, params: null }); }), 100);
                }
            }
            else {
                //Failed login
                if (error.code == 'INVALID_USER') {
                    var dlg = self.dialogs.confirm("Ny användare", "Vi känner inte igen '" +
                        self.$scope.email +
                        "' sedan tidigare. Vill du registrera en ny användare med denna mailaddress?",
                        { size: 'sm' });
                    dlg.result.then(function (btn) {
                        self.dataSvc.auth.createUser(
                            {
                                email: self.$scope.email,
                                password: "XW4Fsf#22ffss522fffs5smm"
                            }, function (error) {
                                if (error === null) {
                                    self.$scope.sendMail();
                                } else {
                                    self.dialogs.error("Kunde inte skapa ny användare", error);
                                }
                            })
                    }  
                    , function (btn) {
                        //Ok, user doesn't want to register
                    });
                } else if (error.code == 'INVALID_PASSWORD') {
                    var dlg = self.dialogs.confirm("Lösen ogiltig", "Lösen inte giltig för användare '" +
                        self.$scope.email +
                        "'. Antingen var detta ett engångslösenord som du redan använt en gång, eller också har du kanske glömt ditt lösenord. Vill du skicka ett nytt temporärt lösenord till denna adress?", { size: 'sm' });
                    dlg.result.then(function (btn) {
                        self.$scope.sendMail();
                    }, function (btn) {
                        //Ok, user doesn't want reset email
                    });
                } else {
                    console.log(error);
                }
            }
        });   
    }   
}

LingSearchAuthCtrl.$inject = ['localStorageService','dialogs','$modal', '$rootScope', '$scope', 'lingDataSvc','$timeout' ];
app.controller('lingSearchAuthCtrl', ['localStorageService','dialogs',"$modal", '$rootScope', "$scope", 'lingDataSvc', '$timeout',  LingSearchAuthCtrl]);