(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"1e63":function(t,e,n){"use strict";var o=n("6db1"),r=n.n(o);r.a},"1f2f":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g-myAccount-layout"},[n("div",{staticClass:"myAccount-top"},[n("ad"),n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),n("el-breadcrumb-item",[t._v("我的账户")])],1)],1),n("div",{staticClass:"myAccount-body"},[n("div",{staticClass:"left"},[n("h4",[t._v("我的账户")]),t._l(t.infoList,(function(e,o){return n("p",{key:o,class:t.activeIndex===o?"active":"",on:{click:function(n){return t.changeInfo(o,e)}}},[t._v(t._s(e))])}))],2),n("div",{staticClass:"right"},[n("h4",{staticClass:"rigth-title"},[t._v(t._s(t.activeTitle))]),0===t.activeIndex?n("account-info"):t._e(),1===t.activeIndex?n("prepaid-money"):t._e(),2===t.activeIndex?n("invoice-info"):t._e(),3===t.activeIndex?n("psw-modify"):t._e()],1)])])},r=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g-ad-layout"})},a=[],s={name:"",props:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{},filters:{},components:{}},l=s,c=(n("6aec"),n("2877")),u=Object(c["a"])(l,i,a,!1,null,"45dddfb4",null),m=u.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g-accountInfo-layout"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"right","label-width":"100px"}},[n("el-form-item",{attrs:{label:"手机号",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"联系人",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}})],1),n("el-form-item",{staticClass:"submit-btn"},[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.submitForm}},[t._v("修改")])],1)],1)],1)},d=[],p={name:"accountInfo",props:{},data:function(){return{form:{},rules:{name:[{required:!0,message:"请输入原密码",trigger:"blur"}],region:[{required:!0,message:"请输入新密码",trigger:"blur"}],type:[{required:!0,message:"请再次输入新密码",trigger:"blur"}]}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{submitForm:function(){this.$refs.form.validate((function(t){}))}},filters:{},components:{}},b=p,g=Object(c["a"])(b,f,d,!1,null,"4017bc26",null),v=g.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g--layout"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"发票类型"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"单位名称",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}})],1),n("el-form-item",{attrs:{label:"纳税人识别号",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}})],1),n("el-form-item",{staticClass:"submit-btn"},[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.submitForm}},[t._v("添加发票+")])],1)],1)],1)},y=[],w={name:"invoiceInfo",props:{},data:function(){return{form:{},rules:{name:[{required:!0,message:"请输入原密码",trigger:"blur"}],region:[{required:!0,message:"请输入新密码",trigger:"blur"}],type:[{required:!0,message:"请再次输入新密码",trigger:"blur"}]}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{submitForm:function(){this.$refs.form.validate((function(t){}))}},filters:{},components:{}},_=w,x=Object(c["a"])(_,h,y,!1,null,"7bfee58e",null),C=x.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g-prepaidMoney-layout"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"right","label-width":"100px"}},[n("el-form-item",{attrs:{label:"手机号",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"联系人",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}})],1),n("el-form-item",{staticClass:"submit-btn"},[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.submitForm}},[t._v("修改")])],1)],1)],1)},k=[],O={name:"prepaidMoney",props:{},data:function(){return{form:{},rules:{name:[{required:!0,message:"请输入原密码",trigger:"blur"}],region:[{required:!0,message:"请输入新密码",trigger:"blur"}],type:[{required:!0,message:"请再次输入新密码",trigger:"blur"}]}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{submitForm:function(){this.$refs.form.validate((function(t){}))}},filters:{},components:{}},j=O,F=Object(c["a"])(j,$,k,!1,null,"12bfa7a3",null),q=F.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g-psw-layout"},[t._m(0),n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"right","label-width":"100px"}},[n("el-form-item",{attrs:{label:"原密码",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"新密码",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}})],1),n("el-form-item",{attrs:{label:"确认密码",prop:"name"}},[n("el-input",{attrs:{size:"mini"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1),n("el-form-item",{staticClass:"submit-btn"},[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.submitForm}},[t._v("提交")])],1)],1)],1)},I=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tips"},[n("span",[t._v("温馨提示：长度6-16位字符，支持数字、大小写字母和英文标点符号。")])])}],z={name:"pswModify",props:{},data:function(){return{form:{},rules:{name:[{required:!0,message:"请输入原密码",trigger:"blur"}],region:[{required:!0,message:"请输入新密码",trigger:"blur"}],type:[{required:!0,message:"请再次输入新密码",trigger:"blur"}]}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{submitForm:function(){this.$refs.form.validate((function(t){}))}},filters:{},components:{}},T=z,P=(n("1e63"),Object(c["a"])(T,E,I,!1,null,"826de7dc",null)),D=P.exports,M={name:"",props:{},data:function(){return{infoList:["账号信息","预存款项","发票信息","密码修改"],activeIndex:0,activeTitle:"账号信息"}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{changeInfo:function(t,e){this.activeIndex=t,this.activeTitle=e}},filters:{},components:{ad:m,accountInfo:v,invoiceInfo:C,prepaidMoney:q,pswModify:D}},R=M,S=(n("81c9"),n("d06a"),Object(c["a"])(R,o,r,!1,null,"3dabe2af",null));e["default"]=S.exports},"46ea":function(t,e,n){"use strict";var o=n("7f01"),r=n.n(o);r.a},"5adf":function(t,e,n){},"660d":function(t,e,n){},"6aec":function(t,e,n){"use strict";var o=n("5adf"),r=n.n(o);r.a},"6db1":function(t,e,n){},"7abe":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"g-home-layout"},[o("div",{staticClass:"banner"},[o("el-carousel",{attrs:{height:"560px"}},t._l(4,(function(t){return o("el-carousel-item",{key:t},[o("img",{attrs:{src:n("fe7c"),alt:""}})])})),1),o("div",{staticClass:"btn-area"},[o("el-button",{attrs:{type:"danger",plain:""}},[t._v("文档打印/装订")]),o("el-button",{attrs:{type:"danger",plain:""}},[t._v("图纸打印/装订")]),o("el-button",{attrs:{type:"danger",plain:""}},[t._v("快捷下单")])],1)],1),t._m(0),o("float-div")],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom"},[t._v("\n    图文中国，与成功者同行。\n    "),n("div",{staticClass:"copyRight"},[t._v("Copyright © 2016 - 2020 烟台市普罗凡森广告有限公司 版权所有 备案号：鲁ICP备19043658号")])])}],i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"g--layout"},[n("div",{staticClass:"floatdiv",attrs:{id:"floatt"}},[n("div",{staticClass:"ftel"},[n("div",{staticClass:"ptel"},[n("i",{staticClass:"iconfont"},[t._v("")])]),n("p",[t._v("服务热线")]),n("div",{staticClass:"fdtel"},[n("span",[t._v("400-8076-999")])])]),n("div",{staticClass:"fqq"},[n("div",{staticClass:"pqq"},[n("i",{staticClass:"iconfont"},[t._v("")])]),n("a",{staticClass:"addstyleA",attrs:{href:"javaScript:void(0);"}},[t._v("接单QQ")]),n("div",{staticClass:"fdqq"},[n("span",[t._v("点击选择接单员")])])]),n("div",{staticClass:"fwChat"},[n("div",{staticClass:"pWchat"},[n("i",{staticClass:"iconfont"},[n("img",{attrs:{src:"",width:"34",height:"34"}})])]),n("p",[t._v("二维码")]),n("div",{staticClass:"fdWChat"},[n("img",{attrs:{src:""}})])])])])}],s={name:"",props:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{},filters:{},components:{}},l=s,c=(n("fb31"),n("2877")),u=Object(c["a"])(l,i,a,!1,null,"2abcf024",null),m=u.exports,f={name:"",props:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{},filters:{},components:{floatDiv:m}},d=f,p=(n("8a4e"),Object(c["a"])(d,o,r,!1,null,"6b0af25e",null));e["default"]=p.exports},"7f01":function(t,e,n){},"81c9":function(t,e,n){"use strict";var o=n("660d"),r=n.n(o);r.a},"8a4e":function(t,e,n){"use strict";var o=n("b5d9"),r=n.n(o);r.a},a760:function(t,e,n){},b5d9:function(t,e,n){},c0ea:function(t,e,n){},d06a:function(t,e,n){"use strict";var o=n("c0ea"),r=n.n(o);r.a},dd7b:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[n("el-radio-group",{on:{change:t.tabStatus},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("el-radio-button",{attrs:{label:"login"}},[t._v("登录")]),n("el-radio-button",{attrs:{label:"register"}},[t._v("注册")])],1),n("el-form-item",{attrs:{prop:"mobile"}},[n("span",{staticClass:"iconfont icon-user"}),n("el-input",{ref:"mobile",attrs:{placeholder:"手机号",name:"mobile",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.mobile,callback:function(e){t.$set(t.loginForm,"mobile",e)},expression:"loginForm.mobile"}})],1),"register"===t.tab?n("el-form-item",{attrs:{prop:"name"}},[n("span",{staticClass:"iconfont icon-nickname"}),n("el-input",{ref:"name",attrs:{placeholder:"昵称",name:"name",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.name,callback:function(e){t.$set(t.loginForm,"name",e)},expression:"loginForm.name"}})],1):t._e(),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"iconfont icon-denglumima"}),n("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"密码",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),n("span",{class:"password"===t.passwordType?"show-pwd iconfont icon-eye":"show-pwd iconfont icon-eye1",on:{click:t.showPwd}})],1),"login"===t.tab?n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"info"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")]):n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"info"},nativeOn:{click:function(e){return e.preventDefault(),t.handleRegister(e)}}},[t._v("注册")])],1)],1)},r=[],i=(n("1c01"),n("58b2"),n("8e6e"),n("f3e2"),n("d25f"),n("ac6a"),n("456d"),n("7f7f"),n("bd86")),a=n("083a"),s=n("2f62");function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u={name:"Login",data:function(){var t=function(t,e,n){var o=/^1[34578]\d{9}$/;o.test(e)?n():n(new Error("请输入正确的手机号码"))},e=function(t,e,n){e.length<6?n(new Error("密码至少6位")):n()};return{tab:"login",loginForm:{mobile:"",password:"",name:""},loginRules:{mobile:[{validator:t,trigger:"blur"}],password:[{validator:e,trigger:"blur"}],name:[{required:!0,trigger:"blur",message:"请输入昵称"}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},computed:c({},Object(s["c"])(["userInfo"])),created:function(){},mounted:function(){},destroyed:function(){},methods:c({},Object(s["b"])(["setUserInfo"]),{tabStatus:function(){},loginRequest:function(){var t=this,e=this.loginForm,n=e.mobile,o=e.password;console.log(this.loginForm),this.$store.dispatch("init",{mobile:n,password:o}).then((function(){t.$router.push("/")})).catch((function(e){console.log(e),t.$message.error(e.errorMsg)}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){e&&t.loginRequest()}))},handleRegister:function(){var t=this;this.$refs.loginForm.validate((function(e){if(e){var n=t.loginForm,o=n.mobile,r=n.name,i=n.password;a["a"].register({mobile:o,name:r,password:i}).then((function(e){200===e.code&&t.$alert("注册成功！去登陆吧","提示",{confirmButtonText:"确定",callback:function(e){t.tab="login"}})})).catch((function(e){t.$message.error(e.errorMsg)}))}}))},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))}})},m=u,f=(n("46ea"),n("f8ff"),n("2877")),d=Object(f["a"])(m,o,r,!1,null,"f94f9332",null);e["default"]=d.exports},e14e:function(t,e,n){},f8ff:function(t,e,n){"use strict";var o=n("a760"),r=n.n(o);r.a},fb31:function(t,e,n){"use strict";var o=n("e14e"),r=n.n(o);r.a},fe7c:function(t,e,n){t.exports=n.p+"img/6367607565776945244426817.e1886242.jpg"}}]);
//# sourceMappingURL=about.7bfbdd94.js.map