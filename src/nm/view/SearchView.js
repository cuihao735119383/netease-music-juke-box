import View from "../../nju/view/View";
import ListView from "../../nju/view/ListView";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this._text = null;
        this.$element.append(`<span class="icon iconfont icon-search"/>`);
        this.$input = $(`<input type=search placeholder="搜索音乐">`);
        this.$element.append(this.$input);
        this._initSuggestView();

        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_onclick.bind(this));
        this.$element.on("input", this._suggest_oninput.bind(this));

    }

    get text()
    {
        return this.$input.val();
    }

    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }

    _initSuggestView()
    {
        this.suggestView = new ListView("suggest-view");
        this.suggestView.addStyleClass("nm-suggest-view");
        this.addSubView(this.suggestView);
    }

    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            this.trigger("search");
        }
    }

    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            this.search();
        }
    }

    _icon_onclick(e)
    {
        this.search();
    }

    _suggest_oninput(e)
    {
        console.log("_suggest_oninput");
    }
}