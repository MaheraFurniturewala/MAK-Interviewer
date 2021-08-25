"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceViewportUtil = void 0;
var AceViewportUtil = /** @class */ (function () {
    function AceViewportUtil() {
    }
    AceViewportUtil.getVisibleIndexRange = function (editor) {
        var firstRow = editor.getFirstVisibleRow();
        var lastRow = editor.getLastVisibleRow();
        if (!editor.isRowFullyVisible(firstRow)) {
            firstRow++;
        }
        if (!editor.isRowFullyVisible(lastRow)) {
            lastRow--;
        }
        var startPos = editor.getSession().getDocument().positionToIndex({ row: firstRow, column: 0 }, 0);
        // todo, this should probably be the end of the row
        var endPos = editor.getSession().getDocument().positionToIndex({ row: lastRow, column: 0 }, 0);
        return {
            start: startPos,
            end: endPos
        };
    };
    AceViewportUtil.indicesToRows = function (editor, startIndex, endIndex) {
        var startRow = editor.getSession().getDocument().indexToPosition(startIndex, 0).row;
        var endRow = editor.getSession().getDocument().indexToPosition(endIndex, 0).row;
        return {
            start: startRow,
            end: endRow
        };
    };
    return AceViewportUtil;
}());
exports.AceViewportUtil = AceViewportUtil;
//# sourceMappingURL=AceViewportUtil.js.map