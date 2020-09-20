class ContentBuilderInstance
{
    constructor() {
        this.registerEvents();
    }

    // getSortingByContent = _content => {
    //     let sorting = null;

    //     $("#page-content [contenteditable='true']").each(function(i, content) {
    //         if($(content).is($(_content))) {
    //             sorting = i;
    //         }

    //         i++;
    //     });

    //     return sorting;
    // };

    registerEvents = () => {
        $("#sidebar-toggler, #sidebar-closer").on("click", this, () => {
            $("#sidebar").toggleClass("inactive");
        });

        $("#sidebar .list .item").each(function(i, item) {
            let $this = $(item);

            $this.on("click", this, () => {
                $("#page-content .content-placeholder:not(.cp-active)").addClass("cp-active");

                $("#sidebar .list .item.active").removeClass("active");
                $(this).addClass("active");
            });
        });

        $("#page-content .content-placeholder").each(function(i, placeholder) {
            let $this = $(placeholder);

            $this.on("click", this, () => {
                $("#page-content .content-placeholder.cp-active").removeClass("cp-active");

                let html = ContentBuilder.getSidebarItems("headings").html;

                html = "<div class='col' contenteditable='true'>" + html + "</div>";

                $(html).insertAfter($(this));
            });
        });
    }

    /**
     * Items for the sidebar menu.
     * 
     * @type {object}
     */
    sidebarItems = [
        {
            identifier: "headings",
            html: "<div class='headings'><h3>Header</h3><hr><p>Lorem ipsum amazing text!</p></div>"
        }
    ];

    /**
     * Returns the sidebar-items.
     * Optionally also finds by its identifier.
     * 
     * @param {string} identifier
     * 
     * @returns {object}
     */
    getSidebarItems = (identifier = "") => {
        if(identifier != "") {
            let sidebarItems = this.sidebarItems;
            let _item = null;

            sidebarItems.forEach(item => {
                if(item.identifier == identifier) {
                    _item = item;
                }
            });

            return _item;
        }

        return this.sidebarItems;
    }

    /**
     * Adds a new item to the sidebar-items menu.
     * 
     * @param {object} item A JSON-object to pass for the sidebarItems-array.
     */
    addSidebarItem = (item) => {
        this.getSidebarItems().push(item);
    }
}

function makeBold()
{
    // wrapSelectedTextWithHtml("b");
}

function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
                el.innerHTML = html;

            var frag = document.createDocumentFragment(), node, lastNode;

            while((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }

            var firstNode = frag.firstChild;
            range.insertNode(frag);
            
            // Preserve the selection
            if(lastNode) {
                range = range.cloneRange();

                if(selectPastedContent) {
                    range.setStartAfter(lastNode);
                } else {
                    range.setStartBefore(firstNode);
                    range.collapse(true);
                }

                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ((sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
            originalRange.collapse(true);
        
        sel.createRange().pasteHTML(html);

        var range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
    }
}

function wrapSelectedTextWithHtml(newNode) {
    var sel,
        range;

    var htmlNode = "<" + newNode + "></" + newNode + ">";

    if(window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();

        if(sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
                el.innerHTML = htmlNode;

            var frag = document.createDocumentFragment(), node, lastNode;

            while((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }

            console.log($(range.startContainer.parentNode).is(newNode));

            range.surroundContents(lastNode);
            range.selectNodeContents(lastNode);

            // Preserve the selection
            if(lastNode) {
                range = range.cloneRange();

                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ((sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
            originalRange.collapse(true);
        
        sel.createRange().pasteHTML(htmlNode);

        var range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
    }
}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}

var quill = new Quill('.content', {
    modules: {
      toolbar: {
        container: '#rte-toolbar'
      }
    }
  });
