/**
 * Represents a marker of a remote users cursor.
 */
export class AceCursorMarker {
    /**
     * Constructs a new AceCursorMarker
     * @param session The Ace Editor Session to bind to.
     * @param cursorId the unique id of this cursor.
     * @param label The label to display over the cursor.
     * @param color The css color of the cursor
     * @param position The row / column coordinate of the cursor marker.
     */
    constructor(session, cursorId, label, color, position) {
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
    update(_, markerLayer, __, layerConfig) {
        if (this._position === null) {
            return;
        }
        const screenPosition = this._session.documentToScreenPosition(this._position.row, this._position.column);
        const top = markerLayer.$getTop(screenPosition.row, layerConfig);
        const left = markerLayer.$padding + screenPosition.column * layerConfig.characterWidth;
        const height = layerConfig.lineHeight;
        const cursorTop = top + 2;
        const cursorHeight = height - 3;
        const cursorLeft = left;
        const cursorWidth = 2;
        this._cursorElement.style.height = `${cursorHeight}px`;
        this._cursorElement.style.width = `${cursorWidth}px`;
        this._cursorElement.style.top = `${cursorTop}px`;
        this._cursorElement.style.left = `${cursorLeft}px`;
        let toolTipTop = cursorTop - height;
        if (toolTipTop < 5) {
            toolTipTop = cursorTop + height - 1;
        }
        const toolTipLeft = cursorLeft;
        this._tooltipElement.style.top = `${toolTipTop - 2}px`;
        this._tooltipElement.style.left = `${toolTipLeft - 2}px`;
        // Remove the content node from whatever parent it might have now
        // and add it to the new parent node.
        this._markerElement.remove();
        markerLayer.elt("remote-cursor", "");
        const parentNode = markerLayer.element.childNodes[markerLayer.i - 1] || markerLayer.element.lastChild;
        parentNode.appendChild(this._markerElement);
    }
    /**
     * Sets the location of the cursor marker.
     * @param position The position of cursor marker.
     */
    setPosition(position) {
        this._position = this._convertPosition(position);
        this._forceSessionUpdate();
        this._tooltipElement.style.opacity = "1";
        this._scheduleTooltipHide();
    }
    /**
     * Sets the marker to visible / invisible.
     *
     * @param visible true if the marker should be displayed, false otherwise.
     */
    setVisible(visible) {
        const old = this._visible;
        this._visible = visible;
        if (old !== this._visible) {
            this._markerElement.style.visibility = visible ? "visible" : "hidden";
            this._forceSessionUpdate();
        }
    }
    /**
     * Determines if the marker should be visible.
     *
     * @returns true if the cursor should be visible, false otherwise.
     */
    isVisible() {
        return this._visible;
    }
    /**
     * Gets the unique id of this cursor.
     * @returns the unique id of this cursor.
     */
    cursorId() {
        return this._cursorId;
    }
    /**
     * Gets the id of the marker.
     * @returns The marker id.
     */
    markerId() {
        return this._id;
    }
    /**
     * Gets the label of the marker.
     * @returns The marker"s label.
     */
    getLabel() {
        return this._label;
    }
    _forceSessionUpdate() {
        this._session._signal("changeFrontMarker");
    }
    _convertPosition(position) {
        if (position === null) {
            return null;
        }
        else if (typeof position === "number") {
            return this._session.getDocument().indexToPosition(position, 0);
        }
        else if (typeof position.row === "number" && typeof position.column === "number") {
            return position;
        }
        throw new Error(`Invalid position: ${position}`);
    }
    _scheduleTooltipHide() {
        if (this._tooltipTimeout !== null) {
            clearTimeout(this._tooltipTimeout);
        }
        this._tooltipTimeout = setTimeout(() => {
            this._tooltipElement.style.opacity = "0";
            this._tooltipTimeout = null;
        }, 2000);
    }
}
//# sourceMappingURL=AceCursorMarker.js.map