(function(){
  // Mobile nav toggle (hamburger)
  function setupMobileNav(){
    const btn = document.querySelector('.menuToggle');
    const nav = document.getElementById('primaryNav');
    if(!btn || !nav) return;

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

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>setState(false));
    });

    // Close menu on resize back to desktop
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 920) setState(false);
    });

    // Close menu on Escape
    window.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Escape') setState(false);
    });
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
      const obj = JSON.parse(el.getAttribute('data-i18n'));
      el.innerHTML = obj[lang] || obj['en'] || '';
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const obj = JSON.parse(el.getAttribute('data-i18n-placeholder'));
      el.setAttribute('placeholder', obj[lang] || obj['en'] || '');
    });
    const seoTitle = document.querySelector('meta[name="page-title"]');
    const seoDesc = document.querySelector('meta[name="description"]');
    if(seoTitle){
      const obj = JSON.parse(seoTitle.getAttribute('data-i18n-content'));
      document.title = obj[lang] || obj['en'] || document.title;
    }
    if(seoDesc){
      const obj = JSON.parse(seoDesc.getAttribute('data-i18n-content'));
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
  setLang(initial);
  setupMobileNav();
  document.querySelectorAll('[data-langbtn]').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.getAttribute('data-langbtn')));
  });
  const y = document.getElementById('y');
  if(y) y.textContent = new Date().getFullYear();
  setupMobileNav();
})();