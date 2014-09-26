/// <reference path='../../_all.ts' />
var app = angular.module('lingSearchApp');

var LingDocListCtrl = (function () {
    function LingDocListCtrl($modal, $scope, $routeParams, dataSvc) {
        var self = this;
        self.dataSvc = dataSvc;
        self.$scope = $scope;
        self.$routeParams = $routeParams;
        self.$modal = $modal;
        self.$scope.delete = (function (doc) {
            return self.dataSvc.delete(doc);
        });
        self.$scope.$container = $('#isotopeContainer');
        self.$scope.filterTag = "";
        self.$scope.filterLanguage = "";
        self.$scope.documents = this.dataSvc.all();
        self.$scope.tags = this.dataSvc.allTags();
        self.$scope.documents.$loaded().then(function () {
            self.$scope.documents = self.$scope.documents.sort(function (a, b) {
                return a.year - b.year;
            });
            self.$scope.$emit('iso-method', { name: null, params: null });
        });
        self.$scope.reFilter = (function () {
            self.$scope.$container.isotope({ filter: self.$scope.filterTag + self.$scope.filterLanguage });
        });
        self.$scope.getFilterClasses = (function (doc) {
            var ret = doc.language;
            for (var i = 0; i < doc.tags.length; i++) {
                if (doc.tags[i])
                    ret += (" tag" + (i + 1));
            }
            return ret;
        });

        self.$scope.openUpdate = (function (doc) {
            var updateModal = self.$modal.open({
                templateUrl: '/app/templates/LingDocCreateOrUpdate.html',
                windowClass: 'modal',
                controller: 'lingDocCreateOrUpdateCtrl',
                backdrop: true,
                resolve: {
                    createMode: function () {
                        return false;
                    },
                    doc: function () {
                        return doc;
                    }
                }
            });
            updateModal.result.then(function (document) {
            }, function (document) {
            });
        });
        self.$scope.openCreate = (function () {
            var createModal = self.$modal.open({
                templateUrl: '/app/templates/LingDocCreateOrUpdate.html',
                windowClass: 'modal',
                controller: 'lingDocCreateOrUpdateCtrl',
                backdrop: true,
                resolve: {
                    createMode: function () {
                        return true;
                    },
                    doc: function () {
                        return new Model.LingDoc();
                    }
                }
            });
            createModal.result.then(function (document) {
            }, function (document) {
            });
        });
    }
    return LingDocListCtrl;
})();

LingDocListCtrl.$inject = ['$modal', '$scope', '$routeParams', 'lingDataSvc'];
app.controller('lingDocListCtrl', ["$modal", "$scope", "$routeParams", "lingDataSvc", LingDocListCtrl]);
//# sourceMappingURL=lingDocListCtrl.js.map
