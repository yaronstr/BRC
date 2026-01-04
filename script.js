(function(){
  // Mobile nav toggle (hamburger)
  function setupMobileNav(){
    const nav = document.getElementById('primaryNav');
    if(!nav) return;

    // Prefer CSS-only checkbox toggle if present
    const checkbox = document.querySelector('.navToggle');
    if(checkbox){
      const close = ()=>{ checkbox.checked = false; };
      nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
      window.addEventListener('resize', ()=>{ if(window.innerWidth > 920) close(); });
      window.addEventListener('keydown', (ev)=>{ if(ev.key === 'Escape') close(); });
      return;
    }

    // Fallback: JS-controlled body class (if checkbox isn't present)
    const btn = document.querySelector('.menuToggle');
    if(!btn) return;

    const setState = (open)=>{
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const openNow = !document.body.classList.contains('nav-open');
      setState(openNow);
    });

    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>setState(false));
    });

    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 920) setState(false);
    });

    window.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Escape') setState(false);
    });
  }


  // Safe JSON parsing helper so one malformed attribute doesn't break the whole script
  function safeParseJSON(str){
    try { return JSON.parse(str); } catch(e){ return null; }
  }
  const key = 'brc_lang';
  function getQueryLang(){
    const m = new URLSearchParams(window.location.search).get('lang');
    if(!m) return null;
    const v = m.toLowerCase();
    return (v==='en' || v==='es') ? v : null;
  }
  const setLang = (lang)=>{
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(key, lang);
    document.querySelectorAll('[data-langbtn]').forEach(b=>{
      b.classList.toggle('active', b.getAttribute('data-langbtn')===lang);
    });
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const obj = safeParseJSON(el.getAttribute('data-i18n'));
      if(!obj) return;
      el.innerHTML = obj[lang] || obj['en'] || '';
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const obj = safeParseJSON(el.getAttribute('data-i18n-placeholder'));
      if(!obj) return;
      el.setAttribute('placeholder', obj[lang] || obj['en'] || '');
    });
    const seoTitle = document.querySelector('meta[name="page-title"]');
    const seoDesc = document.querySelector('meta[name="description"]');
    if(seoTitle){
      const obj = safeParseJSON(seoTitle.getAttribute('data-i18n-content'));
      if(obj)
      document.title = obj[lang] || obj['en'] || document.title;
    }
    if(seoDesc){
      const obj = safeParseJSON(seoDesc.getAttribute('data-i18n-content'));
      if(obj)
      seoDesc.setAttribute('content', obj[lang] || obj['en'] || seoDesc.getAttribute('content'));
    }
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach(a=>{
      a.classList.toggle('active', (a.getAttribute('data-nav')||'').toLowerCase()===path);
      const href = a.getAttribute('href');
      if(href && href.indexOf('lang=') === -1){
        const sep = href.includes('?') ? '&' : '?';
        a.setAttribute('href', href + sep + 'lang=' + lang);
      }
    });
  };
  const q = getQueryLang();
  const stored = localStorage.getItem(key);
  const browserIsES = (navigator.language || 'en').toLowerCase().startsWith('es');
  const initial = q || stored || (browserIsES ? 'es' : 'en');
  // Setup nav first so it still works even if translations have issues
  setupMobileNav();
  setLang(initial);
  document.querySelectorAll('[data-langbtn]').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.getAttribute('data-langbtn')));
  });
  const y = document.getElementById('y');
  if(y) y.textContent = new Date().getFullYear();
})();