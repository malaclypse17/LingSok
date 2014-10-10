/// <reference path='../../_all.ts' />
var app = angular.module('lingSearchApp');

var LingDocListCtrl = (function () {
    function LingDocListCtrl($timeout, dialogs, $modal, $scope, $routeParams, dataSvc, $translate) {
        var self = this;
        self.dataSvc = dataSvc;
        self.$scope = $scope;
        self.$timeout = $timeout;
        self.$routeParams = $routeParams;
        self.$modal = $modal;
        self.$scope.delete = (function (doc) {
            var dlg = dialogs.confirm("Är du säker?", "Vill du verkligen ta bort detta dokument helt ur databasen?", { size: 'sm' });
            dlg.result.then(function (btn) {
                return self.dataSvc.delete(doc).then(dialogs.notify("Dokumentet borttaget", "Detta dokument har nu helt tagits bort ur databasen."));
            }, function (btn) {
            });
        });
        $scope.lang = 'sv-SE';
        $translate.use($scope.lang);
        self.$scope.$container = $('#isotopeContainer');
        self.$scope.filterTag = "";
        self.$scope.currentSelected = null;
        self.$scope.filterLanguage = "";
        self.$scope.documentsLoaded = false;
        self.$scope.documents = this.dataSvc.all();
        self.$scope.tags = this.dataSvc.allTags();
        self.$scope.documents.$loaded().then(function () {
            self.$scope.documents = self.$scope.documents.sort(function (a, b) {
                return a.year - b.year;
            });
            self.$scope.documentsLoaded = true;
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
        self.$scope.setSelected = function (document) {
            if (self.$scope.currentSelected != null) {
                //Close old selected one
                $('#doc' + self.$scope.currentSelected.$id).removeClass('selectedDoc');
            }
            if (self.$scope.currentSelected != null && self.$scope.currentSelected.$id == document.$id) {
                //We just weanted to close this one, don't open a new
                self.$scope.currentSelected = null;
            } else {
                //Open this one
                $('#doc' + document.$id).addClass('selectedDoc');
                self.$scope.currentSelected = document;
            }
            self.$timeout((function () {
                self.$scope.$emit('iso-method', { name: null, params: null });
            }), 100);
        };
    }
    return LingDocListCtrl;
})();

LingDocListCtrl.$inject = ['$timeout', 'dialogs', '$modal', '$scope', '$routeParams', 'lingDataSvc', '$translate'];
app.controller('lingDocListCtrl', ['$timeout', 'dialogs', "$modal", "$scope", "$routeParams", "lingDataSvc", '$translate', LingDocListCtrl]);
//# sourceMappingURL=lingDocListCtrl.js.map
