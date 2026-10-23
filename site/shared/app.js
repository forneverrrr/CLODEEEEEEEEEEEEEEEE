/* Bogside: quiz-motor til én bog. Data kommer fra books/<bog>/book.js (window.BOOK). */
(function(){
"use strict";
var NS=window.NS,t=NS.t,esc=NS.esc,B=window.BOOK,M=B.meta,SLUG=M.slug;
var SHEETS=B.sheets,TL=B.timeline||[],FEAT=M.features||{};
var bs=NS.book(SLUG);
var main=document.getElementById("app"),top=document.getElementById("top");
document.title=M.title;
NS.S.last=SLUG;NS.save();
function save(){NS.save();}
try{var vv=sessionStorage.getItem("view-"+SLUG);if(vv)window.__view=vv;}catch(e){}

/* ---------- hjælpere ---------- */
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var x=a[i];a[i]=a[j];a[j]=x;}return a;}
function sheetBy(n){return SHEETS.filter(function(x){return x.n===n;})[0];}
function spec(n){return (M.special||{})[n];}
function sheetName(n){var s=spec(n);return s?s.name:M.sheetWord+" "+n;}
function sheetShort(n){var s=spec(n);return s?s.short:String(n);}
var ALL=[];
SHEETS.forEach(function(sh){sh.q.forEach(function(r){
  ALL.push({type:"mc",id:r.id,s:sh.n,q:r.q,right:r.a,wrongs:r.w,p:r.p,l:r.l||"U",y:r.t||"fakta",why:r.x||""});
});});
var BYID={};ALL.forEach(function(x){BYID[x.id]=x;});
/* fremgang for spørgsmål der er slettet i en revision beholdes i lageret, men tælles ikke med (s.o = forældreløs) */
Object.keys(bs.stat).forEach(function(id){var s=bs.stat[id];if(!BYID[id]){if(!s.o){s.o=1;}}else if(s.o){delete s.o;}});
NS.save();
function sheetItems(n,withD){return ALL.filter(function(x){return x.s===n&&(withD||x.l!=="D");});}
function coreItems(){return ALL.filter(function(x){return x.l!=="D";});}
function srcOf(it){return it.src||(it.s?sheetName(it.s)+" · s. "+it.p:t("tlShort")+" · s. "+it.p);}
function gcl(n){for(var i=0;i<M.groups.length;i++){if(M.groups[i].sheets.indexOf(n)>=0)return i+1;}return 1;}
function mastered(){var n=0;ALL.forEach(function(x){var s=bs.stat[x.id];if(s&&s.l===1)n++;});return n;}
function setKey(st){return st.kind==="official"?st.name:st.name+"#"+(M.setsVer||"1");}
function wrongItems(){return ALL.filter(function(x){var s=bs.stat[x.id];return s&&s.l===0;});}
function dueItems(){return NS.dueIds(SLUG).map(function(id){return BYID[id];}).filter(Boolean);}
function icon(gi){var g=M.groups[gi];return '<svg class="gi" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+M.icons[g.icon]+'</svg>';}
function numItems(){return coreItems().filter(function(x){return /\d/.test(x.right)&&x.right.length<60;});}

/* ---------- tidslinje-opgaver ---------- */
function distinctYears(n,gap){
  for(var k=0;k<200;k++){var pick=shuffle(TL).slice(0,n),ok=true;
    for(var i=0;i<n&&ok;i++)for(var j=i+1;j<n;j++){if(Math.abs(pick[i][0]-pick[j][0])<gap){ok=false;break;}}
    if(ok)return pick;}
  return shuffle(TL).slice(0,n);
}
function genDate(kind){
  if(kind==="year"){
    var e=TL[Math.floor(Math.random()*TL.length)];
    var others=TL.filter(function(x){return x[1]!==e[1];}).sort(function(a,b){return Math.abs(a[0]-e[0])-Math.abs(b[0]-e[0]);});
    var seen={},pool=[];others.forEach(function(x){if(!seen[x[1]]){seen[x[1]]=1;pool.push(x[1]);}});
    return {type:"mc",id:"d:"+e[1]+e[2],s:0,q:t("whenQ")+" »"+e[2]+"«",right:e[1],wrongs:shuffle(pool.slice(0,9)).slice(0,3),p:e[3],nostat:true};
  }
  if(kind==="first"||kind==="last"){
    var four=distinctYears(4,3).sort(function(a,b){return a[0]-b[0];});
    var r=kind==="first"?four[0]:four[3];
    return {type:"mc",id:"d:"+kind+r[2],s:0,q:kind==="first"?t("firstQ"):t("lastQ"),right:r[2],wrongs:four.filter(function(x){return x!==r;}).map(function(x){return x[2];}),p:r[3],nostat:true,dates:four};
  }
  var five=distinctYears(4,3).sort(function(a,b){return a[0]-b[0];});
  return {type:"order",id:"d:o"+five[0][2],s:0,q:t("orderQ"),events:five,nostat:true};
}
function dateSet(n){var o=[];for(var i=0;i<n;i++){var r=Math.random();o.push(genDate(r<.5?"year":r<.65?"first":r<.8?"last":"order"));}return o;}

/* ---------- quiz-motor ---------- */
var Q=null;
function mkItem(it,exam){
  var c=Object.assign({},it);
  if(c.type==="mc"){var w=c.wrongs;if(exam)w=shuffle(w).slice(0,2);c.opts=shuffle([c.right].concat(w));}
  else c.shown=shuffle(c.events);
  return c;
}
function startQuiz(cfg){
  var items=cfg.items.map(function(it){return mkItem(it,cfg.exam);});
  var n=items.length;
  function fill(v){return items.map(function(){return v;});}
  Q={cfg:cfg,items:items,i:0,ans:fill(null),done:fill(false),uns:fill(false),snap:fill(undefined),logged:fill(false),t0:Date.now(),total:cfg.seconds||M.examSeconds||1800,left:cfg.exam?(cfg.seconds||M.examSeconds||1800):0,timer:null,finished:false};
  if(cfg.exam)Q.timer=setInterval(tickQ,1000);
  renderQuiz();
}
function tickQ(){
  if(!Q||Q.finished)return;
  Q.left=Math.max(0,Q.total-Math.floor((Date.now()-Q.t0)/1000));
  var el=document.getElementById("timer");
  if(el){el.textContent=fmt(Q.left);el.classList.toggle("low",Q.left<=300);}
  if(Q.left<=0)finish();
}
function fmt(s){var m=Math.floor(s/60),r=s%60;return (m<10?"0":"")+m+":"+(r<10?"0":"")+r;}
function isRight(it,a){
  if(a===null||a===undefined)return false;
  if(it.type==="mc")return a===it.right;
  return a.length===it.events.length&&a.every(function(e,k){return e===it.events[k][2];});
}
function givenText(it,a){
  if(a===null||a===undefined)return t("noAnswer");
  return it.type==="mc"?a:a.join(" → ");
}
var STAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.500 9a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 1-1 1.700M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>';
function renderQuiz(){
  var it=Q.items[Q.i],cfg=Q.cfg,n=Q.items.length;
  var exam=cfg.exam,done=Q.done[Q.i],a=Q.ans[Q.i];
  var h='<div class="qtop"><button class="back" id="x">← '+t("end")+'</button><div class="qtitle">'+esc(cfg.title)+'</div>'+(exam?'<div class="timer" id="timer">'+fmt(Q.left)+'</div>':'<div class="timer mono">'+(Q.i+1)+'/'+n+'</div>')+'</div>';
  h+='<div class="prog"><div class="bar"><i style="width:'+Math.round((Q.i+(done?1:0))/n*100)+'%"></i></div>'+(exam?'<span class="mono" style="font-size:13px">'+(Q.i+1)+'/'+n+'</span>':'')+'</div>';
  h+='<div class="card'+(it.s?' g'+gcl(it.s):'')+'">';
  if(it.rq)h+='<span class="requeue">'+t("again")+'</span>';
  h+='<div class="q" id="qq">'+esc(it.q)+'</div>';
  if(!exam&&it.type==="mc"&&done)h+='<div class="src">'+esc(srcOf(it))+'</div>';
  if(it.type==="mc"){
    h+='<div class="opts" role="group" aria-label="'+esc(t("options"))+'">';
    it.opts.forEach(function(o,k){
      var cls="opt";
      if(exam){if(a===o)cls+=" sel";}
      else if(done){if(o===it.right)cls+=" ok";else if(o===a)cls+=" bad";}
      h+='<button class="'+cls+'" data-o="'+k+'"'+((!exam&&done)?' disabled':'')+'><span class="k">'+"ABCD"[k]+'</span><span>'+esc(o)+'</span></button>';
    });
    h+='</div>';
  }else{
    var picked=a||[];
    h+='<div class="chips">';
    it.shown.forEach(function(e){
      var pos=picked.indexOf(e[2]),cls="ev"+(pos>=0?" picked":"");
      if(!exam&&done){cls="ev "+(picked[it.events.indexOf(e)]===e[2]?"ok":"bad");}
      var num=(!exam&&done)?String(it.events.indexOf(e)+1):(pos>=0?String(pos+1):"");
      h+='<button class="'+cls+'" data-e="'+esc(e[2])+'"'+((!exam&&done)?' disabled':'')+'><span class="n">'+num+'</span><span>'+esc(e[2])+((!exam&&done)?'<span class="d">'+esc(e[1])+'</span>':'')+'</span></button>';
    });
    h+='</div>';
    if(!(done&&!exam))h+='<div class="row"><button class="btn ghost" id="clr">'+t("clear")+'</button>'+(exam?'':'<button class="btn" id="chk"'+(picked.length===it.events.length?'':' disabled')+'>'+t("checkOrder")+'</button>')+'</div>';
  }
  /* usikker-knap: virker før og efter svar */
  h+='<button class="uns" id="uns" aria-pressed="'+(Q.uns[Q.i]?'true':'false')+'">'+STAR+'<span>'+t("unsure")+'</span></button>';
  if(!exam&&done){
    var ok=isRight(it,a);
    if(it.type==="mc"){
      h+='<div class="fb '+(ok?'ok':'bad')+'" role="status">'+(ok?'<b>'+t("right")+'</b>':'<b>'+t("wrong")+'</b> '+t("rightAnswer")+': '+esc(it.right))+'</div>';
      if(it.dates)h+='<div class="fb">'+it.dates.map(function(d){return esc(d[1])+' – '+esc(d[2]);}).join('<br>')+'</div>';
    }else h+='<div class="fb '+(ok?'ok':'bad')+'" role="status">'+(ok?'<b>'+t("right")+'</b>':'<b>'+t("wrong")+'</b> '+t("orderHint"))+'</div>';
    if(it.why)h+='<div class="fb why"><b>'+t("why")+'</b> '+esc(it.why)+'</div>';
    if(it.note)h+='<div class="fb">'+esc(it.note)+'</div>';
    if(Q.uns[Q.i]||!ok)h+='<div class="fb warn">'+t("willReturn")+'</div>';
  }
  h+='</div><div class="nav">';
  if(exam){
    h+='<button class="btn ghost" id="prev"'+(Q.i===0?' disabled':'')+'>← '+t("prev")+'</button>';
    h+=Q.i<n-1?'<button class="btn" id="next">'+t("next")+' →</button>':'<button class="btn red" id="fin">'+t("handIn")+'</button>';
  }else{
    h+='<span></span><button class="btn" id="next"'+(done?'':' disabled')+'>'+(Q.i<n-1?t("next")+' →':t("seeResult"))+'</button>';
  }
  h+='</div>';
  if(exam){
    h+='<div class="dots">';
    Q.items.forEach(function(x,k){h+='<button class="dot'+(Q.ans[k]!==null?' done':'')+(k===Q.i?' cur':'')+'" data-j="'+k+'" aria-label="'+esc(t("question"))+' '+(k+1)+'">'+(k+1)+'</button>';});
    h+='</div>';
  }
  main.innerHTML=h;
  bindQuiz();
}
function bindQuiz(){
  document.getElementById("x").onclick=function(){if(Q.timer)clearInterval(Q.timer);Q=null;home();};
  Array.prototype.forEach.call(main.querySelectorAll(".opt"),function(b){b.onclick=function(){choose(+b.getAttribute("data-o"));};});
  Array.prototype.forEach.call(main.querySelectorAll(".ev"),function(b){b.onclick=function(){pickEv(b.getAttribute("data-e"));};});
  var nx=document.getElementById("next");if(nx)nx.onclick=next;
  var pv=document.getElementById("prev");if(pv)pv.onclick=function(){go(Q.i-1);};
  var fn=document.getElementById("fin");if(fn)fn.onclick=confirmFinish;
  var cl=document.getElementById("clr");if(cl)cl.onclick=function(){Q.ans[Q.i]=null;renderQuiz();};
  var ck=document.getElementById("chk");if(ck)ck.onclick=grade;
  document.getElementById("uns").onclick=toggleUns;
  Array.prototype.forEach.call(main.querySelectorAll(".dot"),function(b){b.onclick=function(){go(+b.getAttribute("data-j"));};});
}
function go(k){if(k>=0&&k<Q.items.length){Q.i=k;renderQuiz();window.scrollTo(0,0);}}
/* indsæt en gentagelse af et svagt spørgsmål lidt senere i samme omgang */
function requeue(i){
  var it=Q.items[i];
  if(it.rq||it._rq||Q.cfg.exam||it.type!=="mc")return;
  it._rq=true;
  var pos=Math.min(i+4,Q.items.length),c=mkItem(it,false);c.rq=true;c._rq=true;c.nostat=true;
  Q.items.splice(pos,0,c);Q.ans.splice(pos,0,null);Q.done.splice(pos,0,false);Q.uns.splice(pos,0,false);Q.snap.splice(pos,0,undefined);Q.logged.splice(pos,0,false);
}
function record(i){
  var it=Q.items[i],a=Q.ans[i],ok=isRight(it,a);
  if(!it.nostat){
    if(Q.snap[i]===undefined)Q.snap[i]=NS.snapOf(SLUG,it.id);
    NS.rec(SLUG,it.id,ok,Q.uns[i],Q.snap[i]);
  }
  if(!ok&&!Q.logged[i]&&!it.rq){NS.logWrong(SLUG,it,givenText(it,a));Q.logged[i]=true;}
  save();
}
function choose(k){
  var it=Q.items[Q.i];
  if(Q.cfg.exam){Q.ans[Q.i]=it.opts[k];renderQuiz();return;}
  if(Q.done[Q.i])return;
  Q.ans[Q.i]=it.opts[k];Q.done[Q.i]=true;
  record(Q.i);
  if(!isRight(it,it.opts[k])||Q.uns[Q.i])requeue(Q.i);
  renderQuiz();
}
function pickEv(name){
  if(!Q.cfg.exam&&Q.done[Q.i])return;
  var a=(Q.ans[Q.i]||[]).slice(),k=a.indexOf(name);
  if(k>=0)a.splice(k,1);else a.push(name);
  Q.ans[Q.i]=a.length?a:null;renderQuiz();
}
function grade(){Q.done[Q.i]=true;record(Q.i);renderQuiz();}
function toggleUns(){
  Q.uns[Q.i]=!Q.uns[Q.i];
  if(!Q.cfg.exam&&Q.done[Q.i]){record(Q.i);if(Q.uns[Q.i])requeue(Q.i);}
  renderQuiz();
}
function next(){
  if(Q.cfg.exam){go(Q.i+1);return;}
  if(!Q.done[Q.i])return;
  if(Q.i<Q.items.length-1){Q.i++;if(Q.cfg.saveOrder){bs.pos=Q.cfg.base+Q.i;save();}renderQuiz();window.scrollTo(0,0);}
  else finish();
}
function confirmFinish(){
  var un=Q.ans.filter(function(x){return x===null;}).length;
  if(!un){finish();return;}
  var b=document.getElementById("fin");
  if(b.getAttribute("data-c")){finish();return;}
  b.setAttribute("data-c","1");b.textContent=t("unanswered",un);
}
function finish(){
  if(!Q||Q.finished)return;
  Q.finished=true;if(Q.timer)clearInterval(Q.timer);
  var wrong=[],right=0,total=0,unsure=0;
  Q.items.forEach(function(it,k){
    if(it.rq)return;
    total++;
    var ok=isRight(it,Q.ans[k]);
    if(ok)right++;else wrong.push({it:it,k:k});
    if(Q.uns[k])unsure++;
    if(Q.cfg.exam)record(k);
  });
  var pct=total?Math.round(right/total*100):0;
  if(Q.cfg.setName){var ps=bs.sets[Q.cfg.setName];if(ps===undefined||pct>ps)bs.sets[Q.cfg.setName]=pct;}
  if(Q.cfg.exam){if(bs.best===null||pct>bs.best)bs.best=pct;}
  if(Q.cfg.saveOrder&&Q.i>=Q.items.length-1)bs.pos=0;
  save();
  var need=Math.ceil(total*0.8),pass=Q.cfg.exam?right>=need:null;
  var h='<div class="qtop"><button class="back" id="x">← '+t("toStart")+'</button><div class="qtitle">'+esc(Q.cfg.title)+'</div><span></span></div>';
  h+='<div class="card"><div class="score"><b class="mono">'+right+'</b><span>'+t("ofRight",total,pct)+'</span></div>';
  if(pass!==null)h+='<div><span class="verdict '+(pass?'pass':'fail')+'">'+(pass?t("passed"):t("failed"))+'</span> <span style="color:var(--muted);font-size:14px">'+t("needNote",need,total)+'</span></div>';
  if(unsure)h+='<p style="color:var(--muted);font-size:14px">'+t("unsureCount",unsure)+'</p>';
  h+='<div class="row">';
  if(wrong.length)h+='<button class="btn red" id="rw">'+t("practiceWrong",wrong.length)+'</button>';
  h+='<button class="btn ghost" id="again">'+t("newRound")+'</button></div></div>';
  if(wrong.length){
    h+='<h2>'+t("yourErrors")+'</h2><div class="rev">';
    wrong.forEach(function(w){
      var it=w.it,a=Q.ans[w.k];
      h+='<div class="revi"><div><b>'+esc(it.q)+'</b></div>';
      if(it.type==="mc")h+='<div class="a">'+t("youAnswered")+': '+esc(givenText(it,a))+'<br>'+t("rightAnswer")+': <b>'+esc(it.right)+'</b></div>'+(it.why?'<div class="a">'+esc(it.why)+'</div>':'')+(it.note?'<div class="a">'+esc(it.note)+'</div>':'')+'<div class="src">'+esc(srcOf(it))+'</div>';
      else h+='<div class="a">'+t("rightOrder")+':<br><b>'+it.events.map(function(e,j){return (j+1)+'. '+esc(e[2])+' ('+esc(e[1])+')';}).join('<br>')+'</b></div>';
      h+='</div>';
    });
    h+='</div>';
  }
  main.innerHTML=h;window.scrollTo(0,0);
  var cfg=Q.cfg;
  document.getElementById("x").onclick=function(){Q=null;home();};
  var rw=document.getElementById("rw");
  if(rw)rw.onclick=function(){startQuiz({title:t("lastErrors"),items:shuffle(wrong.map(function(w){return strip(w.it);})),exam:false});};
  document.getElementById("again").onclick=function(){cfg.rerun?cfg.rerun():home();};
}
function strip(x){var c=Object.assign({},x);delete c.opts;delete c.shown;delete c.rq;delete c._rq;return c;}

/* ---------- skærme ---------- */
var TABI={start:'<path d="M4 11l8-7 8 7v9H4z"/>',emner:'<rect x="4" y="4" width="7" height="7" rx="1.500"/><rect x="13" y="4" width="7" height="7" rx="1.500"/><rect x="4" y="13" width="7" height="7" rx="1.500"/><rect x="13" y="13" width="7" height="7" rx="1.500"/>',prover:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',tid:'<path d="M3 12h18M7 12V7M12 12v5M17 12V8"/>',stat:'<path d="M5 20V10M12 20V4M19 20v-7"/>'};
function svg(inner){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+inner+'</svg>';}
var ERAS=[["eraAll",-9999,9999],["eraA",-9999,1499],["eraB",1500,1799],["eraC",1800,1944],["eraD",1945,9999]];
function eraSel(){return window.__era||0;}
function ribHtml(){
  var e=ERAS[eraSel()],rows=TL.filter(function(r){return r[0]>=e[1]&&r[0]<=e[2];}).sort(function(a,b){return a[0]-b[0];});
  var h='<div class="rib" tabindex="0" aria-label="'+esc(t("timeline"))+'">';
  rows.forEach(function(r){h+='<div class="rc"><span class="yr">'+esc(r[1])+'</span><span class="tx">'+esc(r[2])+'</span><span class="p">s. '+r[3]+'</span></div>';});
  return h+'</div>';
}
function mapHtml(){
  var h='<div class="map" role="group" aria-label="'+esc(t("progress"))+'">';
  SHEETS.forEach(function(sh){
    var its=sheetItems(sh.n),ok=its.filter(function(x){var s=bs.stat[x.id];return s&&s.l===1;}).length,pc=Math.round(ok/its.length*100);
    var weak=its.some(function(x){var s=bs.stat[x.id];return s&&s.k;});
    h+='<button class="seg g'+gcl(sh.n)+'" data-ch="'+sh.n+'" style="--p:'+pc+'%" title="'+esc(sheetName(sh.n))+' · '+pc+' %" aria-label="'+esc(sheetName(sh.n))+', '+pc+' %">'+esc(sheetShort(sh.n))+(weak?'<i aria-hidden="true"></i>':'')+'</button>';
  });
  return h+'</div>';
}
function setsHtml(){
  var h='<section class="sec"><div class="sethead"><h1>'+t("sets")+'</h1><p>'+t("setsIntro",M.setCount||12)+'</p></div><div class="tiles">';
  B.sets.forEach(function(st,k){
    var b=bs.sets[setKey(st)];
    h+='<div class="tile"><div class="top"><span class="no">'+(st.kind==="official"?'OFF':String(k+(B.sets[0].kind==="official"?0:1)).padStart(2,"0"))+'</span><span class="tt">'+esc(st.name)+'</span></div><div class="bar"><i style="width:'+(b||0)+'%"></i></div><div class="meta"><span>'+st.items.length+' '+t("questions")+'</span><span>'+(b===undefined?t("notTried"):t("best",b))+'</span></div><div class="acts"><button class="chip" data-set="'+k+'" data-x="1">'+t("asExam")+'</button><button class="chip" data-set="'+k+'" data-x="0">'+t("practice")+'</button></div></div>';
  });
  return h+'</div></section>';
}
function tidHtml(){
  var rows=TL.slice().sort(function(a,b){return a[0]-b[0];});
  var h='<section class="sec"><h1>'+t("timeline")+'</h1><p style="color:var(--muted)">'+t("tlIntro",rows.length)+'</p><div class="row"><button class="btn red" id="go">'+t("testYears")+'</button></div><ul class="tl">';
  rows.forEach(function(r){h+='<li><span class="y">'+esc(r[1])+'</span><span>'+esc(r[2])+' <span class="p">s. '+r[3]+'</span></span></li>';});
  return h+'</ul></section>';
}
var CROSS='<svg class="cross" viewBox="0 0 100 100" aria-hidden="true"><rect x="0" y="38" width="100" height="24" fill="currentColor"/><rect x="28" y="0" width="24" height="100" fill="currentColor"/></svg>';
function startHtml(total,m,due){
  var Hh=M.hero;
  var h='<section class="hero">'+(M.cross?CROSS:'')+'<h1>'+Hh.title+'</h1><p>'+esc(Hh.intro[NS.lang]||Hh.intro.da)+'</p><p class="nums"><b class="mono">'+total+'</b> '+t("questions")+(TL.length?' · <b class="mono">'+TL.length+'</b> '+t("years"):'')+' · <b class="mono">'+m+'</b> '+t("rightLast")+(bs.best!==null?' · '+t("bestExam")+' <b class="mono">'+bs.best+'%</b>':'')+'</p></section>';
  h+='<button class="cta" id="m-exam"><span><b>'+t("examTitle")+'</b><span class="t">'+t("examText",M.examSeconds/60)+'</span></span>'+svg('<path d="M5 12h14M13 6l6 6-6 6"/>').replace('<svg','<svg')+'</button>';
  if(TL.length){
    h+='<section class="sec"><div class="rib-h"><h2>'+t("tlTitle")+'</h2><button class="chip" id="m-date">'+t("testYears")+'</button></div><div class="eras picker" id="eras">';
    ERAS.forEach(function(e,i){h+='<button class="chip" data-e="'+i+'" aria-pressed="'+(i===eraSel()?'true':'false')+'">'+t(e[0])+'</button>';});
    h+='</div>'+ribHtml()+'</section>';
  }
  h+='<section class="sec"><h2>'+t("yourProgress")+'</h2>'+mapHtml()+'<p class="mapnote">'+t("mapNote")+'</p></section>';
  h+='<section class="sec"><h2>'+t("practiceYourWay")+'</h2><div class="modes">';
  h+='<button class="mode'+(due?' due':'')+'" id="m-rep"'+(due?' data-n="'+due+'"':' disabled')+'><b>'+t("repeat")+'</b><span>'+(due?t("repeatText",due):t("repeatNone"))+'</span></button>';
  h+='<button class="mode" id="m-seq"><b>'+t("seq")+'</b><span>'+(bs.pos>0&&bs.pos<total?t("seqContinue",bs.pos+1,total):t("seqText",total))+'</span></button>';
  h+='<button class="mode" id="m-shuf"><b>'+t("shuf")+'</b><span>'+t("shufText")+'</span></button>';
  if(FEAT.nums)h+='<button class="mode" id="m-nums"><b>'+t("nums")+'</b><span>'+t("numsText")+'</span></button>';
  var wr=wrongItems().length;
  h+='<button class="mode" id="m-wr"'+(wr?'':' disabled')+'><b>'+t("myErrors")+'</b><span>'+(wr?t("myErrorsText",wr):t("noErrors"))+'</span></button>';
  h+='</div><div class="row"><span style="font-size:14px;color:var(--muted)">'+t("shufLen")+'</span><div class="picker" id="len">';
  [25,50,100,0].forEach(function(n){h+='<button class="chip" data-n="'+n+'" aria-pressed="'+((n===(bs.len===undefined?50:bs.len))?'true':'false')+'">'+(n||t("allN",total))+'</button>';});
  h+='</div></div></section><p class="foot">'+esc(Hh.foot[NS.lang]||Hh.foot.da)+'</p>';
  return h;
}
function view(){return window.__view||"start";}
function go2(v){window.__view=v;try{sessionStorage.setItem("view-"+SLUG,v);}catch(e){}home();window.scrollTo(0,0);}
function home(){
  Q=null;
  var vw=view(),total=ALL.length,m=mastered(),due=dueItems().length;
  var tabs=[["start","tabStart"],["emner","tabTopics"],["prover","tabSets"]];
  if(TL.length)tabs.push(["tid","tabTimeline"]);
  var h='<nav class="tabs" aria-label="'+esc(t("menu"))+'">';
  tabs.forEach(function(x){h+='<button class="tab" data-v="'+x[0]+'"'+(x[0]===vw?' aria-current="page"':'')+'>'+svg(TABI[x[0]])+t(x[1])+'</button>';});
  h+='<a class="tab" href="stats.html?b='+SLUG+'">'+svg(TABI.stat)+t("tabStats")+'</a></nav>';
  if(vw==="start")h+=startHtml(total,m,due);
  else if(vw==="emner")h+=builderHtml();
  else if(vw==="prover")h+=setsHtml();
  else if(vw==="tid"&&TL.length)h+=tidHtml();
  main.innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll("button.tab"),function(b){b.onclick=function(){go2(b.getAttribute("data-v"));};});
  if(vw==="start"){
    Array.prototype.forEach.call(document.querySelectorAll("#len .chip"),function(b){b.onclick=function(){bs.len=+b.getAttribute("data-n");save();home();};});
    Array.prototype.forEach.call(document.querySelectorAll("#eras .chip"),function(b){b.onclick=function(){window.__era=+b.getAttribute("data-e");var y=window.scrollY;home();window.scrollTo(0,y);};});
    document.getElementById("m-exam").onclick=runExam;
    var rp=document.getElementById("m-rep");if(!rp.disabled)rp.onclick=function(){startQuiz({title:t("repeat"),items:dueItems(),rerun:home});};
    document.getElementById("m-seq").onclick=function(){
      var base=(bs.pos>0&&bs.pos<total)?bs.pos:0;
      startQuiz({title:t("seq"),items:ALL.slice(base),saveOrder:true,base:base,rerun:function(){bs.pos=0;save();home();}});
    };
    document.getElementById("m-shuf").onclick=runShuffle;
    var nb=document.getElementById("m-nums");if(nb)nb.onclick=runNums;
    var db=document.getElementById("m-date");if(db)db.onclick=runDates;
    var wb=document.getElementById("m-wr");if(!wb.disabled)wb.onclick=function(){startQuiz({title:t("myErrors"),items:shuffle(wrongItems()),rerun:home});};
    Array.prototype.forEach.call(document.querySelectorAll(".seg"),function(b){b.onclick=function(){
      var n=+b.getAttribute("data-ch");
      showIntro(n,function(){startQuiz({title:sheetName(n),items:sheetItems(n,bs.bset.d==="1"),rerun:function(){b.onclick();}});});
    };});
  }
  if(vw==="tid"){var g=document.getElementById("go");if(g)g.onclick=runDates;}
  if(vw==="prover")Array.prototype.forEach.call(document.querySelectorAll("[data-set]"),function(b){b.onclick=function(){
    var st=B.sets[+b.getAttribute("data-set")],ex=b.getAttribute("data-x")==="1";
    startQuiz({title:st.name+(ex?"":" · "+t("practiceShort")),items:st.items.map(function(x){return Object.assign({type:"mc"},x);}),exam:ex,setName:setKey(st),rerun:function(){b.onclick();}});
  };});
  if(vw==="emner")bindBuilder();
}
/* ---------- emnevælger ---------- */
function isSel(n){return bs.sel.indexOf(n)>=0;}
function builderHtml(){
  var h='<section class="sec" id="builder"><h1>'+t("pickTopics")+'</h1><p style="color:var(--muted);font-size:14px">'+t("pickIntro")+'</p><div class="row"><button class="chip" id="sel-all">'+t("selAll")+'</button><button class="chip" id="sel-none">'+t("selNone")+'</button></div>';
  M.groups.forEach(function(g,gi){
    h+='<div class="grp g'+(gi+1)+'"><div class="grp-h"><span class="gh">'+icon(gi)+'<h3>'+esc(g.name)+'</h3></span><button class="chip" data-g="'+gi+'">'+t("selGroup")+'</button></div><div class="tiles">';
    g.sheets.forEach(function(n){
      var sh=sheetBy(n),its=sheetItems(n),ok=its.filter(function(x){var s=bs.stat[x.id];return s&&s.l===1;}).length;
      h+='<button class="tile pick g'+(gi+1)+'" data-s="'+n+'" aria-pressed="'+(isSel(n)?'true':'false')+'"><span class="top"><span class="cb" aria-hidden="true"></span><span class="no">'+esc(spec(n)?spec(n).tag:String(n).padStart(2,"0"))+'</span><span class="tt">'+esc(sh.title)+'</span></span><span class="bar"><i style="width:'+Math.round(ok/its.length*100)+'%"></i></span><span class="meta"><span>'+its.length+' '+t("questions")+'</span><span>s. '+sh.pages+'</span></span></button>';
    });
    h+='</div></div>';
  });
  var b=bs.bset;
  function pk(name,opts,cur){return '<div class="row"><span class="lbl">'+t("lbl_"+name)+'</span><div class="picker" data-p="'+name+'">'+opts.map(function(o){return '<button class="chip" data-v="'+o[0]+'" aria-pressed="'+(String(cur)===String(o[0])?'true':'false')+'">'+o[1]+'</button>';}).join("")+'</div></div>';}
  h+='<div class="settings">'+pk("d",[["0",t("dOff")],["1",t("dOn")]],String(b.d||"0"))+pk("order",[["seq",t("inBook")],["shuf",t("mixed")]],b.order)+pk("n",[[10,"10"],[25,"25"],[50,"50"],[100,"100"],[0,t("allSelected")]],b.n)+pk("mode",[["practice",t("modePractice")],["exam",t("modeExam")]],b.mode)+'</div>';
  h+='</section><div class="startbar"><span id="sum" class="mono"></span><button class="btn red" id="go-sel">'+t("start")+'</button></div>';
  return h;
}
function selCount(){var c=0,d=bs.bset.d==="1";bs.sel.forEach(function(n){c+=sheetItems(n,d).length;});return c;}
function updSum(){
  var c=selCount(),n=bs.bset.n,use=n&&n<c?n:c,sm=document.getElementById("sum"),g=document.getElementById("go-sel");
  if(!sm)return;
  sm.textContent=bs.sel.length?t("sumLine",bs.sel.length,use,c):t("noneSelected");
  g.disabled=!bs.sel.length;
}
function bindBuilder(){
  Array.prototype.forEach.call(document.querySelectorAll(".pick"),function(b){b.onclick=function(){
    var n=+b.getAttribute("data-s"),k=bs.sel.indexOf(n);
    if(k>=0)bs.sel.splice(k,1);else bs.sel.push(n);
    b.setAttribute("aria-pressed",k>=0?"false":"true");save();updSum();
  };});
  function setAll(arr){bs.sel=arr.slice();Array.prototype.forEach.call(document.querySelectorAll(".pick"),function(b){b.setAttribute("aria-pressed",isSel(+b.getAttribute("data-s"))?"true":"false");});save();updSum();}
  document.getElementById("sel-all").onclick=function(){setAll(SHEETS.map(function(x){return x.n;}));};
  document.getElementById("sel-none").onclick=function(){setAll([]);};
  Array.prototype.forEach.call(document.querySelectorAll("[data-g]"),function(b){b.onclick=function(){
    var g=M.groups[+b.getAttribute("data-g")].sheets,all=g.every(isSel);
    var cur=bs.sel.filter(function(n){return g.indexOf(n)<0;});
    setAll(all?cur:cur.concat(g));
  };});
  Array.prototype.forEach.call(document.querySelectorAll(".picker[data-p]"),function(p){
    var key=p.getAttribute("data-p");
    Array.prototype.forEach.call(p.querySelectorAll(".chip"),function(b){b.onclick=function(){
      var v=b.getAttribute("data-v");bs.bset[key]=key==="n"?+v:v;if(key==="d"){var sm0=document.getElementById("sum");}
      Array.prototype.forEach.call(p.querySelectorAll(".chip"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
      save();updSum();
    };});
  });
  document.getElementById("go-sel").onclick=startSel;
  updSum();
}
function startSel(){
  if(!bs.sel.length)return;
  var nums=bs.sel.slice().sort(function(a,b){return a-b;}),items=[];
  var wd=bs.bset.d==="1";nums.forEach(function(n){items=items.concat(sheetItems(n,wd));});
  var b=bs.bset;
  if(b.order==="shuf")items=shuffle(items);
  if(b.n&&b.n<items.length)items=items.slice(0,b.n);
  var ex=b.mode==="exam";
  var go3=function(){startQuiz({title:nums.length===1?sheetName(nums[0]):t("ownTopics",nums.length),items:items,exam:ex,seconds:Math.max(60,items.length*72),rerun:startSel});};
  if(nums.length===1&&!ex)showIntro(nums[0],go3);else go3();
}
function showIntro(n,go){
  var sh=sheetBy(n);
  if(!sh||(!(sh.goals&&sh.goals.length)&&!(sh.keys&&sh.keys.length))){go();return;}
  var h='<div class="qtop"><button class="back" id="x">← '+t("end")+'</button><div class="qtitle">'+esc(sheetName(n))+'</div><span></span></div>';
  h+='<section class="sec intro g'+gcl(n)+'"><h1 style="font-size:clamp(28px,6vw,40px)">'+esc(sh.title)+'</h1>';
  if(sh.goals&&sh.goals.length)h+='<h2>'+t("goals")+'</h2><ul class="lst">'+sh.goals.map(function(g){return '<li>'+esc(g)+'</li>';}).join("")+'</ul>';
  if(sh.keys&&sh.keys.length)h+='<h2>'+t("keypoints")+'</h2><ul class="lst">'+sh.keys.map(function(g){return '<li>'+esc(g)+'</li>';}).join("")+'</ul>';
  h+='<p class="mapnote">'+t("introNote")+'</p><div class="row"><button class="btn red" id="gq">'+t("startQ")+'</button></div></section>';
  main.innerHTML=h;window.scrollTo(0,0);
  document.getElementById("x").onclick=home;document.getElementById("gq").onclick=go;
}
function runExam(){
  var skip=M.noExam||[],pool=shuffle(SHEETS.map(function(s){return s.n;}).filter(function(n){return skip.indexOf(n)<0;})),pick=[];
  pool.slice(0,25).forEach(function(n){var its=sheetItems(n),k=its.filter(function(x){return x.l==="K";});pick.push(shuffle(k.length?k:its)[0]);});
  startQuiz({title:t("examShort"),items:shuffle(pick),exam:true,rerun:runExam});
}
function runShuffle(){
  var n=bs.len===undefined?50:bs.len,items=shuffle(ALL);if(n)items=items.slice(0,n);
  startQuiz({title:t("shuf"),items:items,rerun:runShuffle});
}
function runNums(){var n=bs.len===undefined?50:bs.len,items=shuffle(numItems());if(n)items=items.slice(0,n);startQuiz({title:t("nums"),items:items,rerun:runNums});}
function runDates(){startQuiz({title:t("datesTitle"),items:dateSet(30),rerun:runDates});}
document.addEventListener("keydown",function(e){
  if(!Q||Q.finished||e.metaKey||e.ctrlKey||e.altKey)return;
  var it=Q.items[Q.i];
  if(it.type==="mc"&&e.key>="1"&&e.key<="4"){var k=+e.key-1;if(k<it.opts.length)choose(k);}
  else if(e.key==="u"||e.key==="U"){toggleUns();}
  else if(e.key==="Enter"||e.key==="ArrowRight"){var nx=document.getElementById("next");if(nx&&!nx.disabled){e.preventDefault();next();}}
  else if(e.key==="ArrowLeft"&&Q.cfg.exam){go(Q.i-1);}
});
top.innerHTML=NS.chromeHtml("index.html",M.brand,M.title);
NS.bindChrome(SLUG);
home();
if(/[?&]go=due/.test(location.search)&&dueItems().length){startQuiz({title:t("repeat"),items:dueItems(),rerun:home});}
})();
