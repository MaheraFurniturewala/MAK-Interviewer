export class AceRadarViewIndicator{constructor(t,e,s,i,r){this._label=t,this._color=e,this._viewRows=s,this._cursorRow=i,this._editor=r,this._docLineCount=r.getSession().getLength(),this._editorListener=()=>{const t=this._editor.getSession().getLength();t!==this._docLineCount&&(this._docLineCount=t,this.update())},this._editor.on("change",this._editorListener),this._scrollElement=document.createElement("div"),this._scrollElement.className="ace-radar-view-scroll-indicator",this._scrollElement.style.borderColor=this._color,this._scrollElement.style.background=this._color,this._scrollElement.title=this._label,this._scrollElement.addEventListener("click",(()=>{const t=(this._viewRows.end-this._viewRows.start)/2+this._viewRows.start;this._editor.scrollToLine(t,!0,!1,(()=>{}))}),!1),this._cursorElement=document.createElement("div"),this._cursorElement.className="ace-radar-view-cursor-indicator",this._cursorElement.style.background=this._color,this._cursorElement.title=this._label,this._cursorElement.addEventListener("click",(()=>{this._editor.scrollToLine(this._cursorRow,!0,!1,(()=>{}))}),!1),this._wrapper=document.createElement("div"),this._wrapper.className="ace-radar-view-wrapper",this._wrapper.style.display="none",this._wrapper.appendChild(this._scrollElement),this._wrapper.appendChild(this._cursorElement)}element(){return this._wrapper}setCursorRow(t){this._cursorRow=t,this.update()}setViewRows(t){this._viewRows=t,this.update()}update(){if(_isSet(this._viewRows)||_isSet(this._cursorRow)){this._wrapper.style.display=null;const t=this._docLineCount-1;if(_isSet(this._viewRows)){const e=Math.min(t,this._viewRows.start)/t*100,s=100-Math.min(t,this._viewRows.end)/t*100;this._scrollElement.style.top=e+"%",this._scrollElement.style.bottom=s+"%",this._scrollElement.style.display=null}else this._scrollElement.style.display="none";if(_isSet(this._cursorRow)){const e=Math.min(this._cursorRow,t)/t*((this._wrapper.offsetHeight-this._cursorElement.offsetHeight)/this._wrapper.offsetHeight)*100;this._cursorElement.style.top=e+"%",this._cursorElement.style.display=null}else this._cursorElement.style.display="none"}else this._wrapper.style.display="none"}dispose(){this._wrapper.parentNode.removeChild(this._wrapper),this._editor.off("change",this._editorListener)}}function _isSet(t){return null!=t}