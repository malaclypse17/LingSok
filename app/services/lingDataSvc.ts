/// <reference path='../../_all.ts' />
class LingDataSvc implements Interfaces.ILingDataSvc {
    private fireBaseUrl: string;
    private docList;
    private tagList;
    public auth;

    constructor($firebase,$rootScope) {
        var self = this;
        this.fireBaseUrl = "https://lingsearch.firebaseio.com/";
        var fireBaseLingDocsRef = new Firebase(this.fireBaseUrl + 'documents');
        self.docList = $firebase(fireBaseLingDocsRef).$asArray();       
        var fireBaseLingTagsRef = new Firebase(this.fireBaseUrl + 'tags');
        this.tagList = $firebase(fireBaseLingTagsRef).$asArray();
        var ref = new Firebase(this.fireBaseUrl);
        this.auth = ref;    
    }

    public static LingDataSvc($firebase, $rootScope): LingDataSvc {
        return new LingDataSvc($firebase, $rootScope);
    }

    all() {
        return this.docList;
    }

    allTags() {
        return this.tagList;
    }
    createTag(newTag: Model.Tag) { return this.tagList.$add(newTag);  }
    create(newDoc: Model.LingDoc) { return this.docList.$add(newDoc); }
    update(doc: Model.LingDoc) { return this.docList.$save(doc); }
    delete(doc) { return this.docList.$remove(doc); }
}
var app = angular.module('lingSearchApp');
LingDataSvc.$inject = ['$firebase', '$rootScope'];
app.service('lingDataSvc', ["$firebase", '$rootScope', LingDataSvc]);