(function(){
  // Mobile nav toggle (hamburger)
  function setupMobileNav(){
    const nav = document.getElementById('primaryNav');
    if(!nav) return;

    // CSS-first checkbox toggle
    const checkbox = document.querySelector('.navToggle');
    if(checkbox){
      const close = ()=>{ checkbox.checked = false; };
      nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
      window.addEventListener('resize', ()=>{ if(window.innerWidth > 920) close(); });
      window.addEventListener('keydown', (ev)=>{ if(ev.key === 'Escape') close(); });
      return;
    }

    // Fallback: JS-controlled body class
    const btn = document.querySelector('.menuToggle');
    if(!btn) return;

    const setState = (open)=>{
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      setState(!document.body.classList.contains('nav-open'));
    });

    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setState(false)));
    window.addEventListener('resize', ()=>{ if(window.innerWidth > 920) setState(false); });
    window.addEventListener('keydown', (ev)=>{ if(ev.key === 'Escape') setState(false); });
  }

  setupMobileNav();

  // Footer year
  const y = document.getElementById('y');
  if(y) y.textContent = new Date().getFullYear();
})();
