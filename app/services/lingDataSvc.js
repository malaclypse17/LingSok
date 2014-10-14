/// <reference path='../../_all.ts' />
var LingDataSvc = (function () {
    function LingDataSvc($firebase, $rootScope) {
        var self = this;
        this.fireBaseUrl = "https://lingsearch.firebaseio.com/";
        var fireBaseLingDocsRef = new Firebase(this.fireBaseUrl + 'documents');
        self.docList = $firebase(fireBaseLingDocsRef).$asArray();
        var fireBaseLingTagsRef = new Firebase(this.fireBaseUrl + 'tags');
        this.tagList = $firebase(fireBaseLingTagsRef).$asArray();
        var ref = new Firebase(this.fireBaseUrl);
        this.auth = ref;
    }
    LingDataSvc.LingDataSvc = function ($firebase, $rootScope) {
        return new LingDataSvc($firebase, $rootScope);
    };

    /*initTags() {
    this.tagList.$add(new Model.Tag("gymnastik", 9));
    this.tagList.$add(new Model.Tag("handskrift", 10));
    }*/
    LingDataSvc.prototype.all = function () {
        return this.docList;
    };

    LingDataSvc.prototype.allTags = function () {
        //this.initTags();
        return this.tagList;
    };
    LingDataSvc.prototype.createTag = function (newTag) {
        return this.tagList.$add(newTag);
    };
    LingDataSvc.prototype.create = function (newDoc) {
        return this.docList.$add(newDoc);
    };
    LingDataSvc.prototype.update = function (doc) {
        return this.docList.$save(doc);
    };
    LingDataSvc.prototype.delete = function (doc) {
        return this.docList.$remove(doc);
    };
    return LingDataSvc;
})();
var app = angular.module('lingSearchApp');
LingDataSvc.$inject = ['$firebase', '$rootScope'];
app.service('lingDataSvc', ["$firebase", '$rootScope', LingDataSvc]);
//# sourceMappingURL=lingDataSvc.js.map
