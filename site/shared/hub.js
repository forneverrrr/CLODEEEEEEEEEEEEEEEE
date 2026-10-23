/* Forside: kort for alle bøger fra shared/books.js + samlet status */
(function(){
"use strict";
var NS=window.NS,t=NS.t,esc=NS.esc,S=NS.S,BOOKS=window.BOOKS||[];
var top=document.getElementById("top"),main=document.getElementById("app");
document.title=t("siteName");
function weekSec(){var n=0,d=new Date();for(var i=0;i<7;i++){n+=NS.totalOn(NS.dayKey(d));d.setDate(d.getDate()-1);}return n;}
function answeredToday(){
  var start=new Date();start.setHours(0,0,0,0);var n=0;
  Object.keys(S.books).forEach(function(s){var st=S.books[s].stat||{};Object.keys(st).forEach(function(id){if(st[id].t>=start.getTime())n++;});});
  return n;
}
function bookTime(slug){var n=0;Object.keys(S.time).forEach(function(k){n+=S.time[k][slug]||0;});return n;}
var h='<section class="hero"><h1>'+t("siteName")+'</h1><p>'+t("siteIntro")+'</p></section>';
var VAL={};BOOKS.forEach(function(b){var m={};(b.ids||[]).forEach(function(i){m[i]=1;});VAL[b.slug]=b.ids?m:null;});
var due=0;BOOKS.forEach(function(b){due+=NS.dueIds(b.slug,VAL[b.slug]).length;});
h+='<section class="today"><div class="kpi"><b>'+NS.fmtDur(NS.totalOn(NS.dayKey()))+'</b><span>'+t("timeToday")+'</span></div><div class="kpi"><b>'+NS.fmtShort(weekSec())+'</b><span>'+t("time7")+'</span></div><div class="kpi"><b>'+answeredToday()+'</b><span>'+t("answeredToday")+'</span></div><div class="kpi"><b>'+due+'</b><span>'+t("dueAll")+'</span></div></section>';
h+='<section class="sec"><h2>'+t("books")+'</h2><div class="books">';
BOOKS.slice().sort(function(a,b){return (a.slug===S.last?-1:0)-(b.slug===S.last?-1:0)||(a.order||0)-(b.order||0);}).forEach(function(b){
  var st=(S.books[b.slug]||{}).stat||{},ok=0;Object.keys(st).forEach(function(id){var s=st[id];if(s.o||(VAL[b.slug]&&!VAL[b.slug][id]))return;if(s.l===1)ok++;});
  var d=NS.dueIds(b.slug,VAL[b.slug]).length,pc=b.count?Math.round(ok/b.count*100):0;
  h+='<a class="bk" href="book.html?b='+b.slug+'" style="--bc:'+b.accent+'"><div class="bt"><span class="bi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+b.icon+'</svg></span><h3>'+esc(b.title)+'</h3></div><p>'+esc(b.sub[NS.lang]||b.sub.da)+'</p><div class="bar"><i style="width:'+pc+'%"></i></div><div class="bm"><span>'+b.count+' '+t("questions")+' · '+pc+' %</span><span>'+NS.fmtShort(bookTime(b.slug))+'</span>'+(d?'<span class="due">'+t("dueN",d)+'</span>':'')+(b.slug===S.last?'<span>'+t("continue")+' →</span>':'')+'</div></a>';
});
h+='<div class="empty">'+t("moreBooks")+'</div></div></section>';
h+='<section class="sec"><a class="btn ghost" style="align-self:flex-start;text-decoration:none" href="stats.html">'+t("openStats")+'</a></section>';
main.innerHTML=h;
top.innerHTML=NS.chromeHtml("index.html",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v14h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4z"/><path d="M12 6v14"/></svg>',t("siteName"));
NS.bindChrome("_");
})();
