import { Ace } from "ace-builds";
/**
 * Represents a marker of a remote users cursor.
 */
export declare class AceCursorMarker implements Ace.MarkerLike {
    range: Ace.Range;
    type: string;
    renderer?: Ace.MarkerRenderer;
    clazz: string;
    inFront: boolean;
    id: number;
    private readonly _session;
    private readonly _label;
    private readonly _color;
    private readonly _cursorId;
    private readonly _id;
    private readonly _markerElement;
    private readonly _cursorElement;
    private readonly _tooltipElement;
    private _visible;
    private _position;
    private _tooltipTimeout;
    /**
     * Constructs a new AceCursorMarker
     * @param session The Ace Editor Session to bind to.
     * @param cursorId the unique id of this cursor.
     * @param label The label to display over the cursor.
     * @param color The css color of the cursor
     * @param position The row / column coordinate of the cursor marker.
     */
    constructor(session: Ace.EditSession, cursorId: string, label: string, color: string, position: number | Ace.Point);
    /**
     * Called by Ace to update the rendering of the marker.
     *
     * @param _ The html to render, represented by an array of strings.
     * @param markerLayer The marker layer containing the cursor marker.
     * @param __ The ace edit session.
     * @param layerConfig
     */
    update(_: string[], markerLayer: any, __: Ace.EditSession, layerConfig: any): void;
    /**
     * Sets the location of the cursor marker.
     * @param position The position of cursor marker.
     */
    setPosition(position: number | Ace.Point): void;
    /**
     * Sets the marker to visible / invisible.
     *
     * @param visible true if the marker should be displayed, false otherwise.
     */
    setVisible(visible: boolean): void;
    /**
     * Determines if the marker should be visible.
     *
     * @returns true if the cursor should be visible, false otherwise.
     */
    isVisible(): boolean;
    /**
     * Gets the unique id of this cursor.
     * @returns the unique id of this cursor.
     */
    cursorId(): string;
    /**
     * Gets the id of the marker.
     * @returns The marker id.
     */
    markerId(): string;
    /**
     * Gets the label of the marker.
     * @returns The marker"s label.
     */
    getLabel(): string;
    private _forceSessionUpdate;
    private _convertPosition;
    private _scheduleTooltipHide;
}
