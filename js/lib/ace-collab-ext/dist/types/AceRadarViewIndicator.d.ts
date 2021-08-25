import { Ace } from "ace-builds";
import { IRowRange } from "./RowRange";
export declare class AceRadarViewIndicator {
    private readonly _label;
    private readonly _color;
    private readonly _editorListener;
    private readonly _scrollElement;
    private readonly _cursorElement;
    private readonly _wrapper;
    private _viewRows;
    private _cursorRow;
    private _editor;
    private _docLineCount;
    constructor(label: string, color: string, viewRows: IRowRange, cursorRow: number, editor: Ace.Editor);
    element(): HTMLDivElement;
    setCursorRow(cursorRow: number): void;
    setViewRows(viewRows: IRowRange): void;
    update(): void;
    dispose(): void;
}
