(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{553:function(t,e,n){},661:function(t,e,n){"use strict";n(553)},664:function(t,e,n){"use strict";n.r(e);var o=n(66),u=n(0),a={"/":{message:"New content is available.",buttonText:"Refresh"},"/zh/":{message:"发现新内容可用",buttonText:"刷新"},"/ru/":{message:"Доступен новый контент.",buttonText:"Обновить"},"/uk/":{message:"Доступний новий контент.",buttonText:"Оновити"},"/ja/":{message:"新しいコンテンツがあります。",buttonText:"更新する"},"/es/":{message:"Hay nuevo contenido disponible.",buttonText:"Actualizar"}},s={name:"SWUpdatePopup",data:function(){return{rawPopupConfig:{message:"发现新内容可用",buttonText:"刷新"},updateEvent:null}},computed:{popupConfig:function(){return Object(u.h)(this,this.rawPopupConfig)},enabled:function(){return Boolean(this.popupConfig&&this.updateEvent)},message:function(){var t=this.popupConfig;return t&&t.message||a["/"].message},buttonText:function(){var t=this.popupConfig;return t&&t.buttonText||a["/"].buttonText}},created:function(){o.a.$on("sw-updated",this.onSWUpdated),!0==={message:"发现新内容可用",buttonText:"刷新"}&&(this.rawPopupConfig=a)},methods:{onSWUpdated:function(t){this.updateEvent=t},reload:function(){this.updateEvent&&(this.updateEvent.skipWaiting().then((function(){location.reload(!0)})),this.updateEvent=null)}}},i=(n(661),n(6)),p=Object(i.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"sw-update-popup"}},[t._t("default",(function(){return[t.enabled?n("div",{staticClass:"sw-update-popup"},[t._v("\n      "+t._s(t.message)+"\n\n      "),n("br"),t._v(" "),n("button",{on:{click:t.reload}},[t._v("\n        "+t._s(t.buttonText)+"\n      ")])]):t._e()]}),{reload:t.reload,enabled:t.enabled,message:t.message,buttonText:t.buttonText})],2)}),[],!1,null,"fec8b358",null);e.default=p.exports}}]);