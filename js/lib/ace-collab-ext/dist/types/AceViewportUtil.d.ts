import { Ace } from "ace-builds";
import { IIndexRange } from "./IndexRange";
import { IRowRange } from "./RowRange";
export declare class AceViewportUtil {
    static getVisibleIndexRange(editor: Ace.Editor): IIndexRange;
    static indicesToRows(editor: Ace.Editor, startIndex: number, endIndex: number): IRowRange;
}
