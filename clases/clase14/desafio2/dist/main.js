(()=>{"use strict";var e={731:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.getFullName=()=>`${this.first_name} ${this.last_name}`,this.first_name=e,this.last_name=t}}},752:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(s(860)),i=s(974),n=new(r(s(731)).default)("Lautaro","Conte"),a=(0,o.default)();a.get("/",((e,t)=>{t.send({time:(0,i.getTime)(),name:n.getFullName()})})),a.listen(8080,(()=>console.log("Listening on 8080")))},974:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getTime=void 0,t.getTime=()=>({fyh:(new Date).toLocaleString(),timestamp:Date.now()})},860:e=>{e.exports=require("express")}},t={};!function s(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,s),i.exports}(752)})();