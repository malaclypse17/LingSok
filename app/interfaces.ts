/// <reference path='../_all.ts' />
module Interfaces {

    export interface ILingDocCreateOrUpdateScope extends ng.IScope {
        document: Model.LingDoc;
        tags: Array<Model.Tag>;
        createMode: boolean;
        create();
        update();
        cancel();
    }
    export interface ILingDocListScope extends ng.IScope {
        documents;
        tags: Array<Model.Tag>;
        $container;
        filterTag: string;
        filterLanguage: string;
        reFilter();  
        openCreate();
        getFilterClasses(doc: Model.LingDoc);
        openUpdate(doc: Model.LingDoc);
        delete(doc: Model.LingDoc); 
    }
    export interface ILingSearchRouteParams extends ng.route.IRouteParamsService {
        id: string;
    }
    export interface ILingDataSvc {
        all(): Array<Model.LingDoc>;
        allTags(): Array<Model.Tag>;
        createTag(newTag: Model.Tag);
        create(newDoc: Model.LingDoc);
        update(doc: Model.LingDoc);
        delete(doc: Model.LingDoc);
    }
}