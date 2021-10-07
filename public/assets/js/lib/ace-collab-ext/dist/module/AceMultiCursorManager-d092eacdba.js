import{AceCursorMarker}from"./AceCursorMarker";export class AceMultiCursorManager{constructor(r){this._cursors={},this._session=r}addCursor(r,s,o,e){if(void 0!==this._cursors[r])throw new Error(`Cursor with id already defined: ${r}`);const t=new AceCursorMarker(this._session,r,s,o,e);this._cursors[r]=t,this._session.addDynamicMarker(t,!0)}setCursor(r,s){this._getCursor(r).setPosition(s)}clearCursor(r){this._getCursor(r).setPosition(null)}removeCursor(r){const s=this._cursors[r];if(void 0===s)throw new Error(`Cursor not found: ${r}`);this._session.removeMarker(s.id),delete this._cursors[r]}removeAll(){Object.getOwnPropertyNames(this._cursors).forEach((r=>{this.removeCursor(this._cursors[r].cursorId())}))}_getCursor(r){const s=this._cursors[r];if(void 0===s)throw new Error(`Cursor not found: ${r}`);return s}}