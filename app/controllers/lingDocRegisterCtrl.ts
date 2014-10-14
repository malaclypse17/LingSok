/// <reference path='../../_all.ts' />
class LingDocRegisterCtrl  {
    private $scope: Interfaces.ILingDocRegisterScope;
    private dataSvc: Interfaces.ILingDataSvc;
    private $modalInstance: ng.ui.bootstrap.IModalServiceInstance;
    constructor($scope: Interfaces.ILingDocRegisterScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
        lingDataSvc: Interfaces.ILingDataSvc,email,oldpassword) {
        var self = this;
        self.dataSvc = lingDataSvc;
        self.$scope = $scope;
        self.$modalInstance = $modalInstance;
        self.$scope.submitForm = function () { 
            self.dataSvc.auth.changePassword(
                {
                    email: email,
                    oldPassword: oldpassword,
                    newPassword: self.$scope.password
                },
                function (error) {
                if (error === null) {
                    self.$modalInstance.close(true);
                } else {
                    self.$modalInstance.close(false);
                    
                }
            }); 
            self.$modalInstance.close(true);
        };
    }
};
LingDocRegisterCtrl.$inject = ['$scope', '$modalInstance', 'lingDataSvc','email','oldpassword'];
app.controller('lingDocRegisterCtrl', ["$scope", "$modalInstance", "lingDataSvc", 'email', 'oldpassword', LingDocRegisterCtrl]);