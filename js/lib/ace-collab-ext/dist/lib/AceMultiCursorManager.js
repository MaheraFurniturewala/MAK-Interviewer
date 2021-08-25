"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceMultiCursorManager = void 0;
var AceCursorMarker_1 = require("./AceCursorMarker");
/**
 * Implements multiple colored cursors in the ace editor.  Each cursor is
 * associated with a particular user. Each user is identified by a unique id
 * and has a color associated with them.  Each cursor has a position in the
 * editor which is specified by a 2-d row and column ({row: 0, column: 10}).
 */
var AceMultiCursorManager = /** @class */ (function () {
    /**
     * Constructs a new AceMultiCursorManager that is bound to a particular
     * Ace EditSession instance.
     *
     * @param session
     *   The Ace EditSession to bind to.
     */
    function AceMultiCursorManager(session) {
        this._cursors = {};
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
     * @param position
     *   A 2-d position or linear index indicating the location of the cursor.
     */
    AceMultiCursorManager.prototype.addCursor = function (id, label, color, position) {
        if (this._cursors[id] !== undefined) {
            throw new Error("Cursor with id already defined: " + id);
        }
        var marker = new AceCursorMarker_1.AceCursorMarker(this._session, id, label, color, position);
        this._cursors[id] = marker;
        this._session.addDynamicMarker(marker, true);
    };
    /**
     * Updates the selection for a particular user.
     *
     * @param id
     *   The unique identifier for the user.
     * @param position
     *   A 2-d position or linear index indicating the location of the cursor.
     */
    AceMultiCursorManager.prototype.setCursor = function (id, position) {
        var cursor = this._getCursor(id);
        cursor.setPosition(position);
    };
    /**
     * Clears the cursor (but does not remove it) for the specified user.
     *
     * @param id
     *   The unique identifier for the user.
     */
    AceMultiCursorManager.prototype.clearCursor = function (id) {
        var cursor = this._getCursor(id);
        cursor.setPosition(null);
    };
    /**
     * Removes the cursor for the specified user.
     *
     * @param id
     *   The unique identifier for the user.
     */
    AceMultiCursorManager.prototype.removeCursor = function (id) {
        var cursor = this._cursors[id];
        if (cursor === undefined) {
            throw new Error("Cursor not found: " + id);
        }
        // Note: ace adds an id field to all added markers.
        this._session.removeMarker(cursor.id);
        delete this._cursors[id];
    };
    /**
     * Removes all cursors.
     */
    AceMultiCursorManager.prototype.removeAll = function () {
        var _this = this;
        Object.getOwnPropertyNames(this._cursors).forEach(function (key) {
            _this.removeCursor(_this._cursors[key].cursorId());
        });
    };
    AceMultiCursorManager.prototype._getCursor = function (id) {
        var cursor = this._cursors[id];
        if (cursor === undefined) {
            throw new Error("Cursor not found: " + id);
        }
        return cursor;
    };
    return AceMultiCursorManager;
}());
exports.AceMultiCursorManager = AceMultiCursorManager;
//# sourceMappingURL=AceMultiCursorManager.js.map