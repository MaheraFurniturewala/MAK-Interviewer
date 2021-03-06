"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceCursorMarker = void 0;
/**
 * Represents a marker of a remote users cursor.
 */
var AceCursorMarker = /** @class */ (function () {
    /**
     * Constructs a new AceCursorMarker
     * @param session The Ace Editor Session to bind to.
     * @param cursorId the unique id of this cursor.
     * @param label The label to display over the cursor.
     * @param color The css color of the cursor
     * @param position The row / column coordinate of the cursor marker.
     */
    function AceCursorMarker(session, cursorId, label, color, position) {
        this._session = session;
        this._label = label;
        this._color = color;
        this._position = position ? this._convertPosition(position) : null;
        this._cursorId = cursorId;
        this._id = null;
        this._visible = false;
        this._tooltipTimeout = null;
        // Create the HTML elements
        this._markerElement = document.createElement("div");
        this._cursorElement = document.createElement("div");
        this._cursorElement.className = "ace-multi-cursor";
        this._cursorElement.style.background = this._color;
        this._markerElement.append(this._cursorElement);
        this._tooltipElement = document.createElement("div");
        this._tooltipElement.className = "ace-multi-cursor-tooltip";
        this._tooltipElement.style.background = this._color;
        this._tooltipElement.style.opacity = "0";
        this._tooltipElement.innerHTML = label;
        this._markerElement.append(this._tooltipElement);
    }
    /**
     * Called by Ace to update the rendering of the marker.
     *
     * @param _ The html to render, represented by an array of strings.
     * @param markerLayer The marker layer containing the cursor marker.
     * @param __ The ace edit session.
     * @param layerConfig
     */
    AceCursorMarker.prototype.update = function (_, markerLayer, __, layerConfig) {
        if (this._position === null) {
            return;
        }
        var screenPosition = this._session.documentToScreenPosition(this._position.row, this._position.column);
        var top = markerLayer.$getTop(screenPosition.row, layerConfig);
        var left = markerLayer.$padding + screenPosition.column * layerConfig.characterWidth;
        var height = layerConfig.lineHeight;
        var cursorTop = top + 2;
        var cursorHeight = height - 3;
        var cursorLeft = left;
        var cursorWidth = 2;
        this._cursorElement.style.height = cursorHeight + "px";
        this._cursorElement.style.width = cursorWidth + "px";
        this._cursorElement.style.top = cursorTop + "px";
        this._cursorElement.style.left = cursorLeft + "px";
        var toolTipTop = cursorTop - height;
        if (toolTipTop < 5) {
            toolTipTop = cursorTop + height - 1;
        }
        var toolTipLeft = cursorLeft;
        this._tooltipElement.style.top = toolTipTop - 2 + "px";
        this._tooltipElement.style.left = toolTipLeft - 2 + "px";
        // Remove the content node from whatever parent it might have now
        // and add it to the new parent node.
        this._markerElement.remove();
        markerLayer.elt("remote-cursor", "");
        var parentNode = markerLayer.element.childNodes[markerLayer.i - 1] || markerLayer.element.lastChild;
        parentNode.appendChild(this._markerElement);
    };
    /**
     * Sets the location of the cursor marker.
     * @param position The position of cursor marker.
     */
    AceCursorMarker.prototype.setPosition = function (position) {
        this._position = this._convertPosition(position);
        this._forceSessionUpdate();
        this._tooltipElement.style.opacity = "1";
        this._scheduleTooltipHide();
    };
    /**
     * Sets the marker to visible / invisible.
     *
     * @param visible true if the marker should be displayed, false otherwise.
     */
    AceCursorMarker.prototype.setVisible = function (visible) {
        var old = this._visible;
        this._visible = visible;
        if (old !== this._visible) {
            this._markerElement.style.visibility = visible ? "visible" : "hidden";
            this._forceSessionUpdate();
        }
    };
    /**
     * Determines if the marker should be visible.
     *
     * @returns true if the cursor should be visible, false otherwise.
     */
    AceCursorMarker.prototype.isVisible = function () {
        return this._visible;
    };
    /**
     * Gets the unique id of this cursor.
     * @returns the unique id of this cursor.
     */
    AceCursorMarker.prototype.cursorId = function () {
        return this._cursorId;
    };
    /**
     * Gets the id of the marker.
     * @returns The marker id.
     */
    AceCursorMarker.prototype.markerId = function () {
        return this._id;
    };
    /**
     * Gets the label of the marker.
     * @returns The marker"s label.
     */
    AceCursorMarker.prototype.getLabel = function () {
        return this._label;
    };
    AceCursorMarker.prototype._forceSessionUpdate = function () {
        this._session._signal("changeFrontMarker");
    };
    AceCursorMarker.prototype._convertPosition = function (position) {
        if (position === null) {
            return null;
        }
        else if (typeof position === "number") {
            return this._session.getDocument().indexToPosition(position, 0);
        }
        else if (typeof position.row === "number" && typeof position.column === "number") {
            return position;
        }
        throw new Error("Invalid position: " + position);
    };
    AceCursorMarker.prototype._scheduleTooltipHide = function () {
        var _this = this;
        if (this._tooltipTimeout !== null) {
            clearTimeout(this._tooltipTimeout);
        }
        this._tooltipTimeout = setTimeout(function () {
            _this._tooltipElement.style.opacity = "0";
            _this._tooltipTimeout = null;
        }, 2000);
    };
    return AceCursorMarker;
}());
exports.AceCursorMarker = AceCursorMarker;
//# sourceMappingURL=AceCursorMarker.js.map