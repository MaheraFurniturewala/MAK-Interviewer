import { Ace } from "ace-builds";
/**
 * Implements multiple colored cursors in the ace editor.  Each cursor is
 * associated with a particular user. Each user is identified by a unique id
 * and has a color associated with them.  Each cursor has a position in the
 * editor which is specified by a 2-d row and column ({row: 0, column: 10}).
 */
export declare class AceMultiCursorManager {
    private readonly _cursors;
    private readonly _session;
    /**
     * Constructs a new AceMultiCursorManager that is bound to a particular
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
     * @param position
     *   A 2-d position or linear index indicating the location of the cursor.
     */
    addCursor(id: string, label: string, color: string, position: number | Ace.Point): void;
    /**
     * Updates the selection for a particular user.
     *
     * @param id
     *   The unique identifier for the user.
     * @param position
     *   A 2-d position or linear index indicating the location of the cursor.
     */
    setCursor(id: string, position: number | Ace.Point): void;
    /**
     * Clears the cursor (but does not remove it) for the specified user.
     *
     * @param id
     *   The unique identifier for the user.
     */
    clearCursor(id: string): void;
    /**
     * Removes the cursor for the specified user.
     *
     * @param id
     *   The unique identifier for the user.
     */
    removeCursor(id: string): void;
    /**
     * Removes all cursors.
     */
    removeAll(): void;
    private _getCursor;
}
