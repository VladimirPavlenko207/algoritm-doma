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
  document.querySelectorAll('form.calc:not(.helper)').forEach(function(f){
    var h=location.hash.slice(1),got=false;
    if(h){h.split('&').forEach(function(p){var i=p.indexOf('=');if(i<1)return;var k=decodeURIComponent(p.slice(0,i)),v=decodeURIComponent(p.slice(i+1));var el=f.elements[k];if(el&&el.tagName){el.value=v;got=true}});
      if(got){f.dispatchEvent(new Event('change',{bubbles:true}));f.dispatchEvent(new Event('input',{bubbles:true}))}}
    var box=document.createElement('div');box.className='share';
    box.innerHTML=UK?'<button type="button" class="btn ghost">Скопіювати посилання на цей розрахунок</button><p class="muted small">Посилання зберігає ваші цифри — його можна надіслати в домашній чат або родичам.</p>':'<button type="button" class="btn ghost">Скопировать ссылку на этот расчёт</button><p class="muted small">Ссылка сохраняет ваши цифры — её можно отправить в чат дома или родственникам.</p>';
    var res=document.querySelector('section.cres');(res||f).appendChild(box);
    box.querySelector('button').addEventListener('click',function(){
      var q=[];Array.prototype.forEach.call(f.elements,function(el){if(el.name&&(el.tagName==='INPUT'||el.tagName==='SELECT')&&el.value!=='')q.push(encodeURIComponent(el.name)+'='+encodeURIComponent(el.value))});
      copy(location.href.split('#')[0]+'#'+q.join('&'),box);
    });
  });
})();
