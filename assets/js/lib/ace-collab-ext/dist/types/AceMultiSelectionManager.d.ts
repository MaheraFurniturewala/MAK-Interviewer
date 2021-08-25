import { Ace } from "ace-builds";
/**
 * Implements multiple colored selections in the ace editor.  Each selection is
 * associated with a particular user. Each user is identified by a unique id
 * and has a color associated with them.  The selection manager supports block
 * selection through multiple AceRanges.
 */
export declare class AceMultiSelectionManager {
    private readonly _selections;
    private readonly _session;
    /**
     * Constructs a new AceMultiSelectionManager that is bound to a particular
     * Ace EditSession instance.
     *
     * @param session
     *   The Ace EditSession to bind to.
     */
    constructor(session: Ace.EditSession);
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
    addSelection(id: string, label: string, color: string, ranges: Ace.Range[]): void;
    /**
     * Updates the selection for a particular user.
     *
     * @param id
     *   The unique identifier for the user.
     * @param ranges
     *   The array of ranges that specify the selection.
     */
    setSelection(id: string, ranges: Ace.Range[]): void;
    /**
     * Clears the selection (but does not remove it) for the specified user.
     * @param id
     *   The unique identifier for the user.
     */
    clearSelection(id: string): void;
    /**
     * Removes the selection for the specified user.
     * @param id
     *   The unique identifier for the user.
     */
    removeSelection(id: string): void;
    /**
     * Removes all selections.
     */
    removeAll(): void;
    private _getSelection;
}
