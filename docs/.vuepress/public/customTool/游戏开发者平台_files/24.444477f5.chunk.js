(window["webpackJsonp@gdev/console"]=window["webpackJsonp@gdev/console"]||[]).push([[24],{1045:function(e,t,r){"use strict";function n(e){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.Header=function(e){var t=e.theme,r=e.heightToToggleTheme,n=e.showLogo,h=void 0===n||n,m=e.logoLinkProps,v=e.left,g=e.right,O=e.globalConfig,_=e.isBrowser,E=void 0===_||_,w=e.isLogined,j=void 0!==w&&w,P=e.userName,N=void 0===P?"":P,C=e.avatarUrl,M=void 0===C?"":C,S=e.login,k=e.logout,x=e.style,R=void 0===x?{}:x,D=b((0,l.useState)(t),2),A=D[0],I=D[1],L=b((0,i.useTranslation)(),2)[1],T=(0,u.useHistory)();(0,l.useEffect)((function(){var e=function(){window.scrollY>=r-64?I(c.HEADER_THEME_ENUM.LIGHT):I(c.HEADER_THEME_ENUM.DARK)};return E&&void 0!==r&&(window.addEventListener("scroll",e),e()),function(){return window.removeEventListener("scroll",e)}}),[r,E]);return l.default.createElement(d.HeaderThemeContext.Provider,{value:A},l.default.createElement("div",{style:R,className:(0,o.default)("dark"===A?"header-dark-container":"header-light-container",y,{autoResolveMultipleImports:!0,handleMissingStyleName:"throw"})},l.default.createElement("div",{className:"container header-content"},l.default.createElement("div",{className:"header-left"},h&&l.default.createElement(p.HeaderLink,m,l.default.createElement("div",{className:"header-link-button"},l.default.createElement("div",{className:"header-icon"}),l.default.createElement("div",{className:"header-title"}))),l.default.createElement("div",{className:"header-left-nav"},v)),l.default.createElement("div",{className:"header-right"},l.default.createElement(f.LanguageAndAreaSelector,{onChange:function(e){var t=e.area,r=e.language;if(t!==(null===O||void 0===O?void 0:O.area)){var n=(0,c.findConfig)({area:t,env:(null===O||void 0===O?void 0:O.env)||c.ENV_ENUM.BOE}).host,a=location.pathname;location.replace("https://".concat(n).concat(a,"?language=").concat(r))}else r!==L.language&&i.default.changeLanguage({locale:r})},value:{area:(null===O||void 0===O?void 0:O.area)||c.AREA_ENUM.CN,language:L.language}}),g,j?l.default.createElement(a.default,{position:"br",triggerProps:{mouseEnterDelay:50},droplist:l.default.createElement(s.DropMenu,{title:N,list:[{key:"user_center",onClick:function(){location.href.includes("console")?T.push("personal_center"):location.href="/console/personal_center"}},{key:"log_out",onClick:function(){k()}}]})},l.default.createElement("div",{className:"header-avatar"},l.default.createElement("img",{src:M}))):l.default.createElement(p.HeaderLink,{title:"login",onClick:S})))))},r(280);var a=v(r(210)),o=v(r(266)),l=m(r(0)),i=m(r(60)),u=r(68),c=r(21),f=r(271),d=r(269),s=r(270),p=r(209);function h(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return h=function(){return e},e}function m(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!==typeof e)return{default:e};var t=h();if(t&&t.has(e))return t.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var l=a?Object.getOwnPropertyDescriptor(e,o):null;l&&(l.get||l.set)?Object.defineProperty(r,o,l):r[o]=e[o]}return r.default=e,t&&t.set(e,r),r}function v(e){return e&&e.__esModule?e:{default:e}}r(1164);var y={"./index.less":{"header-content":"header-content","header-light-container":"header-light-container","header-dark-container":"header-dark-container","header-left":"header-left","header-link-button":"header-link-button","header-icon":"header-icon","header-title":"header-title","header-left-nav":"header-left-nav","header-right":"header-right","header-avatar":"header-avatar"}};function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(u){a=!0,o=u}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},1164:function(e,t,r){},1190:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r(51),r(1218)},1192:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t},i=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Breadcrumb=void 0;var c=u(r(1)),f=l(r(0)),d=u(r(20)),s=u(r(1223)),p=r(29),h=u(r(140)),m=u(r(1224)),v=u(r(88)),y=function(e,t,r){return t.indexOf(e)===t.length-1?f.default.createElement("span",null,e.breadcrumbName):f.default.createElement("a",{href:"#/"+r.join("/").replace(/^\//,"")},e.breadcrumbName)};t.Breadcrumb=function(e,t){var r=f.useContext(p.ConfigContext).getPrefixCls,a=e.className,o=e.children,l=e.style,u=e.routes,c=e.maxCount,m=e.separator,b=i(e,["className","children","style","routes","maxCount","separator"]),g=r("breadcrumb"),O="itemRender"in e?e.itemRender:y,_=f.default.createElement("span",{className:g+"-item-ellipses"},"..."),E=f.default.createElement("span",{className:g+"-item-separator"},m),w=function(e,t,r){var n=f.default.cloneElement(E,{key:r+"_separator"});return t>0?0===r?[e,n,_]:r>t?[n,e]:null:0===r?[e]:[n,e]};return f.default.createElement("div",n({ref:t,style:l,className:d.default(g,a)},v.default(b,["itemRender"])),u&&u.length?function(){var e=[],t=u.length-c;return u.map((function(r,n){e.push((r.path||"").replace(/^\//,""));var a=r.children?f.default.createElement(h.default,null,r.children.map((function(t){return f.default.createElement(h.default.Item,{key:t.path||t.breadcrumbName},O(t,u,e))}))):null;return w(f.default.createElement(s.default,{prefixCls:g,key:r.path||r.breadcrumbName,droplist:a},O(r,u,e)),t,n)}))}():function(){var e=f.default.Children.toArray(o).length-c;return f.default.Children.map(o,(function(t,r){return w(f.default.cloneElement(t,{prefixCls:g}),e,r)}))}())};var b=f.forwardRef(t.Breadcrumb);b.displayName="Breadcrumb",b.propTypes={className:c.default.oneOfType([c.default.string,c.default.arrayOf(c.default.string)]),separator:c.default.oneOfType([c.default.string,c.default.element]),style:c.default.object},b.defaultProps={separator:f.default.createElement(m.default,null)},b.Item=s.default,t.default=b},1218:function(e,t,r){},1223:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t},i=this&&this.__read||function(e,t){var r="function"===typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,o=r.call(e),l=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)l.push(n.value)}catch(i){a={error:i}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(a)throw a.error}}return l},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Item=void 0;var c=u(r(1)),f=l(r(0)),d=u(r(20)),s=u(r(169)),p=u(r(127)),h=u(r(88));t.Item=function(e){var t,r,a=e.children,o=e.style,l=e.className,u=e.prefixCls,c=e.droplist,m=e.dropdownProps,v=i(f.useState(!1),2),y=v[0],b=v[1],g=f.default.createElement("div",{style:o,className:d.default(u+"-item",l,(t={},t[u+"-item-with-dropdown"]=c,t))},a,c&&f.default.createElement("span",{className:d.default(u+"-item-dropdown-icon",(r={},r[u+"-item-dropdown-icon-active"]=y,r))},f.default.createElement(p.default,null)));return c?f.default.createElement(s.default,n({droplist:c,onVisibleChange:function(e){b(e),m&&m.onVisibleChange&&m.onVisibleChange(e)}},h.default(m,["onVisibleChange"])),g):g},t.Item.propTypes={className:c.default.oneOfType([c.default.string,c.default.arrayOf(c.default.string)]),style:c.default.object,droplist:c.default.element,dropdownProps:c.default.object},t.default=t.Item},1224:function(e,t,r){"use strict";var n=r(22);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r(9)),o=n(r(5)),l=n(r(8)),i=n(r(6)),u=n(r(7)),c=n(r(10)),f=n(r(11)),d=n(r(3)),s=n(r(0));function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){(0,o.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,d.default)(e);if(t){var a=(0,d.default)(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return(0,f.default)(this,r)}}var v=function(e){(0,c.default)(r,e);var t=m(r);function r(e){return(0,i.default)(this,r),t.call(this,e)}return(0,u.default)(r,[{key:"render",value:function(){var e=!function(){try{return!(void 0!==("undefined"===typeof window?"undefined":(0,l.default)(window))&&void 0!==document)}catch(e){return!0}}()&&window.ARCO_PREFIXCLS?window.ARCO_PREFIXCLS:this.props.prefixCls,t=this.props&&this.props.className?this.props.className+" ":"",r=h(h({},this.props),{},{className:t+"arco-icon arco-icon-oblique-line".replace(/arco-/g,e+"-")});return this.props.spin&&(r.className=r.className+" "+e+"-icon-loading"),delete r.prefixCls,delete r.spin,delete r.isIcon,s.default.createElement("svg",(0,a.default)({className:"arco-icon arco-icon-oblique-line",viewBox:"0 0 1024 1024",width:"1em",height:"1em",fill:"currentColor"},r),s.default.createElement("path",{d:"M437.76 1024h-96.64L671.36 0H768L437.76 1024z"}))}}]),r}(s.default.Component);v.defaultProps={isIcon:!0,prefixCls:"arco"};var y=v;t.default=y}}]);
//# sourceMappingURL=24.444477f5.chunk.js.map