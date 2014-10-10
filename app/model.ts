module Model {
    export class LingDoc {
        $id: string;
        id: number;
        title: string;
        donor: string;
        description: string;
        author: string;
        year: number;
        pages: number;
        language: string;
        city: string;
        url: string;
        urlSource: string;
        fullFile: string;
        croppedFile: string;
        transcription: string;
        illustrations: string;
        titlePage: string;
        titlepageThumbnail: string;
        tags: Array<boolean>;
        constructor() {
            this.title = "";
            this.language = "Svenska";
            this.illustrations = "Inga illustrationer";
            this.tags = [];
        }
        
    }

    export class Tag {
        tagId: number;
        name: string;
        constructor(name:string,tagId:number) {
            this.name = name;
            this.tagId = tagId;
        }
    }
}