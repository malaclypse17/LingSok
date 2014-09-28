﻿/// <reference path='../../_all.ts' />
class LingDataSvc implements Interfaces.ILingDataSvc {
    private fireBaseUrl: string;
    private docList;
    private tagList;
    public auth;

    constructor($firebase, $firebaseSimpleLogin,$rootScope) {
        var self = this;
        this.fireBaseUrl = "https://lingsearch.firebaseio.com/";
        var fireBaseLingDocsRef = new Firebase(this.fireBaseUrl + 'documents');
        self.docList = $firebase(fireBaseLingDocsRef).$asArray();       
        var fireBaseLingTagsRef = new Firebase(this.fireBaseUrl + 'tags');
        this.tagList = $firebase(fireBaseLingTagsRef).$asArray();
        var ref = new Firebase(this.fireBaseUrl);
        this.auth = $firebaseSimpleLogin(ref);
    }

    public static LingDataSvc($firebase, $firebaseSimpleLogin, $rootScope): LingDataSvc {
        return new LingDataSvc($firebase, $firebaseSimpleLogin, $rootScope);
    }

    all() {
        return this.docList;
    }

    initTags() {
        this.tagList.$add(new Model.Tag("kavallerisabel", 3));
        this.tagList.$add(new Model.Tag("brottning", 4));
        this.tagList.$add(new Model.Tag("övriga vapen", 5));
        this.tagList.$add(new Model.Tag("fäktteori", 6));
        this.tagList.$add(new Model.Tag("stridstaktik", 7));
        this.tagList.$add(new Model.Tag("artikel", 8));
    }

    allTags() {
        //this.initTags();
        return this.tagList;
    }
    createTag(newTag: Model.Tag) { return this.tagList.$add(newTag);  }
    create(newDoc: Model.LingDoc) { return this.docList.$add(newDoc); }
    update(doc: Model.LingDoc) { return this.docList.$save(doc); }
    delete(doc) { return this.docList.$remove(doc); }
}
var app = angular.module('lingSearchApp');
LingDataSvc.$inject = ['$firebase', '$firebaseSimpleLogin', '$rootScope'];
app.service('lingDataSvc', ["$firebase", '$firebaseSimpleLogin', '$rootScope', LingDataSvc]);