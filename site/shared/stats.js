/* Statistik: tid, svar, fejljournal, eksport/import */
(function(){
"use strict";
var NS=window.NS,t=NS.t,esc=NS.esc,S=NS.S,BOOKS=window.BOOKS||[];
var top=document.getElementById("top"),main=document.getElementById("app");
document.title=t("tabStats");
var qb=(location.search.match(/[?&]b=([\w-]+)/)||[])[1]||"";
function title(slug){var b=BOOKS.filter(function(x){return x.slug===slug;})[0];return b?b.title:slug;}
function render(BK){
  var slugs=BOOKS.map(function(b){return b.slug;});
  var h='<nav class="nav2"><a class="btn ghost" style="text-decoration:none" href="'+(qb?'book.html?b='+qb:'index.html')+'">← '+t("back")+'</a></nav><h1>'+t("tabStats")+'</h1>';
  /* nøgletal */
  var tot=0;Object.keys(S.time).forEach(function(k){tot+=NS.totalOn(k);});
  var d=new Date(),wk=0;for(var i=0;i<7;i++){wk+=NS.totalOn(NS.dayKey(d));d.setDate(d.getDate()-1);}
  var streak=0;d=new Date();if(!NS.totalOn(NS.dayKey(d)))d.setDate(d.getDate()-1);
  while(NS.totalOn(NS.dayKey(d))>=60){streak++;d.setDate(d.getDate()-1);}
  h+='<section class="today"><div class="kpi"><b>'+NS.fmtDur(NS.totalOn(NS.dayKey()))+'</b><span>'+t("timeToday")+'</span></div><div class="kpi"><b>'+NS.fmtShort(wk)+'</b><span>'+t("time7")+'</span></div><div class="kpi"><b>'+NS.fmtShort(tot)+'</b><span>'+t("timeAll")+'</span></div><div class="kpi"><b>'+streak+'</b><span>'+t("streak")+'</span></div></section>';
  /* søjler: 14 dage */
  var days=[],mx=60;d=new Date();
  for(i=0;i<14;i++){var k=NS.dayKey(d),v=NS.totalOn(k);days.unshift([d.getDate(),v]);mx=Math.max(mx,v);d.setDate(d.getDate()-1);}
  h+='<section class="sec"><h2>'+t("last14")+'</h2><div class="chart" role="img" aria-label="'+esc(t("last14"))+'">';
  days.forEach(function(x){h+='<div class="col" title="'+Math.round(x[1]/60)+' '+t("min")+'"><i style="height:'+Math.round(x[1]/mx*100)+'%"></i><span>'+x[0]+'</span></div>';});
  h+='</div><p class="mapnote">'+t("chartNote")+'</p></section>';
  /* pr. bog */
  h+='<section class="sec"><h2>'+t("perBook")+'</h2><div class="tw"><table class="tbl"><thead><tr><th>'+t("books")+'</th><th class="r">'+t("time")+'</th><th class="r">'+t("answered")+'</th><th class="r">'+t("accuracy")+'</th><th class="r">'+t("weak")+'</th></tr></thead><tbody>';
  slugs.forEach(function(s){
    var st=(S.books[s]||{}).stat||{},c=0,w=0,weak=0,n=0,bt=0;
    Object.keys(st).forEach(function(id){c+=st[id].c;w+=st[id].w;n++;if(st[id].k)weak++;});
    Object.keys(S.time).forEach(function(k){bt+=S.time[k][s]||0;});
    h+='<tr><td><a href="book.html?b='+s+'">'+esc(title(s))+'</a></td><td class="r">'+NS.fmtShort(bt)+'</td><td class="r">'+n+'</td><td class="r">'+(c+w?Math.round(c/(c+w)*100)+' %':'–')+'</td><td class="r">'+weak+'</td></tr>';
  });
  h+='</tbody></table></div></section>';
  /* kapitler i valgt bog */
  if(BK){
    var rows=BK.sheets.map(function(sh){
      var c=0,w=0,weak=0,seen=0,st=NS.book(BK.meta.slug).stat;
      sh.q.forEach(function(_,i){var s=st[sh.n+":"+i];if(s){seen++;c+=s.c;w+=s.w;if(s.k)weak++;}});
      return {n:sh.n,title:sh.title,seen:seen,total:sh.q.length,acc:c+w?c/(c+w):null,weak:weak};
    }).sort(function(a,b){return (a.acc===null?2:a.acc)-(b.acc===null?2:b.acc);});
    h+='<section class="sec"><h2>'+esc(title(qb))+': '+t("weakest")+'</h2><div class="tw"><table class="tbl"><thead><tr><th>'+t("topic")+'</th><th class="r">'+t("answered")+'</th><th class="r">'+t("accuracy")+'</th><th class="r">'+t("weak")+'</th></tr></thead><tbody>';
    rows.forEach(function(r){h+='<tr><td>'+esc(r.title)+'</td><td class="r">'+r.seen+'/'+r.total+'</td><td class="r">'+(r.acc===null?'–':Math.round(r.acc*100)+' %')+'</td><td class="r">'+r.weak+'</td></tr>';});
    h+='</tbody></table></div></section>';
  }
  /* gentagelse */
  h+='<section class="sec"><h2>'+t("repeatQueue")+'</h2><div class="row">';
  slugs.forEach(function(s){var n=NS.dueIds(s).length,w=NS.weakCount(s);h+='<a class="btn ghost" style="text-decoration:none'+(n?'':';opacity:.5;pointer-events:none')+'" href="book.html?b='+s+'&go=due">'+esc(title(s))+': '+t("dueNow",n)+' ('+t("weakN",w)+')</a>';});
  h+='</div></section>';
  /* fejljournal */
  h+='<section class="sec"><div class="rib-h"><h2>'+t("journal")+'</h2><select class="sel" id="jf" aria-label="'+esc(t("books"))+'"><option value="">'+t("allBooks")+'</option>'+slugs.map(function(s){return '<option value="'+s+'"'+(s===qb?' selected':'')+'>'+esc(title(s))+'</option>';}).join('')+'</select></div><div class="jr" id="jr"></div></section>';
  /* data */
  h+='<section class="sec"><h2>'+t("yourData")+'</h2><p class="mapnote">'+t("dataNote")+'</p><div class="row"><button class="btn" id="ex">'+t("exportBtn")+'</button><label class="btn ghost" style="cursor:pointer">'+t("importBtn")+'<input id="im" type="file" accept="application/json" hidden></label><button class="btn ghost" id="rs">'+t("resetBtn")+'</button></div><p class="mapnote" id="msg" role="status"></p></section>';
  main.innerHTML=h;
  function journal(){
    var f=document.getElementById("jf").value,rows=S.log.filter(function(e){return !f||e.b===f;}).slice(-100).reverse(),o='';
    if(!rows.length)o='<div class="empty">'+t("noJournal")+'</div>';
    rows.forEach(function(e){var dt=new Date(e.ts);o+='<div class="ji"><span class="m">'+esc(title(e.b))+' · '+dt.toLocaleDateString(NS.lang==="ru"?"ru-RU":"da-DK")+' '+dt.toLocaleTimeString(NS.lang==="ru"?"ru-RU":"da-DK",{hour:"2-digit",minute:"2-digit"})+' · s. '+e.p+'</span><b>'+esc(e.q)+'</b><span class="bad">'+t("youAnswered")+': '+esc(e.given)+'</span><span class="good">'+t("rightAnswer")+': '+esc(e.right)+'</span></div>';});
    document.getElementById("jr").innerHTML=o;
  }
  document.getElementById("jf").onchange=journal;journal();
  document.getElementById("ex").onclick=NS.exportData;
  document.getElementById("im").onchange=function(ev){var f=ev.target.files[0];if(!f)return;
    NS.importData(f,function(ok){document.getElementById("msg").textContent=ok?t("imported"):t("importFail");if(ok)setTimeout(function(){location.reload();},700);});};
  document.getElementById("rs").onclick=function(){
    var b=this;if(!b.getAttribute("data-c")){b.setAttribute("data-c","1");b.textContent=t("resetSure");return;}
    try{localStorage.removeItem("nordstudy-v1");}catch(e){}location.reload();
  };
  top.innerHTML=NS.chromeHtml("index.html",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v14h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4z"/><path d="M12 6v14"/></svg>',t("siteName"));
  NS.bindChrome("_");
}
if(qb&&/^[a-z0-9-]+$/.test(qb)){
  var sc=document.createElement("script");sc.src="books/"+qb+"/book.js";
  sc.onload=function(){render(window.BOOK);};sc.onerror=function(){render(null);};document.head.appendChild(sc);
}else render(null);
})();
