import{_ as p,u as i,a as v,x as m,b as c,o as f,j as h,d as l,w as n,g as a,t,p as g,f as w}from"./index.6ec908bf.js";const r=o=>(g("data-v-fab6a737"),o=o(),w(),o),x=r(()=>a("div",{class:"card-header"},[a("img",{class:"img",src:"https://www.logosc.cn/uploads/icon/2021/08/10/icon_611247fcec772.svg"})],-1)),b={class:"footer"},S=r(()=>a("p",null,"\u6743\u9650\uFF1A\u7BA1\u7406\u5458",-1)),I={__name:"HomePage",setup(o){const _=i(),e=v({});return m().then(s=>{console.log(s),e.value=s.data.data,_.useravatar=s.data.data.useravatar,console.log(e.value)}),(s,y)=>{const d=c("el-avatar"),u=c("el-card");return f(),h("div",null,[l(u,{class:"box-card",shadow:"hover"},{header:n(()=>[x]),default:n(()=>[l(d,{class:"el-avatar",size:100,src:e.value.useravatar},null,8,["src"]),a("div",b,[a("p",null,"\u8D26\u53F7\uFF1A"+t(e.value.username),1),S,a("p",null,"\u7535\u8BDD\uFF1A"+t(e.value.mobile),1),a("p",null,"\u90AE\u7BB1\uFF1A"+t(e.value.email),1)])]),_:1})])}}},H=p(I,[["__scopeId","data-v-fab6a737"]]);export{H as default};