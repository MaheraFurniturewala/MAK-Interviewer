export class AceViewportUtil {
    static getVisibleIndexRange(editor) {
        let firstRow = editor.getFirstVisibleRow();
        let lastRow = editor.getLastVisibleRow();
        if (!editor.isRowFullyVisible(firstRow)) {
            firstRow++;
        }
        if (!editor.isRowFullyVisible(lastRow)) {
            lastRow--;
        }
        const startPos = editor.getSession().getDocument().positionToIndex({ row: firstRow, column: 0 }, 0);
        // todo, this should probably be the end of the row
        const endPos = editor.getSession().getDocument().positionToIndex({ row: lastRow, column: 0 }, 0);
        return {
            start: startPos,
            end: endPos
        };
    }
    static indicesToRows(editor, startIndex, endIndex) {
        const startRow = editor.getSession().getDocument().indexToPosition(startIndex, 0).row;
        const endRow = editor.getSession().getDocument().indexToPosition(endIndex, 0).row;
        return {
            start: startRow,
            end: endRow
        };
    }
}
//# sourceMappingURL=AceViewportUtil.js.map