"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AceCursorMarker=void 0;var AceCursorMarker=function(){function t(t,e,i,o,s){this._session=t,this._label=i,this._color=o,this._position=s?this._convertPosition(s):null,this._cursorId=e,this._id=null,this._visible=!1,this._tooltipTimeout=null,this._markerElement=document.createElement("div"),this._cursorElement=document.createElement("div"),this._cursorElement.className="ace-multi-cursor",this._cursorElement.style.background=this._color,this._markerElement.append(this._cursorElement),this._tooltipElement=document.createElement("div"),this._tooltipElement.className="ace-multi-cursor-tooltip",this._tooltipElement.style.background=this._color,this._tooltipElement.style.opacity="0",this._tooltipElement.innerHTML=i,this._markerElement.append(this._tooltipElement)}return t.prototype.update=function(t,e,i,o){if(null!==this._position){var s=this._session.documentToScreenPosition(this._position.row,this._position.column),r=e.$getTop(s.row,o),n=e.$padding+s.column*o.characterWidth,l=o.lineHeight,u=r+2,p=l-3,c=n;this._cursorElement.style.height=p+"px",this._cursorElement.style.width="2px",this._cursorElement.style.top=u+"px",this._cursorElement.style.left=c+"px";var h=u-l;h<5&&(h=u+l-1);var _=c;this._tooltipElement.style.top=h-2+"px",this._tooltipElement.style.left=_-2+"px",this._markerElement.remove(),e.elt("remote-cursor",""),(e.element.childNodes[e.i-1]||e.element.lastChild).appendChild(this._markerElement)}},t.prototype.setPosition=function(t){this._position=this._convertPosition(t),this._forceSessionUpdate(),this._tooltipElement.style.opacity="1",this._scheduleTooltipHide()},t.prototype.setVisible=function(t){var e=this._visible;this._visible=t,e!==this._visible&&(this._markerElement.style.visibility=t?"visible":"hidden",this._forceSessionUpdate())},t.prototype.isVisible=function(){return this._visible},t.prototype.cursorId=function(){return this._cursorId},t.prototype.markerId=function(){return this._id},t.prototype.getLabel=function(){return this._label},t.prototype._forceSessionUpdate=function(){this._session._signal("changeFrontMarker")},t.prototype._convertPosition=function(t){if(null===t)return null;if("number"==typeof t)return this._session.getDocument().indexToPosition(t,0);if("number"==typeof t.row&&"number"==typeof t.column)return t;throw new Error("Invalid position: "+t)},t.prototype._scheduleTooltipHide=function(){var t=this;null!==this._tooltipTimeout&&clearTimeout(this._tooltipTimeout),this._tooltipTimeout=setTimeout((function(){t._tooltipElement.style.opacity="0",t._tooltipTimeout=null}),2e3)},t}();exports.AceCursorMarker=AceCursorMarker;