import { Ace } from "ace-builds";
import { IRowRange } from "./RowRange";
/**
 * Implements viewport awareness in the Ace Editor by showing where remote
 * users are scrolled too and where there cursor is in the document, even
 * if the cursor is not in view.
 */
export declare class AceRadarView {
    private readonly _views;
    private readonly _editor;
    private _container;
    /**
     * Constructs a new AceRadarView bound to the supplied element and editor.
     *
     * @param element
     *          The HTML Element that the AceRadarView should render to.
     * @param editor
     *          The Ace Editor to listen to events from.
     */
    constructor(element: HTMLElement | string, editor: Ace.Editor);
    /**
     * Add a view indicator for a new remote user.
     *
     * @param id
     *          The unique id of the user.
     * @param label
     *          A text label to displAce for the user.
     * @param color
     *          The color to render the indicator with.
     * @param viewRows
     *          The rows the user's viewport spans.
     * @param cursorRow
     *          The row that the user's cursor is on.
     */
    addView(id: string, label: string, color: string, viewRows: IRowRange, cursorRow: number): void;
    /**
     * Determines if the AceRadarView has an indicator for this specified user.
     *
     * @param id
     *          The id of the user to check for.
     * @returns
     *   True if the AceRadarView has an indicator for this user, false otherwise.
     */
    hasView(id: string): boolean;
    /**
     * Sets the view row span for a particular user.
     *
     * @param id
     *          The id of the user to set the rows for.
     * @param rows
     *          The row range to set.
     */
    setViewRows(id: string, rows: IRowRange): void;
    /**
     * Sets the cursor row for a particular user.
     *
     * @param id
     *          The id of the user to set the cursor row for.
     * @param row
     *          The row to set.
     */
    setCursorRow(id: string, row: number): void;
    /**
     * Clears the view for a particular user, causing their indicator to disapear.
     * @param id
     *   The id of the user to clear.
     */
    clearView(id: string): void;
    /**
     * Removes the view indicator for the specified user.
     * @param id
     *   The id of the user to remove the view indicator for.
     */
    removeView(id: string): void;
}
