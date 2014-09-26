/// <reference path='../../_all.ts' />
var LingDataSvc = (function () {
    function LingDataSvc($firebase) {
        var self = this;
        this.fireBaseUrl = "https://lingsearch.firebaseio.com/";
        var fireBaseLingDocsRef = new Firebase(this.fireBaseUrl + 'documents');
        self.docList = $firebase(fireBaseLingDocsRef).$asArray();
        var fireBaseLingTagsRef = new Firebase(this.fireBaseUrl + 'tags');
        this.tagList = $firebase(fireBaseLingTagsRef).$asArray();
    }
    LingDataSvc.LingDataSvc = function ($firebase) {
        return new LingDataSvc($firebase);
    };

    LingDataSvc.prototype.all = function () {
        return this.docList;
    };

    LingDataSvc.prototype.initTags = function () {
        this.tagList.$add(new Model.Tag("kavallerisabel", 3));
        this.tagList.$add(new Model.Tag("brottning", 4));
        this.tagList.$add(new Model.Tag("övriga vapen", 5));
        this.tagList.$add(new Model.Tag("fäktteori", 6));
        this.tagList.$add(new Model.Tag("stridstaktik", 7));
        this.tagList.$add(new Model.Tag("artikel", 8));
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
LingDataSvc.$inject = ['$firebase'];
app.service('lingDataSvc', ["$firebase", LingDataSvc]);
//# sourceMappingURL=lingDataSvc.js.map
