/* Ссылка на свой расчёт: значения полей калькулятора сохраняются в адресе после # */
(function(){
  var UK=document.documentElement.lang==='uk';
  if(!document.querySelector('link[href*="style.css"]')){var st=document.createElement('style');st.textContent='.toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);max-width:92vw;background:#eef3f8;color:#0d1520;font:600 15px/1.4 sans-serif;padding:12px 18px;border-radius:12px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:50;text-align:center}.toast.on{opacity:1;transform:translate(-50%,0)}.share-url{display:block;width:100%;margin-top:8px;padding:9px 10px;font-size:14px}';document.head.appendChild(st)}
  function toast(m){var t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
    t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('on')},4500)}
  function copy(url,box){
    var done=function(){toast(UK?'Посилання скопійовано — надішліть його в чат або собі':'Ссылка скопирована — отправьте её в чат или себе')};
    var manual=function(){var i=box.querySelector('input.share-url');if(!i){i=document.createElement('input');i.className='share-url';i.readOnly=true;box.appendChild(i)}i.value=url;i.focus();i.select();toast(UK?'Скопіюйте посилання з поля нижче':'Скопируйте ссылку из поля ниже')};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done,manual)}else manual();
  }
  window.__shareCopy=copy;
  var sh=document.getElementById('share');
  if(sh&&!document.querySelector('.print-btn')){var pb=document.createElement('button');pb.type='button';pb.className='print-btn';pb.textContent=UK?'Роздрукувати / зберегти в PDF':'Распечатать / сохранить в PDF';sh.parentNode.insertBefore(pb,sh.nextSibling)}
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.print-btn'))window.print()});
  var LOGO='<svg viewBox="0 0 44 28" aria-hidden="true"><rect x="1.5" y="1.5" width="41" height="25" rx="6" fill="none" stroke="#ffb020" stroke-width="3"/><path d="M6 15h8l3-5 4 10 3-5h14" fill="none" stroke="#ffb020" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  function shareUrl(){if(window.__shareUrl)return window.__shareUrl();var f=document.querySelector('form.calc:not(.helper)');if(!f)return location.href.split('#')[0];var q=[];Array.prototype.forEach.call(f.elements,function(el){if(el.name&&(el.tagName==='INPUT'||el.tagName==='SELECT')&&el.value!=='')q.push(encodeURIComponent(el.name)+'='+encodeURIComponent(el.value))});return location.href.split('#')[0]+'#'+q.join('&')}
  addEventListener('beforeprint',function(){var h=document.querySelector('.print-head');if(!h){h=document.createElement('div');h.className='print-head';var m=document.querySelector('main')||document.body;m.insertBefore(h,m.firstChild)}
    var memo=!!document.querySelector('.memo'),u=shareUrl(),d=new Date().toLocaleDateString(UK?'uk-UA':'ru-RU'),qr='';
    try{if(window.qrcode){var c=qrcode(0,'L');c.addData(u);c.make();qr=c.createSvgTag({cellSize:2,margin:4,scalable:true});if(u.length>250)qr=qr.replace('<svg ','<svg class="big" ')}}catch(e){}
    var sub=memo?(UK?'Пам\'ятка для друку':'Памятка для печати'):(UK?'Розрахунок від ':'Расчёт от ')+d;
    var cap=memo?(UK?'Калькулятори й пам\'ятки':'Калькуляторы и памятки'):(UK?'Відкрити цей розрахунок':'Открыть этот расчёт');
    h.innerHTML='<div class="ph-brand">'+LOGO+'<div><b>Алгоритм дома</b> · algoritmdoma.com<br><span>'+sub+'</span></div></div>'+(qr?'<div class="ph-qr">'+qr+'<span>'+cap+'</span></div>':'')});
  document.querySelectorAll('form.calc:not(.helper)').forEach(function(f){
    var h=location.hash.slice(1),got=false;
    if(h){h.split('&').forEach(function(p){var i=p.indexOf('=');if(i<1)return;var k=decodeURIComponent(p.slice(0,i)),v=decodeURIComponent(p.slice(i+1));var el=f.elements[k];if(el&&el.tagName){el.value=v;got=true}});
      if(got){f.dispatchEvent(new Event('change',{bubbles:true}));f.dispatchEvent(new Event('input',{bubbles:true}))}}
    var box=document.createElement('div');box.className='share';
    box.innerHTML=UK?'<button type="button" class="btn ghost copy-btn">Скопіювати посилання на цей розрахунок</button> <button type="button" class="btn ghost print-btn">Роздрукувати / зберегти в PDF</button><p class="muted small">Посилання зберігає ваші цифри — його можна надіслати в домашній чат або родичам.</p>':'<button type="button" class="btn ghost copy-btn">Скопировать ссылку на этот расчёт</button> <button type="button" class="btn ghost print-btn">Распечатать / сохранить в PDF</button><p class="muted small">Ссылка сохраняет ваши цифры — её можно отправить в чат дома или родственникам.</p>';
    var res=document.querySelector('section.cres');(res||f).appendChild(box);
    box.querySelector('.copy-btn').addEventListener('click',function(){
      var q=[];Array.prototype.forEach.call(f.elements,function(el){if(el.name&&(el.tagName==='INPUT'||el.tagName==='SELECT')&&el.value!=='')q.push(encodeURIComponent(el.name)+'='+encodeURIComponent(el.value))});
      copy(location.href.split('#')[0]+'#'+q.join('&'),box);
    });
  });
})();
