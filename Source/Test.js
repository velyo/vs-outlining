
Test = function () { };

Test.prototype = 
{
    layout: function Seeems$BackOffice$_Manager$layout(partial) {
        if ($.browser.msie && $.browser.version == 7) { // ugly fix for IE7 to please Michel :)
            this.applyAutoHeight();
            Test();
            alert();
            var self = this;
            window.setTimeout(function () {
                self.restoreScrollPosition();
                if (!partial || self.selecting)
                    self.ensureVisibleSelected();
                self.showPanels();
                window.setTimeout(function () { self.applyBodyClass(); }, 0);
            }, 50);
        }        else {
            this.applyAutoHeight();
            this.restoreScrollPosition();
            if (!partial || this.selecting)
                this.ensureVisibleSelected();
            this.showPanels();

            var self = this;
            window.setTimeout(function () { self.applyBodyClass(); }, 0);
        }
    }
}

//#region long region
your content here between ...
//#endregion