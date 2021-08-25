"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceRadarViewIndicator = void 0;
var AceRadarViewIndicator = /** @class */ (function () {
    function AceRadarViewIndicator(label, color, viewRows, cursorRow, editor) {
        var _this = this;
        this._label = label;
        this._color = color;
        this._viewRows = viewRows;
        this._cursorRow = cursorRow;
        this._editor = editor;
        this._docLineCount = editor.getSession().getLength();
        this._editorListener = function () {
            var newLineCount = _this._editor.getSession().getLength();
            if (newLineCount !== _this._docLineCount) {
                _this._docLineCount = newLineCount;
                _this.update();
            }
        };
        this._editor.on("change", this._editorListener);
        this._scrollElement = document.createElement("div");
        this._scrollElement.className = "ace-radar-view-scroll-indicator";
        this._scrollElement.style.borderColor = this._color;
        this._scrollElement.style.background = this._color;
        // todo implement a custom tooltip for consistent presentation.
        this._scrollElement.title = this._label;
        this._scrollElement.addEventListener("click", function () {
            var middle = ((_this._viewRows.end - _this._viewRows.start) / 2) + _this._viewRows.start;
            _this._editor.scrollToLine(middle, true, false, function () {
            });
        }, false);
        this._cursorElement = document.createElement("div");
        this._cursorElement.className = "ace-radar-view-cursor-indicator";
        this._cursorElement.style.background = this._color;
        this._cursorElement.title = this._label;
        this._cursorElement.addEventListener("click", function () {
            _this._editor.scrollToLine(_this._cursorRow, true, false, function () {
            });
        }, false);
        this._wrapper = document.createElement("div");
        this._wrapper.className = "ace-radar-view-wrapper";
        this._wrapper.style.display = "none";
        this._wrapper.appendChild(this._scrollElement);
        this._wrapper.appendChild(this._cursorElement);
    }
    AceRadarViewIndicator.prototype.element = function () {
        return this._wrapper;
    };
    AceRadarViewIndicator.prototype.setCursorRow = function (cursorRow) {
        this._cursorRow = cursorRow;
        this.update();
    };
    AceRadarViewIndicator.prototype.setViewRows = function (viewRows) {
        this._viewRows = viewRows;
        this.update();
    };
    AceRadarViewIndicator.prototype.update = function () {
        if (!_isSet(this._viewRows) && !_isSet(this._cursorRow)) {
            this._wrapper.style.display = "none";
        }
        else {
            this._wrapper.style.display = null;
            var maxLine = this._docLineCount - 1;
            if (!_isSet(this._viewRows)) {
                this._scrollElement.style.display = "none";
            }
            else {
                var topPercent = Math.min(maxLine, this._viewRows.start) / maxLine * 100;
                var bottomPercent = 100 - (Math.min(maxLine, this._viewRows.end) / maxLine * 100);
                this._scrollElement.style.top = topPercent + "%";
                this._scrollElement.style.bottom = bottomPercent + "%";
                this._scrollElement.style.display = null;
            }
            if (!_isSet(this._cursorRow)) {
                this._cursorElement.style.display = "none";
            }
            else {
                var cursorPercent = Math.min(this._cursorRow, maxLine) / maxLine;
                var ratio = (this._wrapper.offsetHeight - this._cursorElement.offsetHeight) / this._wrapper.offsetHeight;
                var cursorTop = cursorPercent * ratio * 100;
                this._cursorElement.style.top = cursorTop + "%";
                this._cursorElement.style.display = null;
            }
        }
    };
    AceRadarViewIndicator.prototype.dispose = function () {
        this._wrapper.parentNode.removeChild(this._wrapper);
        this._editor.off("change", this._editorListener);
    };
    return AceRadarViewIndicator;
}());
exports.AceRadarViewIndicator = AceRadarViewIndicator;
function _isSet(value) {
    return value !== undefined && value !== null;
}
//# sourceMappingURL=AceRadarViewIndicator.js.map