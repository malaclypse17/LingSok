/// <reference path='../../_all.ts' />
var LingDocCreateOrUpdateCtrl = (function () {
    function LingDocCreateOrUpdateCtrl($scope, $modalInstance, lingDataSvc, doc, createMode) {
        var self = this;
        self.dataSvc = lingDataSvc;
        self.$scope = $scope;
        self.$modalInstance = $modalInstance;
        self.$scope.createMode = createMode;
        self.$scope.tags = self.dataSvc.allTags();
        if (doc.tags == null)
            doc.tags = [];
        for (var i = 0; i < self.$scope.tags.length; i++) {
            if (doc.tags.length <= i)
                doc.tags.push(false);
            if (doc.tags[i] == null)
                doc.tags[i] = false;
        }
        self.$scope.document = doc;

        self.$scope.create = function () {
            var result = self.dataSvc.create(self.$scope.document);
            self.$modalInstance.close(result);
        };

        self.$scope.update = function () {
            var result = self.dataSvc.update(self.$scope.document);
            self.$modalInstance.close(result);
        };

        self.$scope.cancel = function () {
            self.$modalInstance.dismiss('cancel');
        };
    }
    return LingDocCreateOrUpdateCtrl;
})();
;
LingDocCreateOrUpdateCtrl.$inject = ['$scope', '$modalInstance', 'lingDataSvc', 'doc', 'createMode'];
app.controller('lingDocCreateOrUpdateCtrl', ["$scope", "$modalInstance", "lingDataSvc", 'doc', 'createMode', LingDocCreateOrUpdateCtrl]);
//# sourceMappingURL=lingDocCreateOrUpdateCtrl.js.map
