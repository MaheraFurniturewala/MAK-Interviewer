export class AceSelectionMarker {
    constructor(session, selectionId, label, color, ranges) {
        this._session = session;
        this._label = label;
        this._color = color;
        this._ranges = ranges || [];
        this._selectionId = selectionId;
        this._id = null;
        this._markerElement = document.createElement("div");
    }
    update(_, markerLayer, session, layerConfig) {
        while (this._markerElement.hasChildNodes()) {
            this._markerElement.removeChild(this._markerElement.lastChild);
        }
        this._ranges.forEach((range) => {
            this._renderRange(markerLayer, session, layerConfig, range);
        });
        this._markerElement.remove();
        markerLayer.elt("remote-selection", "");
        const parentNode = markerLayer.element.childNodes[markerLayer.i - 1] || markerLayer.element.lastChild;
        parentNode.appendChild(this._markerElement);
    }
    setSelection(ranges) {
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
    }
    getLabel() {
        return this._label;
    }
    selectionId() {
        return this._selectionId;
    }
    markerId() {
        return this._id;
    }
    _renderLine(bounds) {
        const div = document.createElement("div");
        div.className = "ace-multi-selection";
        div.style.backgroundColor = this._color;
        if (typeof bounds.height === "number") {
            div.style.height = `${bounds.height}px`;
        }
        if (typeof bounds.width === "number") {
            div.style.width = `${bounds.width}px`;
        }
        if (typeof bounds.top === "number") {
            div.style.top = `${bounds.top}px`;
        }
        if (typeof bounds.left === "number") {
            div.style.left = `${bounds.left}px`;
        }
        if (typeof bounds.bottom === "number") {
            div.style.bottom = `${bounds.bottom}px`;
        }
        if (typeof bounds.right === "number") {
            div.style.right = `${bounds.right}px`;
        }
        this._markerElement.append(div);
    }
    _renderRange(markerLayer, session, layerConfig, range) {
        const screenRange = range.toScreenRange(session);
        let height = layerConfig.lineHeight;
        let top = markerLayer.$getTop(screenRange.start.row, layerConfig);
        let width = 0;
        const right = 0;
        const left = markerLayer.$padding + screenRange.start.column * layerConfig.characterWidth;
        if (screenRange.isMultiLine()) {
            // Render the start line
            this._renderLine({ height, right, top, left });
            // from start of the last line to the selection end
            top = markerLayer.$getTop(screenRange.end.row, layerConfig);
            width = screenRange.end.column * layerConfig.characterWidth;
            this._renderLine({ height, width, top, left: markerLayer.$padding });
            // all the complete lines
            height = (screenRange.end.row - screenRange.start.row - 1) * layerConfig.lineHeight;
            if (height < 0) {
                return;
            }
            top = markerLayer.$getTop(screenRange.start.row + 1, layerConfig);
            this._renderLine({ height, right, top, left: markerLayer.$padding });
        }
        else {
            width = (range.end.column - range.start.column) * layerConfig.characterWidth;
            this._renderLine({ height, width, top, left });
        }
    }
    _forceSessionUpdate() {
        this._session._signal("changeBackMarker");
    }
}
//# sourceMappingURL=AceSelectionMarker.js.map