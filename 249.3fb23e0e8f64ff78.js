"use strict";(self.webpackChunkfrontend_assignment=self.webpackChunkfrontend_assignment||[]).push([[249],{8249:(A,o,a)=>{a.r(o),a.d(o,{SmallAppModule:()=>f});var s=a(6814),l=a(6627),t=a(4946);let r=(()=>{class p{constructor(){this.appDetail={},this.onMiniAppSelect=new t.vpe}ngOnInit(){}onPlay(e){this.onMiniAppSelect.emit({url:e})}static#t=this.\u0275fac=function(i){return new(i||p)};static#p=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-miniappcard"]],inputs:{appDetail:"appDetail"},outputs:{onMiniAppSelect:"onMiniAppSelect"},decls:12,vars:4,consts:[[1,"flex","flex-col","justify-between","h-full"],[1,"aspect-h-1","aspect-w-1","h-4/5","w-full","overflow-hidden","rounded-lg","bg-gray-200","xl:aspect-h-8","xl:aspect-w-7"],[1,"h-full","w-full","object-cover","object-center","group-hover:opacity-75",3,"src","alt"],[1,"flex","justify-between","h-1/6"],[1,"mt-4","text-sm","text-gray-700"],[1,"mt-1","text-lg","font-medium","text-gray-900"],[1,"flex","justify-center","items-center"],[1,"bg-transparent","hover:bg-blue-500","text-blue-700","font-semibold","hover:text-white","py-2","px-4","border","border-blue-500","hover:border-transparent","rounded",3,"click"]],template:function(i,n){1&i&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3)(4,"div")(5,"h3",4),t._uU(6),t.qZA(),t.TgZ(7,"p",5),t._uU(8),t.qZA()(),t.TgZ(9,"div",6)(10,"button",7),t.NdJ("click",function(){return n.onPlay(n.appDetail.miniAppUrlName)}),t._uU(11," Play "),t.qZA()()()()),2&i&&(t.xp6(2),t.Q6J("src",n.appDetail.miniApImage,t.LSH)("alt",n.appDetail.miniAppName),t.xp6(4),t.Oqu(n.appDetail.miniAppName),t.xp6(2),t.hij("Developed By - ",n.appDetail.miniAppDeveloper," "))}})}return p})();function m(p,g){if(1&p){const e=t.EpF();t.TgZ(0,"app-miniappcard",5),t.NdJ("onMiniAppSelect",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.playApp(n))}),t.qZA()}2&p&&t.Q6J("appDetail",g.$implicit)}const d=[{path:"",component:(()=>{class p{static#t=this.\u0275fac=function(i){return new(i||p)};static#p=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-small-app"]],decls:1,vars:0,template:function(i,n){1&i&&t._UZ(0,"router-outlet")},dependencies:[l.lC]})}return p})(),children:[{path:"miniAppList",component:(()=>{class p{constructor(e){this.router=e,this.miniAppList=[{miniApImage:"https://img.freepik.com/free-vector/giant-check-list_23-2148118326.jpg?w=740&t=st=1696098285~exp=1696098885~hmac=4c754fe91ab6b82c14daf1ad33aaac97b144ca6c9af7ec7d9691d75f70615899",miniAppName:"To - Do - List",miniAppCategory:"Organize",miniAppDeveloper:"Abhay Kumar",miniAppUrlName:"todo"}]}ngOnInit(){}playApp(e){let i=e.url;i.length&&(i="miniApp/miniApp/"+i,this.router.navigate([i]))}static#t=this.\u0275fac=function(i){return new(i||p)(t.Y36(l.F0))};static#p=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-miniapplist"]],decls:6,vars:1,consts:[[1,"bg-white"],[1,"text-center","font-bold","text-4xl","mt-3"],[1,"mx-auto","max-w-2xl","px-4","py-16","sm:px-6","sm:py-24","lg:max-w-7xl","lg:px-8"],[1,"grid","grid-cols-1","gap-x-6","gap-y-10","sm:grid-cols-2","lg:grid-cols-3","xl:grid-cols-4","xl:gap-x-8"],["href","#","class","group",3,"appDetail","onMiniAppSelect",4,"ngFor","ngForOf"],["href","#",1,"group",3,"appDetail","onMiniAppSelect"]],template:function(i,n){1&i&&(t.TgZ(0,"div",0)(1,"h2",1),t._uU(2,"Mini App List"),t.qZA(),t.TgZ(3,"div",2)(4,"div",3),t.YNc(5,m,1,1,"app-miniappcard",4),t.qZA()()()),2&i&&(t.xp6(5),t.Q6J("ngForOf",n.miniAppList))},dependencies:[s.sg,r]})}return p})(),data:{title:"Mini-App-List"}},{path:"miniApp",loadChildren:()=>a.e(150).then(a.bind(a,2150)).then(p=>p.MiniappModule),data:{title:"Mini App"}},{path:"",redirectTo:"miniAppList",pathMatch:"full"}]}];let u=(()=>{class p{static#t=this.\u0275fac=function(i){return new(i||p)};static#p=this.\u0275mod=t.oAB({type:p});static#i=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(d),l.Bz]})}return p})();var h=a(95);let f=(()=>{class p{static#t=this.\u0275fac=function(i){return new(i||p)};static#p=this.\u0275mod=t.oAB({type:p});static#i=this.\u0275inj=t.cJS({imports:[s.ez,u,h.UX]})}return p})()}}]);