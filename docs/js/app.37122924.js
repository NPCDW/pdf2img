(function(t){function e(e){for(var a,i,c=e[0],l=e[1],s=e[2],p=0,d=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,c=1;c<n.length;c++){var l=n[c];0!==r[l]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},o=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticStyle:{"margin-right":"20px"}},[n("div",{staticStyle:{"margin-bottom":"40px"}},[[n("el-button",{staticStyle:{"margin-right":"8px"},attrs:{type:"primary",disabled:null==t.pdfDoc},on:{click:function(e){return t._renderPage(t.currentPage,t.scale+.25,t.rotate)}}},[t._v("放大")]),n("span",{staticStyle:{"margin-right":"8px"}},[t._v(t._s(100*t.scale+"%"))]),n("el-button",{staticStyle:{"margin-right":"8px"},attrs:{type:"primary",disabled:null==t.pdfDoc},on:{click:function(e){return t._renderPage(t.currentPage,t.scale-.25,t.rotate)}}},[t._v("缩小")])],[n("el-input-number",{attrs:{min:1,max:t.total},on:{change:function(e){return t._renderPage(t.currentPage,t.scale,t.rotate)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}}),n("span",{staticStyle:{"margin-right":"8px"}},[t._v(" / "+t._s(t.total)+" ")])],[n("el-button",{staticStyle:{"margin-right":"8px"},attrs:{type:"primary",disabled:null==t.pdfDoc},on:{click:function(e){return t._renderPage(t.currentPage,t.scale,t.rotate-90)}}},[t._v("旋转")]),n("span",{staticStyle:{"margin-right":"8px"}},[t._v(" "+t._s(t.rotate)+"° ")])]],2),n("div",[n("div",{staticStyle:{"margin-bottom":"10px"}},[t._v("请选择导出图片选项")]),n("div",{staticStyle:{"margin-bottom":"10px"}},[n("el-radio",{attrs:{label:0},model:{value:t.exportImgRadio,callback:function(e){t.exportImgRadio=e},expression:"exportImgRadio"}},[t._v("当前页")]),n("el-radio",{attrs:{label:1},model:{value:t.exportImgRadio,callback:function(e){t.exportImgRadio=e},expression:"exportImgRadio"}},[t._v("全部页")]),n("el-radio",{attrs:{label:2},model:{value:t.exportImgRadio,callback:function(e){t.exportImgRadio=e},expression:"exportImgRadio"}},[t._v("自定义范围")])],1),2===t.exportImgRadio?n("div",{staticStyle:{"margin-bottom":"10px"}},[n("el-input-number",{attrs:{min:1,max:t.total},model:{value:t.startPage,callback:function(e){t.startPage=e},expression:"startPage"}}),n("span",[t._v(" - ")]),n("el-input-number",{attrs:{min:1,max:t.total},model:{value:t.endPage,callback:function(e){t.endPage=e},expression:"endPage"}})],1):t._e(),n("div",[n("el-button",{attrs:{loading:t.exportImgButtonLoading,disabled:null==t.pdfDoc,type:"primary"},on:{click:t.exportImg}},[t._v("导出图片")])],1)])]),n("div",{staticClass:"canvas",style:{height:t.height+"px",width:t.width+"px"}},[n("canvas",{ref:"the-canvas",attrs:{height:t.height,width:t.width}}),n("input",{staticStyle:{position:"absolute",width:"100%",height:"100%",top:"0",left:"0",opacity:"0"},attrs:{type:"file",accept:"application/pdf"},on:{change:function(e){return t.handlePdfUpload(e)}}})])])},o=[],i=(n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("9511")),c=n.n(i),l=n("0507"),s=n.n(l),u=n("21a6"),p=n("c4e3"),d=n.n(p);c.a.workerSrc=s.a;var g={name:"App",data:function(){return{pdfDoc:null,currentPage:1,total:0,scale:1,rotate:0,height:842,width:595,exportImgRadio:0,exportImgButtonLoading:!1,startPage:1,endPage:1,fileName:null}},methods:{exportImg:function(){var t=this;this.exportImgButtonLoading=!0,this.$nextTick((function(){0===t.exportImgRadio?new Promise((function(e){t.canvasToImg(t.currentPage,t.scale,t.rotate,e)})).then((function(e){Object(u["saveAs"])(e,t.fileName+"."+t.currentPage+".png"),t.exportImgButtonLoading=!1})):function(){1===t.exportImgRadio&&(t.startPage=1,t.endPage=t.total);for(var e=[],n=new d.a,a=n.folder(t.fileName),r=function(n){var r=new Promise((function(e){t.canvasToImg(n,t.scale,t.rotate,e)})).then((function(t){a.file(n+".png",t)}));e.push(r)},o=t.startPage;o<=t.endPage;o++)r(o);Promise.all(e).then((function(){n.generateAsync({type:"blob"}).then((function(e){return Object(u["saveAs"])(e,t.fileName+".zip")})),t.exportImgButtonLoading=!1}))}()}))},canvasToImg:function(t,e,n,a){this.pdfDoc.getPage(t).then((function(t){var r=t.getViewport({scale:e,rotation:n}),o=document.createElement("canvas");o.height=r.height,o.width=r.width;var i={canvasContext:o.getContext("2d"),viewport:r};t.render(i).promise.then((function(){o.toBlob((function(t){a(t)}))}))}))},_renderPage:function(t,e,n){var a=this;t<1&&(t=1),t>this.total&&(t=this.total),this.currentPage=t,e<.25||(this.scale=e,this.rotate=n%360,this.pdfDoc.getPage(t).then((function(t){var r=t.getViewport({scale:e,rotation:n}),o=a.$refs["the-canvas"],i=o.getContext("2d");a.height=r.height,a.width=r.width;var c={canvasContext:i,viewport:r};t.render(c)})))},_loadFile:function(t){var e=this,n="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/cmaps/";c.a.getDocument({data:t,cMapUrl:n,cMapPacked:!0}).promise.then((function(t){e.pdfDoc=t,e.total=t.numPages,e.scale=1,e.currentPage=1,e.rotate=0,e.$nextTick((function(){e._renderPage(e.currentPage,e.scale,e.rotate)}))}))},handlePdfUpload:function(t){var e=t.target.files[0];if(e){this.fileName=e.name.substr(0,e.name.length-4);var n=this,a=new FileReader;a.readAsArrayBuffer(e),a.onload=function(){n._loadFile(this.result)}}}}},f=g,h=(n("63a1"),n("2877")),m=Object(h["a"])(f,r,o,!1,null,"8658fbce",null),v=m.exports,b=n("5c96"),x=n.n(b);n("0fae");a["default"].config.productionTip=!1,a["default"].use(x.a),new a["default"]({render:function(t){return t(v)}}).$mount("#app")},"63a1":function(t,e,n){"use strict";n("874e")},"874e":function(t,e,n){}});
//# sourceMappingURL=app.37122924.js.map