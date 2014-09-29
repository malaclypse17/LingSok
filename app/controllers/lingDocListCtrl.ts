/// <reference path='../../_all.ts' />
var app = angular.module('lingSearchApp');

class LingDocListCtrl {
    private $scope: Interfaces.ILingDocListScope;
    private $routeParams: Interfaces.ILingSearchRouteParams;
    private dataSvc: Interfaces.ILingDataSvc;
    private $modal: ng.ui.bootstrap.IModalService;

    constructor(dialogs,$modal,$scope: Interfaces.ILingDocListScope, $routeParams: Interfaces.ILingSearchRouteParams, dataSvc: Interfaces.ILingDataSvc,$translate) {
        var self = this;
        self.dataSvc = dataSvc;      
        self.$scope = $scope;
        self.$routeParams = $routeParams;
        self.$modal = $modal;
        self.$scope.delete = (function (doc: Model.LingDoc) {
            var dlg = dialogs.confirm();
            dlg.result.then(function (btn) {
                return self.dataSvc.delete(doc);
            }, function (btn) {                   
            });          
        });
        $scope.lang = 'sv-SE';
        $translate.use($scope.lang);
        self.$scope.$container = $('#isotopeContainer');
        self.$scope.filterTag = "";
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
        self.$scope.getFilterClasses = (function (doc: Model.LingDoc): string {
            var ret = doc.language;
            for (var i = 0; i < doc.tags.length; i++) {
                if (doc.tags[i]) ret += (" tag" + (i + 1));
            }
            return ret;
        });


        self.$scope.openUpdate = (function (doc:Model.LingDoc) {
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
            updateModal.result.then(function (document) {}, function (document) {});
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
            createModal.result.then(function (document) {}, function (document) {});
        });
    }
}
       
LingDocListCtrl.$inject = ['dialogs','$modal','$scope','$routeParams', 'lingDataSvc','$translate'];
app.controller('lingDocListCtrl', ['dialogs', "$modal", "$scope", "$routeParams", "lingDataSvc",  '$translate', LingDocListCtrl]);