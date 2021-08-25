"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceMultiSelectionManager = void 0;
var AceSelectionMarker_1 = require("./AceSelectionMarker");
/**
 * Implements multiple colored selections in the ace editor.  Each selection is
 * associated with a particular user. Each user is identified by a unique id
 * and has a color associated with them.  The selection manager supports block
 * selection through multiple AceRanges.
 */
var AceMultiSelectionManager = /** @class */ (function () {
    /**
     * Constructs a new AceMultiSelectionManager that is bound to a particular
     * Ace EditSession instance.
     *
     * @param session
     *   The Ace EditSession to bind to.
     */
    function AceMultiSelectionManager(session) {
        this._selections = {};
        this._session = session;
    }
    /**
     * Adds a new collaborative selection.
     *
     * @param id
     *   The unique system identifier for the user associated with this selection.
     * @param label
     *   A human readable / meaningful label / title that identifies the user.
     * @param color
     *   A valid css color string.
     * @param ranges
     *   An array of ace ranges that specify the initial selection.
     */
    AceMultiSelectionManager.prototype.addSelection = function (id, label, color, ranges) {
        if (this._selections[id] !== undefined) {
            throw new Error("Selection with id already defined: " + id);
        }
        var marker = new AceSelectionMarker_1.AceSelectionMarker(this._session, id, label, color, ranges);
        this._selections[id] = marker;
        this._session.addDynamicMarker(marker, false);
    };
    /**
     * Updates the selection for a particular user.
     *
     * @param id
     *   The unique identifier for the user.
     * @param ranges
     *   The array of ranges that specify the selection.
     */
    AceMultiSelectionManager.prototype.setSelection = function (id, ranges) {
        var selection = this._getSelection(id);
        selection.setSelection(ranges);
    };
    /**
     * Clears the selection (but does not remove it) for the specified user.
     * @param id
     *   The unique identifier for the user.
     */
    AceMultiSelectionManager.prototype.clearSelection = function (id) {
        var selection = this._getSelection(id);
        selection.setSelection(null);
    };
    /**
     * Removes the selection for the specified user.
     * @param id
     *   The unique identifier for the user.
     */
    AceMultiSelectionManager.prototype.removeSelection = function (id) {
        var selection = this._selections[id];
        if (selection === undefined) {
            throw new Error("Selection not found: " + id);
        }
        // note: ace adds the id property to whatever marker you pass in.
        this._session.removeMarker(selection.id);
        delete this._selections[id];
    };
    /**
     * Removes all selections.
     */
    AceMultiSelectionManager.prototype.removeAll = function () {
        var _this = this;
        Object.getOwnPropertyNames(this._selections).forEach(function (key) {
            _this.removeSelection(_this._selections[key].selectionId());
        });
    };
    AceMultiSelectionManager.prototype._getSelection = function (id) {
        var selection = this._selections[id];
        if (selection === undefined) {
            throw new Error("Selection not found: " + id);
        }
        return selection;
    };
    return AceMultiSelectionManager;
}());
exports.AceMultiSelectionManager = AceMultiSelectionManager;
//# sourceMappingURL=AceMultiSelectionManager.js.map