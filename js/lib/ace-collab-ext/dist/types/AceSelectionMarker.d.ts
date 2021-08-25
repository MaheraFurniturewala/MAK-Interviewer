import { Ace } from "ace-builds";
export interface ISelectionBounds {
    height?: number;
    width?: number;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}
export declare class AceSelectionMarker implements Ace.MarkerLike {
    range: Ace.Range;
    type: string;
    renderer?: Ace.MarkerRenderer;
    clazz: string;
    inFront: boolean;
    id: number;
    private _session;
    private readonly _label;
    private readonly _color;
    private _ranges;
    private readonly _selectionId;
    private readonly _id;
    private readonly _markerElement;
    constructor(session: Ace.EditSession, selectionId: string, label: string, color: string, ranges: Ace.Range[]);
    update(_: string[], markerLayer: any, session: Ace.EditSession, layerConfig: any): void;
    setSelection(ranges: Ace.Range[]): void;
    getLabel(): string;
    selectionId(): string;
    markerId(): string;
    private _renderLine;
    private _renderRange;
    private _forceSessionUpdate;
}
