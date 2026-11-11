
(function(){
  'use strict';
  var WA='https://wa.me/375298843568';
  var burger=document.getElementById('burger'), drawer=document.getElementById('drawer'),
      closeBtn=document.getElementById('drawerClose'), lastFocus=null;
  function openD(){ if(!drawer) return; lastFocus=document.activeElement; drawer.hidden=false;
    document.body.classList.add('is-locked'); if(burger) burger.setAttribute('aria-expanded','true'); if(closeBtn) closeBtn.focus(); }
  function closeD(){ if(!drawer||drawer.hidden) return; drawer.hidden=true;
    document.body.classList.remove('is-locked'); if(burger) burger.setAttribute('aria-expanded','false'); if(lastFocus) lastFocus.focus(); }
  if(burger) burger.addEventListener('click',openD);
  if(closeBtn) closeBtn.addEventListener('click',closeD);
  if(drawer) drawer.addEventListener('click',function(e){ if(e.target===drawer) closeD(); });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') closeD();
    if(e.key==='Tab' && drawer && !drawer.hidden){
      var f=drawer.querySelectorAll('a,button'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize',function(){ if(window.innerWidth>1079) closeD(); });

  var route=document.getElementById('route');
  if(route){
    var D=[]; try{ D=JSON.parse(document.getElementById('routeData').textContent); }catch(e){}
    var k=document.getElementById('rt-kick'), t=document.getElementById('rt-title'),
        d=document.getElementById('rt-desc'), tech=document.getElementById('rt-tech'),
        chk=document.getElementById('rt-check'), cta=document.getElementById('rt-cta');
    var btns=route.querySelectorAll('.route__list button');
    function paint(i){
      var s=D[i]; if(!s) return;
      k.textContent='Этап '+s.n+' · '+(i+1)+' из '+D.length;
      t.textContent=s.t; d.textContent=s.d; tech.textContent=s.tech; chk.textContent=s.check;
      cta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Интересует этап «'+s.t+'» на объекте в Гродно. Подскажите, что нужно подготовить и когда можно посмотреть участок?');
      btns.forEach(function(b,bi){ b.setAttribute('aria-pressed', bi===i?'true':'false'); });
    }
    btns.forEach(function(b,bi){ b.addEventListener('click',function(){ paint(bi); }); });
    paint(0);
  }

  var strip=document.getElementById('strip');
  if(strip){
    var L=document.getElementById('s-len'), W=document.getElementById('s-w'), H=document.getElementById('s-h'),
        vol=document.getElementById('s-vol'), fm=document.getElementById('s-form'), cu=document.getElementById('s-cush'),
        rb=document.getElementById('s-rebar'), cl=document.getElementById('s-clamps'), cta2=document.getElementById('s-cta');
    function num(el,def){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:def; }
    function f2(n){ return n.toLocaleString('ru-RU',{maximumFractionDigits:1,minimumFractionDigits:1}).replace(/\u00A0/g,' '); }
    function paint(){
      var l=num(L,40), w=num(W,0.4), h=num(H,1);
      var v=l*w*h, form=2*l*h, cush=l*w*0.2, rebar=4*l*1.08, n=Math.round(l/0.4)+1;
      vol.textContent=f2(v)+' м³';
      fm.textContent=f2(form);
      cu.textContent=f2(cush);
      rb.textContent=f2(rebar);
      cl.textContent=n+' шт';
      cta2.href=WA+'?text='+encodeURIComponent('Здравствуйте! Расчёт ленты с сайта:\nДлина по осям: '+l+' м\nШирина: '+w+' м\nВысота: '+h+' м\nОбъём бетона: '+f2(v)+' м³\nОпалубка: '+f2(form)+' м²\nПодушка 0,2 м: '+f2(cush)+' м³\nПодскажите стоимость работ и когда можно посмотреть участок?');
    }
    [L,W,H].forEach(function(el){ if(el){ el.addEventListener('input',paint); } });
    paint();
  }

  var cargo=document.getElementById('cargo');
  if(cargo){
    var CD=[]; try{ CD=JSON.parse(document.getElementById('cargoData').textContent); }catch(e){}
    var ct=document.getElementById('cg-title'), cd=document.getElementById('cg-desc'),
        cw=document.getElementById('cg-what'), ccta=document.getElementById('cg-cta');
    var cb=cargo.querySelectorAll('#cg-list button');
    function paintC(i){
      var s=CD[i]; if(!s) return;
      ct.textContent=s.n; cd.textContent=s.d; cw.textContent=s.w;
      ccta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Нужна перевозка: '+s.n+'. Подскажите, какая машина подойдёт и когда свободна?');
      cb.forEach(function(b,bi){ b.setAttribute('aria-pressed', bi===i?'true':'false'); });
    }
    cb.forEach(function(b,bi){ b.addEventListener('click',function(){ paintC(bi); }); });
    paintC(0);
  }

  var evac=document.getElementById('evac');
  if(evac){
    var ED=[]; try{ ED=JSON.parse(document.getElementById('evacData').textContent); }catch(e){}
    var et=document.getElementById('ev-title'), ed=document.getElementById('ev-desc'),
        es=document.getElementById('ev-scheme'), ecta=document.getElementById('ev-cta');
    var eb=evac.querySelectorAll('#ev-list button');
    function paintE(i){
      var s=ED[i]; if(!s) return;
      et.textContent=s.n; ed.textContent=s.d; es.textContent=s.s;
      ecta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Нужен эвакуатор: '+s.n+'. Что нужно сообщить дополнительно?');
      eb.forEach(function(b,bi){ b.setAttribute('aria-pressed', bi===i?'true':'false'); });
    }
    eb.forEach(function(b,bi){ b.addEventListener('click',function(){ paintE(bi); }); });
    paintE(0);
  }

  var tr=document.getElementById('trench');
  if(tr){
    var TD=[]; try{ TD=JSON.parse(document.getElementById('trenchData').textContent); }catch(e){}
    var len=document.getElementById('t-len'), wid=document.getElementById('t-w'), dep=document.getElementById('t-d'),
        volEl=document.getElementById('t-vol'), tripEl=document.getElementById('t-trips'),
        svg=document.getElementById('t-svg'), stroke=document.getElementById('t-stroke'),
        wLab=document.getElementById('t-wlab'), dLab=document.getElementById('t-dlab'),
        taskEl=document.getElementById('t-task'), tcta=document.getElementById('t-cta'), curTask=0;
    function num2(el,def){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:def; }
    function paintT(){
      var l=num2(len,30), w=num2(wid,0.5), d=num2(dep,1.5);
      var v=l*w*d;
      volEl.textContent=v.toLocaleString('ru-RU',{maximumFractionDigits:1}).replace(/\u00A0/g,' ')+' м³';
      tripEl.textContent=Math.max(1,Math.ceil(v/8))+' рейс(а) при 8 м³';
      var maxW=1.6, maxD=3;
      var bw=Math.max(18,110*w/maxW), bh=Math.max(16,110*d/maxD);
      var x=140-bw/2, y=190-bh;
      stroke.setAttribute('x',x); stroke.setAttribute('y',y);
      stroke.setAttribute('width',bw); stroke.setAttribute('height',bh);
      wLab.textContent=w.toFixed(2).replace('.',',')+' м';
      dLab.textContent=d.toFixed(2).replace('.',',')+' м';
      wLab.setAttribute('x',140); wLab.setAttribute('y',212);
      dLab.setAttribute('x',140+bw/2+14); dLab.setAttribute('y',y+bh/2+4);
      var s=TD[curTask]||{};
      taskEl.textContent=s.d||'';
      tcta.href=WA+'?text='+encodeURIComponent('Здравствуйте! Нужен мини-экскаватор.\nЗадача: '+(s.n||'земляные работы')+'\nДлина: '+l+' м, ширина: '+w+' м, глубина: '+d+' м\nОбъём выемки: '+v.toFixed(1)+' м³\nКогда можно посмотреть участок?');
    }
    [len,wid,dep].forEach(function(el){ if(el) el.addEventListener('input',paintT); });
    tr.querySelectorAll('#t-tasks button').forEach(function(b,i){
      b.addEventListener('click',function(){
        curTask=i;
        tr.querySelectorAll('#t-tasks button').forEach(function(x,xi){ x.setAttribute('aria-pressed', xi===i?'true':'false'); });
        paintT();
      });
    });
    paintT();
  }

  var form=document.getElementById('leadForm'), msg=document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form), name=(d.get('name')||'').toString().trim(), phone=(d.get('phone')||'').toString().trim();
      if(name.length<2||phone.length<6){ msg.textContent='Нужны имя и телефон, иначе не перезвонить.'; return; }
      var lines=['Заявка с сайта: '+document.title,'Имя: '+name,'Телефон: '+phone,
        'Что нужно: '+(d.get('job')||''),'Объект: '+(d.get('obj')||'')];
      var m=(d.get('msg')||'').toString().trim(); if(m) lines.push('Комментарий: '+m);
      msg.textContent='Открываю WhatsApp с готовым сообщением.';
      window.open(WA+'?text='+encodeURIComponent(lines.join('\n')),'_blank');
    });
  }
})();
