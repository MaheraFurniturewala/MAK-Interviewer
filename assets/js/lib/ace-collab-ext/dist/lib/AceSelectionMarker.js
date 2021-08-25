"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceSelectionMarker = void 0;
var AceSelectionMarker = /** @class */ (function () {
    function AceSelectionMarker(session, selectionId, label, color, ranges) {
        this._session = session;
        this._label = label;
        this._color = color;
        this._ranges = ranges || [];
        this._selectionId = selectionId;
        this._id = null;
        this._markerElement = document.createElement("div");
    }
    AceSelectionMarker.prototype.update = function (_, markerLayer, session, layerConfig) {
        var _this = this;
        while (this._markerElement.hasChildNodes()) {
            this._markerElement.removeChild(this._markerElement.lastChild);
        }
        this._ranges.forEach(function (range) {
            _this._renderRange(markerLayer, session, layerConfig, range);
        });
        this._markerElement.remove();
        markerLayer.elt("remote-selection", "");
        var parentNode = markerLayer.element.childNodes[markerLayer.i - 1] || markerLayer.element.lastChild;
        parentNode.appendChild(this._markerElement);
    };
    AceSelectionMarker.prototype.setSelection = function (ranges) {
        if (ranges === undefined || ranges === null) {
            this._ranges = [];
        }
        else if (ranges instanceof Array) {
            this._ranges = ranges;
        }
        else {
            this._ranges = [ranges];
        }
        this._forceSessionUpdate();
    };
    AceSelectionMarker.prototype.getLabel = function () {
        return this._label;
    };
    AceSelectionMarker.prototype.selectionId = function () {
        return this._selectionId;
    };
    AceSelectionMarker.prototype.markerId = function () {
        return this._id;
    };
    AceSelectionMarker.prototype._renderLine = function (bounds) {
        var div = document.createElement("div");
        div.className = "ace-multi-selection";
        div.style.backgroundColor = this._color;
        if (typeof bounds.height === "number") {
            div.style.height = bounds.height + "px";
        }
        if (typeof bounds.width === "number") {
            div.style.width = bounds.width + "px";
        }
        if (typeof bounds.top === "number") {
            div.style.top = bounds.top + "px";
        }
        if (typeof bounds.left === "number") {
            div.style.left = bounds.left + "px";
        }
        if (typeof bounds.bottom === "number") {
            div.style.bottom = bounds.bottom + "px";
        }
        if (typeof bounds.right === "number") {
            div.style.right = bounds.right + "px";
        }
        this._markerElement.append(div);
    };
    AceSelectionMarker.prototype._renderRange = function (markerLayer, session, layerConfig, range) {
        var screenRange = range.toScreenRange(session);
        var height = layerConfig.lineHeight;
        var top = markerLayer.$getTop(screenRange.start.row, layerConfig);
        var width = 0;
        var right = 0;
        var left = markerLayer.$padding + screenRange.start.column * layerConfig.characterWidth;
        if (screenRange.isMultiLine()) {
            // Render the start line
            this._renderLine({ height: height, right: right, top: top, left: left });
            // from start of the last line to the selection end
            top = markerLayer.$getTop(screenRange.end.row, layerConfig);
            width = screenRange.end.column * layerConfig.characterWidth;
            this._renderLine({ height: height, width: width, top: top, left: markerLayer.$padding });
            // all the complete lines
            height = (screenRange.end.row - screenRange.start.row - 1) * layerConfig.lineHeight;
            if (height < 0) {
                return;
            }
            top = markerLayer.$getTop(screenRange.start.row + 1, layerConfig);
            this._renderLine({ height: height, right: right, top: top, left: markerLayer.$padding });
        }
        else {
            width = (range.end.column - range.start.column) * layerConfig.characterWidth;
            this._renderLine({ height: height, width: width, top: top, left: left });
        }
    };
    AceSelectionMarker.prototype._forceSessionUpdate = function () {
        this._session._signal("changeBackMarker");
    };
    return AceSelectionMarker;
}());
exports.AceSelectionMarker = AceSelectionMarker;
//# sourceMappingURL=AceSelectionMarker.js.map