/**
 * BCN Recovery Care — AI Chat Widget
 * Calls the Vercel backend (API key is hidden server-side).
 */

(function () {

  // CONFIG
  const API_URL = 'https://brc-api.vercel.app/api/chat';



  // Detect page language
  const pageLang = (document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';

  const STRINGS = {
    en: {
      title: 'Recovery Assistant',
      subtitle: 'Ask us anything about recovery care',
      placeholder: 'Type your question...',
      send: 'Send',
      welcome: "Hello! I'm the BCN Recovery Care assistant. How can I help you today? You can ask me about our recovery programs, apartments, or what to expect after your surgery.",
      error: 'Sorry, something went wrong. Please try again or contact us directly via WhatsApp.',
      thinking: 'Thinking...',
    },
    es: {
      title: 'Asistente de Recuperacion',
      subtitle: 'Preguntanos sobre recuperacion postoperatoria',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      welcome: 'Hola! Soy el asistente de BCN Recovery Care. Como puedo ayudarte? Puedes preguntarme sobre nuestros programas de recuperacion, los apartamentos o que esperar despues de tu cirugia.',
      error: 'Lo sentimos, algo salio mal. Intentalo de nuevo o contactanos directamente por WhatsApp.',
      thinking: 'Un momento...',
    }
  };

  const T = STRINGS[pageLang];

  // STYLES
  const style = document.createElement('style');
  style.textContent = `
    #brc-chat-btn {
      position: fixed;
      bottom: 24px;
      right: 154px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #1a3a3a;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.22);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
      transition: transform 0.2s, background 0.2s;
    }
    #brc-chat-btn:hover { background: #2a5a5a; transform: scale(1.06); }
    #brc-chat-btn svg { width: 26px; height: 26px; }
    #brc-chat-window {
      position: fixed;
      bottom: 92px;
      right: 154px;
      width: 360px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 120px);
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      transition: opacity 0.2s, transform 0.2s;
    }
    #brc-chat-window.brc-hidden {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
      pointer-events: none;
    }
    #brc-header {
      background: #1a3a3a;
      color: #fff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #brc-header-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #2a5a5a;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 18px;
    }
    #brc-header-text { flex: 1; }
    #brc-header-title { font-weight: 600; font-size: 14px; line-height: 1.2; }
    #brc-header-subtitle { font-size: 11px; opacity: 0.75; margin-top: 2px; }
    #brc-close {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 4px;
      opacity: 0.7;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }
    #brc-close:hover { opacity: 1; background: rgba(255,255,255,0.1); }
    #brc-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f9f8f6;
    }
    .brc-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      line-height: 1.5;
      font-size: 13.5px;
      word-wrap: break-word;
    }
    .brc-msg-bot {
      background: #fff;
      color: #1a1a1a;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .brc-msg-user {
      background: #1a3a3a;
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .brc-msg-thinking {
      background: #fff;
      color: #999;
      align-self: flex-start;
      font-style: italic;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    #brc-input-area {
      padding: 12px;
      background: #fff;
      border-top: 1px solid #eee;
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    #brc-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 9px 12px;
      font-size: 13.5px;
      outline: none;
      font-family: inherit;
      resize: none;
      line-height: 1.4;
      max-height: 80px;
      overflow-y: auto;
    }
    #brc-input:focus { border-color: #1a3a3a; }
    #brc-send {
      background: #1a3a3a;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 9px 14px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      transition: background 0.15s;
    }
    #brc-send:hover { background: #2a5a5a; }
    #brc-send:disabled { opacity: 0.5; cursor: not-allowed; }
    #brc-unread {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      background: #e05a2b;
      border-radius: 50%;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: none;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 400px) {
      #brc-chat-window { right: 8px; bottom: 80px; width: calc(100vw - 16px); }
      #brc-chat-btn { right: 8px; bottom: 80px; }
    }
  `;
  document.head.appendChild(style);

  // HTML
  const btn = document.createElement('button');
  btn.id = 'brc-chat-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span id="brc-unread"></span>';
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'brc-chat-window';
  win.className = 'brc-hidden';
  win.innerHTML = '<div id="brc-header"><div id="brc-header-avatar">🏥</div><div id="brc-header-text"><div id="brc-header-title">' + T.title + '</div><div id="brc-header-subtitle">' + T.subtitle + '</div></div><button id="brc-close" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div id="brc-messages"></div><div id="brc-input-area"><textarea id="brc-input" placeholder="' + T.placeholder + '" rows="1"></textarea><button id="brc-send">' + T.send + '</button></div>';
  document.body.appendChild(win);

  // STATE AND LOGIC
  const messagesEl = document.getElementById('brc-messages');
  const inputEl = document.getElementById('brc-input');
  const sendBtn = document.getElementById('brc-send');
  const closeBtn = document.getElementById('brc-close');
  const unreadBadge = document.getElementById('brc-unread');

  var isOpen = false;
  var isWaiting = false;
  var welcomeShown = false;
  var unreadCount = 0;

  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle('brc-hidden', !isOpen);
    if (isOpen) {
      unreadCount = 0;
      unreadBadge.style.display = 'none';
      if (!welcomeShown) {
        appendMessage(T.welcome, 'bot');
        welcomeShown = true;
      }
      setTimeout(function() { inputEl.focus(); }, 200);
    }
  }

  function appendMessage(text, type) {
    var msg = document.createElement('div');
    msg.className = 'brc-msg brc-msg-' + type;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function sendMessage() {
    var text = inputEl.value.trim();
    if (!text || isWaiting) return;

    appendMessage(text, 'user');
    inputEl.value = '';
    inputEl.style.height = 'auto';

    isWaiting = true;
    sendBtn.disabled = true;
    var thinkingMsg = appendMessage(T.thinking, 'thinking');

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text, language: pageLang })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      thinkingMsg.remove();
      if (data.answer) {
        appendMessage(data.answer, 'bot');
      } else {
        appendMessage(T.error, 'bot');
      }
      isWaiting = false;
      sendBtn.disabled = false;
      inputEl.focus();
    })
    .catch(function() {
      thinkingMsg.remove();
      appendMessage(T.error, 'bot');
      isWaiting = false;
      sendBtn.disabled = false;
    });
  }

  // EVENTS
  btn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  inputEl.addEventListener('input', function() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + 'px';
  });

})();
