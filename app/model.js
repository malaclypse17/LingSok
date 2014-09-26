var Model;
(function (Model) {
    var LingDoc = (function () {
        function LingDoc() {
            this.title = "";
            this.language = "Svenska";
            this.illustrations = "Inga illustrationer";
            this.tags = [];
        }
        return LingDoc;
    })();
    Model.LingDoc = LingDoc;

    var Tag = (function () {
        function Tag(name, tagId) {
            this.name = name;
            this.tagId = tagId;
        }
        return Tag;
    })();
    Model.Tag = Tag;
})(Model || (Model = {}));
//# sourceMappingURL=model.js.map
