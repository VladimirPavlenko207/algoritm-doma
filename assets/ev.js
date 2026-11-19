/* События для GoatCounter: что люди делают на страницах (без cookies и без личных данных).
   В панели GoatCounter они видны в списке Pages с пометкой «event». */
(function(){
  var P = location.pathname, sent = {};
  function ev(name, title){
    if (sent[name]) return; sent[name] = 1;
    var send = function(){
      if (window.goatcounter && window.goatcounter.count) { window.goatcounter.count({path: name, title: title, event: true}); return true; }
    };
    if (!send()) { var n = 0, t = setInterval(function(){ if (send() || ++n > 20) clearInterval(t); }, 500); }
  }
  var inCalc = /\/kalkulyatory\/[^\/]+/.test(P);
  var inHelper = P.indexOf('/pomoshchnik') >= 0;
  function onInput(e){
    var el = e.target;
    if (!e.isTrusted || !el || !/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) || !el.closest('main')) return;
    if (inCalc) ev('calc-use' + P, 'Калькулятор: вписали свои цифры');
    else if (inHelper) ev('helper-use' + P, 'Помощник: начали отвечать');
  }
  try { if (localStorage.getItem('fb:' + P)) document.querySelectorAll('.fb').forEach(function(b){ b.querySelectorAll('.fb-btn,.fb-q').forEach(function(x){ x.hidden = true; }); b.querySelector('.fb-thanks').hidden = false; }); } catch (x) {}
  if (inCalc && (window.__openedLink || /=/.test(location.hash))) ev('link-open' + P, 'Открыли присланную ссылку на расчёт');
  document.addEventListener('input', onInput, true);
  document.addEventListener('change', onInput, true);
  document.addEventListener('click', function(e){
    var el = e.target; if (!el || !el.closest) return;
    if (inCalc && el.closest('.chip')) { ev('calc-use' + P, 'Калькулятор: вписали свои цифры'); return; }
    var fb = el.closest('.fb-btn');
    if (fb) { var yes = fb.dataset.fb === 'yes'; ev('helpful-' + (yes ? 'yes' : 'no') + P, yes ? 'Было полезно: да' : 'Было полезно: нет');
      var box = fb.closest('.fb'); box.querySelectorAll('.fb-btn,.fb-q').forEach(function(x){ x.hidden = true; }); box.querySelector('.fb-thanks').hidden = false;
      try { localStorage.setItem('fb:' + P, yes ? 'yes' : 'no'); } catch (x) {} return; }
    if (el.closest('.copy-msg')) { ev('spec-copy' + P, 'Специалистам: скопировали сообщение для клиента'); return; }
    if (el.closest('.print-btn')) { ev('print' + P, 'Распечатали / сохранили в PDF'); return; }
    if (el.closest('#share, .share button')) { ev('share-copy' + P, 'Скопировали ссылку на расчёт'); return; }
    var v = el.closest('.video[data-yt]');
    if (v) { ev('video-play' + P, 'Запустили ролик на сайте'); return; }
    var a = el.closest('a[href]'); if (!a) return;
    var href = a.getAttribute('href') || '', u;
    try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (a.closest('.lang')) { ev('lang-' + (a.dataset.lang || '') + P, 'Переключили язык'); return; }
    if (href.indexOf('#add=') >= 0) {
      var name = ''; try { name = decodeURIComponent(href.split('#add=')[1]).split('|')[0]; } catch (x) {}
      ev('watt-add/' + name, 'Справочник → в калькулятор: ' + name); return;
    }
    if (/(^|\.)youtu(\.be|be\.com)$/.test(u.hostname)) { ev('out-youtube' + P, 'Переход на YouTube'); return; }
    if (inHelper && a.closest('main') && /\/(kalkulyatory|algoritmy)\//.test(u.pathname))
      ev('helper-go' + u.pathname.replace(/index\.html$/, ''), 'Помощник → ' + u.pathname.replace(/index\.html$/, ''));
  }, true);
})();
