!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(1),u=a(l),c=function(){function e(t){i(this,e);var n=document.querySelector(t.el);n.innerHTML=t.template,this.randers()}return s(e,[{key:"component",value:function(e,t){var n=function(e){function n(){return i(this,n),r(this,Object.getPrototypeOf(n).apply(this,arguments))}return o(n,e),s(n,[{key:"getOptions",value:function(){return t}}]),n}(u.default);document.registerElement(e,n)}},{key:"randers",value:function(){}}]),e}();window.Bird=c,t.default=c},function(module,exports){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_window=window,console=_window.console,Base=function(_HTMLElement){function Base(){return _classCallCheck(this,Base),_possibleConstructorReturn(this,Object.getPrototypeOf(Base).call(this))}return _inherits(Base,_HTMLElement),_createClass(Base,[{key:"createdCallback",value:function(){this._init(),this._rander()}},{key:"attachedCallback",value:function(){var e=this.attached;e&&e.apply(this)}},{key:"detachedCallback",value:function(){var e=this.removed;e&&e.apply(this)}},{key:"attributeChangedCallback",value:function(e,t,n){var a=this.attributeChanged;this._reRander(e),a&&a.apply(this,e,t,n)}},{key:"_init",value:function(){var e=this.getOptions(),t=e.template,n=e.data,a=e.created;this._tempShadow=document.createElement("div").createShadowRoot(),this._shadow=this.createShadowRoot(),t?this.template=t:(this.template=null,console.warn("No template!")),n?this.data=n:(this.data=null,console.warn("No data!")),this._bind(),a&&a.apply(this)}},{key:"_applyDataToAttr",value:function(e){for(var t in e)this.setAttribute(t,JSON.stringify(e[t]))}},{key:"_bind",value:function(){var e=this.data;this._applyDataToAttr(e)}},{key:"setData",value:function(e){this.data=Object.assign(this.data,e),this._applyDataToAttr(e)}},{key:"_parse",value:function _parse(){var template=this.template,data=this.data,html=template.replace(/{\w*}/g,function(e){var t=e.match(/\w+/)[0];return"function"==typeof data[t]?"function["+t+"]":data[t]?"${data."+t+"}":""});html="`"+html+"`";try{html=eval(html)}catch(e){window.console.warn(e)}return html}},{key:"_rander",value:function(){this._shadow.innerHTML=this._parse(),this._bindEvents()}},{key:"_reRander",value:function(){this._tempShadow.innerHTML=this._parse(),this._diff(this._tempShadow,this._shadow)}},{key:"_diff",value:function(e,t){var n=this;return e.innerHTML===t.innerHTML?console.log("diff Same!"):void[].forEach.call(e.childNodes,function(e,a){e.innerHTML!==t.childNodes[a].innerHTML&&(e.childNodes.length>1?n._diff(e,t.childNodes[a]):t.childNodes[a].innerHTML=e.innerHTML)})}},{key:"_bindEvents",value:function(){var e=this._shadow;this._buildChildEvents(e)}},{key:"_buildChildEvents",value:function(e){var t=this;[].forEach.call(e.childNodes,function(e){e.attributes&&e.attributes.length>0&&[].forEach.call(e.attributes,function(n){var a,r,o=n.value.match(/function\[(\w+)\]/);o&&o[1]&&(r=t.data[o[1]],a=n.name.replace("on-","").toLowerCase(),r&&e.addEventListener(a,r.bind(t)))}),t._buildChildEvents(e)})}}]),Base}(HTMLElement);exports.default=Base}]);