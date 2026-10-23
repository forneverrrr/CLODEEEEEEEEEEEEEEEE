/* Fælles kerne: lager, sprog, tid, gentagelse. Ingen server: alt gemmes i browserens localStorage. */
(function(){
"use strict";
var KEY="nordstudy-v1";
var IDLE=120;                         // sekunder uden aktivitet, så sættes uret på pause
var S={v:1,lang:"da",theme:null,books:{},time:{},log:[],last:null,timer:{on:false,ts:0}};
var mem=null;                         // adapter: kan erstattes af en server-synk senere
var Store={
  load:function(){try{return JSON.parse(localStorage.getItem(KEY));}catch(e){return null;}},
  save:function(o){try{localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}
};
var raw=Store.load();
if(raw&&raw.v===1){S=Object.assign(S,raw);}
if(!S.books)S.books={};if(!S.time)S.time={};if(!S.log)S.log=[];if(!S.timer)S.timer={on:false,ts:0};
function save(){Store.save(S);}

/* ---------- sprog ---------- */
function t(k){
  var d=(window.STR&&window.STR[k])||null,s=d?(d[S.lang]||d.da):k;
  for(var i=1;i<arguments.length;i++)s=s.replace("{"+(i-1)+"}",arguments[i]);
  return s;
}
function setLang(l){S.lang=l;save();location.reload();}
document.documentElement.lang=S.lang;

/* ---------- tema ---------- */
if(S.theme)document.documentElement.setAttribute("data-theme",S.theme);
function toggleTheme(){
  var r=document.documentElement,cur=r.getAttribute("data-theme");
  var dark=cur?cur==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
  S.theme=dark?"light":"dark";r.setAttribute("data-theme",S.theme);save();
}

/* ---------- bøger ---------- */
function book(slug){
  var b=S.books[slug];
  if(!b){b=S.books[slug]={stat:{},pos:0,best:null,sets:{},sel:[],bset:{order:"seq",n:0,mode:"practice"},len:50};}
  if(!b.stat)b.stat={};if(!b.sets)b.sets={};if(!b.sel)b.sel=[];if(!b.bset)b.bset={order:"seq",n:0,mode:"practice"};
  return b;
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

/* ---------- gentagelse (svage spørgsmål vender tilbage) ---------- */
/* fejl: straks. Rigtig men usikker: om 10 min. Derefter 1 dag og 3 dage. Efter 3 rene rigtige i træk forlader spørgsmålet køen. */
var GAP=[0,86400,3*86400];
function snapOf(slug,id){var s=book(slug).stat[id];return s?JSON.parse(JSON.stringify(s)):null;}
function rec(slug,id,ok,uns,snap){
  var st=book(slug).stat,now=Date.now();
  var s=snap===undefined?st[id]:snap;
  s=s?JSON.parse(JSON.stringify(s)):{c:0,w:0,l:1,z:0,k:0,u:0,d:0};
  if(ok)s.c++;else s.w++;
  s.l=ok?1:0;s.u=uns?1:0;s.t=now;
  if(!ok){s.z=0;s.k=1;s.d=now;}
  else if(uns){s.z=0;s.k=1;s.d=now+10*60*1000;}
  else if(s.k){s.z=(s.z||0)+1;if(s.z>=3){s.k=0;s.d=0;}else s.d=now+GAP[s.z]*1000;}
  st[id]=s;
}
function dueIds(slug,valid){
  var st=book(slug).stat,now=Date.now(),out=[];
  Object.keys(st).forEach(function(id){var s=st[id];if(s.o||(valid&&!valid[id]))return;if(s.k&&s.d<=now)out.push(id);});
  out.sort(function(a,b){return st[a].d-st[b].d;});
  return out;
}
function weakCount(slug,valid){var st=book(slug).stat,n=0;Object.keys(st).forEach(function(id){var s=st[id];if(s.o||(valid&&!valid[id]))return;if(s.k)n++;});return n;}
function logWrong(slug,it,given){
  S.log.push({ts:Date.now(),b:slug,id:it.id,q:it.q,given:given,right:it.right||"",p:it.p||0});
  if(S.log.length>1500)S.log=S.log.slice(-1500);
}

/* ---------- tid ---------- */
function dayKey(d){d=d||new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function addTime(slug,sec){var k=dayKey();if(!S.time[k])S.time[k]={};S.time[k][slug]=(S.time[k][slug]||0)+sec;}
function totalOn(k){var o=S.time[k]||{},n=0;Object.keys(o).forEach(function(s){n+=o[s];});return n;}
function fmtDur(sec){sec=Math.round(sec);var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
  function p(x){return (x<10?"0":"")+x;}
  return h?h+":"+p(m)+":"+p(s):p(m)+":"+p(s);}
function fmtShort(sec){var m=Math.round(sec/60);if(m<60)return m+" "+t("min");return Math.floor(m/60)+" "+t("hour")+" "+(m%60)+" "+t("min");}

var clk={on:false,last:0,act:Date.now(),slug:"_",idle:false,iv:null};
function act(){clk.act=Date.now();}
["pointerdown","keydown","touchstart","wheel","mousemove","scroll"].forEach(function(e){window.addEventListener(e,act,{passive:true,capture:true});});
function paintClock(){
  var el=document.getElementById("clk");if(!el)return;
  el.className="clock"+(clk.on?" on":"");
  var tm=el.querySelector(".tm");if(tm)tm.textContent=fmtDur(totalOn(dayKey()));
  var nt=el.querySelector(".note");if(nt)nt.textContent=clk.idle&&!clk.on?t("idlePaused"):"";
  var pp=el.querySelector(".pp");
  if(pp){pp.setAttribute("aria-label",clk.on?t("pause"):t("start"));pp.innerHTML=clk.on?'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>':'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.500v15l13-7.500z"/></svg>';}
}
function tick(){
  if(!clk.on)return;
  var n=Date.now(),d=Math.min(5,(n-clk.last)/1000);clk.last=n;
  if(n-clk.act>IDLE*1000){stopClock(true);return;}
  if(!document.hidden){addTime(clk.slug,d);}
  S.timer.ts=n;save();paintClock();
}
function startClock(){
  if(clk.on)return;
  clk.on=true;clk.idle=false;clk.last=Date.now();clk.act=Date.now();
  S.timer={on:true,ts:clk.last};save();
  clk.iv=setInterval(tick,1000);paintClock();
}
function stopClock(idle){
  clk.on=false;clk.idle=!!idle;clearInterval(clk.iv);
  S.timer={on:false,ts:Date.now()};save();paintClock();
}
function clockHtml(){
  return '<div id="clk" class="clock"><button class="pp" type="button"></button><span class="tm mono"></span><span class="note"></span></div>';
}
function bindClock(slug){
  clk.slug=slug||"_";
  var el=document.getElementById("clk");if(!el)return;
  el.querySelector(".pp").onclick=function(){clk.on?stopClock(false):startClock();};
  paintClock();
}
if(S.timer.on&&Date.now()-S.timer.ts<20000){startClock();}
document.addEventListener("visibilitychange",function(){if(!document.hidden){clk.last=Date.now();}});

/* ---------- eksport / import ---------- */
function exportData(){
  var blob=new Blob([JSON.stringify(S)],{type:"application/json"});
  var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="studie-fremgang-"+dayKey()+".json";
  document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);
}
function importData(file,done){
  var r=new FileReader();
  r.onload=function(){
    try{var o=JSON.parse(r.result);if(!o||o.v!==1||!o.books)throw 0;S=Object.assign({v:1,lang:S.lang,theme:S.theme,books:{},time:{},log:[],last:null,timer:{on:false,ts:0}},o);S.timer={on:false,ts:0};save();done(true);}
    catch(e){done(false);}
  };
  r.readAsText(file);
}

/* ---------- fælles topbjælke ---------- */
var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500z"/></svg>';
function chromeHtml(brandHref,brandSvg,brandText){
  return '<header class="topbar"><a class="brand" href="'+brandHref+'">'+brandSvg+'<span>'+esc(brandText)+'</span></a><div class="right">'+clockHtml()+
    '<button class="ib" id="lg" type="button" aria-label="Sprog / Язык">'+(S.lang==="da"?"RU":"DA")+'</button><button class="ib" id="th" type="button" aria-label="'+esc(t("theme"))+'">'+SUN+'</button></div></header>';
}
function bindChrome(slug){
  bindClock(slug);
  document.getElementById("lg").onclick=function(){setLang(S.lang==="da"?"ru":"da");};
  document.getElementById("th").onclick=toggleTheme;
}

window.NS={S:S,save:save,t:t,book:book,esc:esc,rec:rec,snapOf:snapOf,dueIds:dueIds,weakCount:weakCount,logWrong:logWrong,
  dayKey:dayKey,totalOn:totalOn,fmtDur:fmtDur,fmtShort:fmtShort,chromeHtml:chromeHtml,bindChrome:bindChrome,
  exportData:exportData,importData:importData,setLang:setLang,get lang(){return S.lang;},reload:function(){raw=null;}};
})();
