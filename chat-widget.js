/**
 * BCN Recovery Care — AI Chat Widget
 * Answers from confirmed BRC FAQs and the international operating guide.
 */

(function () {

  // Confirmed BRC FAQs and international operating guide. Questions stay in this browser.



  // Detect page language
  const pageLang = (document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';

  const STRINGS = {
    en: {
      title: 'Recovery Assistant',
      subtitle: 'BRC recovery & international patient FAQs',
      placeholder: 'Type your question...',
      send: 'Send',
      welcome: "Hello! I'm the BCN Recovery Care assistant. How can I help you today? You can ask me about our recovery programs, apartments, or what to expect after your surgery.",
      error: 'Sorry, something went wrong. Please try again or contact us directly via WhatsApp.',
      thinking: 'Thinking...',
    },
    es: {
      title: 'Asistente de Recuperacion',
      subtitle: 'Preguntas sobre recuperación y pacientes internacionales',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      welcome: 'Hola! Soy el asistente de BCN Recovery Care. Como puedo ayudarte? Puedes preguntarme sobre nuestros programas de recuperacion, los apartamentos o que esperar despues de tu cirugia.',
      error: 'Lo sentimos, algo salio mal. Intentalo de nuevo o contactanos directamente por WhatsApp.',
      thinking: 'Un momento...',
    }
  };

  const T = STRINGS[pageLang];

const guideAnswers = [{"id": "medical", "questions": ["Is this a medical service?", "Do you diagnose or prescribe?", "Who is responsible for my care?"], "aliases": ["medical service", "medical care", "clinical care", "diagnose", "prescribe", "prescription", "doctor", "responsibility", "responsible", "who treats", "atencion medica", "clinica", "medico", "hospital"], "answer": "BRC provides recovery coordination, private accommodation and agreed support around the surgeon’s instructions. The independent surgeon and clinic assess suitability, obtain consent, perform surgery and manage medical follow-up. BRC does not diagnose, prescribe or change clinical instructions.", "sources": ["Main BRC FAQ: medical service", "Playbook: operating boundary"], "answerEs": "BRC coordina alojamiento, recuperación y apoyo práctico según las instrucciones del cirujano. El cirujano y la clínica independientes evalúan, operan y gestionan el seguimiento médico. BRC no diagnostica, prescribe ni cambia instrucciones clínicas."}, {"id": "apartments", "questions": ["Do you include accommodation?", "Where do I stay?", "Are the apartments private?", "Is there an elevator?"], "aliases": ["accommodation", "apartment", "apartments", "hotel", "where stay", "balcony", "lift", "elevator", "kitchen", "private room", "stay included", "lodging", "apartamento", "alojamiento", "habitacion", "donde alojarme"], "answer": "BRC can include a private, fully equipped recovery apartment in your agreed plan. The building has lift access and the apartments have private balconies. We confirm the apartment layout, access and suitability for your practical needs before booking. Accommodation and recovery services are itemised in your BRC quote.", "sources": ["Main BRC FAQ: accommodation", "Main BRC website: apartments", "Playbook: service proposals"], "answerEs": "Disponemos de apartamentos privados de recuperación en Barcelona. Confirmamos disponibilidad, distribución, accesibilidad y necesidades antes de reservar. No se presuponen cuidados clínicos permanentes ni servicios adicionales: se detallan en tu propuesta."}, {"id": "companion", "questions": ["Can a companion stay with me?", "Can I bring my partner?", "Can my husband stay?", "Can my wife stay?"], "aliases": ["companion", "partner stay", "bring partner", "husband", "wife", "friend stay", "family stay", "accompany", "accompanying", "boyfriend", "girlfriend", "acompanante", "familiar", "pareja", "visitas"], "answer": "In many cases a companion can stay, depending on the apartment layout and your recovery requirements. Tell us before booking so we can confirm space, arrangements and any extra cost. Whether you need an accompanying adult is decided as part of the surgeon’s protocol and your practical recovery plan.", "sources": ["Main BRC FAQ: companion", "Playbook: companion requirements"], "answerEs": "A menudo puede alojarse un acompañante, según el apartamento y tus necesidades. Comunícanoslo antes de reservar para confirmar distribución, disponibilidad y coste."}, {"id": "alone", "questions": ["Can I travel alone?", "Do I need someone with me?"], "aliases": ["travel alone", "come alone", "on my own", "by myself", "alone", "someone with me", "viajo solo", "viajo sola", "sin acompanante"], "answer": "Tell us early if you plan to travel alone. The surgeon’s instructions, your mobility and the support you need determine whether that is workable. We confirm the practical arrangements with you before booking; some procedures may require an accompanying adult.", "sources": ["Playbook: companion and booking readiness"], "answerEs": "Indica en el formulario si viajas sin acompañante. Confirmaremos el apoyo práctico y el alojamiento adecuados junto con las exigencias de la clínica. No se garantiza supervisión clínica las 24 horas."}, {"id": "lipedema", "questions": ["Do you support lipedema recovery?", "How much is lipedema surgery?", "How long do I stay for lipedema?"], "aliases": ["lipedema", "lipoedema", "lipodema", "lipedema recovery", "lipedema surgery", "lipedema", "lipodema"], "answer": "Our lipedema pathway combines specialist consultation with an individually planned recovery stay. The indicative clinic fee is €8,000–€12,000 and the current recovery-planning range is 8–15 days. BRC coordination, accommodation, recovery services and travel are additional unless expressly included. The surgeon confirms areas, any stages, support requirements and your return date.", "sources": ["Main BRC FAQ: lipedema support", "Public pricing update: 30 September 2026"], "answerEs": "Para lipedema: honorarios orientativos de clínica de 8.000–12.000 € y planificación de recuperación de 8–15 días. El cirujano confirma zonas, etapas, estancia y fecha segura de viaje. Coordinación, alojamiento, recuperación y transporte se presupuestan aparte salvo inclusión expresa."}, {"id": "deepplane", "questions": ["How much is a deep plane facelift?", "What is the recovery period for a facelift?", "Do you offer deep plane lifting?"], "aliases": ["deep plane", "deepplane", "facelift", "face lift", "deep lifting", "lifting facial", "face surgery", "neck lift", "lifting facial", "lifting profundo", "deep plane"], "answer": "For the deep plane facelift pathway, the indicative clinic fee is €10,000–€25,000 and recovery planning is 5–15 days. Your English-speaking surgeon confirms the exact scope, any additional procedures, reviews and safe travel date. BRC accommodation, coordination, recovery services and travel are quoted separately unless included in writing.", "sources": ["Public pricing update: 30 September 2026", "Playbook: direct English-speaking consultation"], "answerEs": "Para lifting deep plane: honorarios orientativos de clínica de 10.000–25.000 € y planificación de recuperación de 5–15 días. El cirujano confirma el alcance, revisiones y fecha segura de viaje. Coordinación, alojamiento y recuperación se presupuestan aparte salvo inclusión expresa."}, {"id": "body", "questions": ["How much is body contouring?", "How long is body-contouring recovery?"], "aliases": ["body contour", "bodycontour", "contouring", "body lift", "abdominoplasty", "tummy tuck", "liposuction", "body surgery", "contorno corporal", "abdominoplastia", "liposuccion"], "answer": "The body-contouring planning range is €10,000–€15,000 for clinic fees and 5–15 days for local recovery planning. The surgeon must define the operation, areas and any stages; this is not a whole-body or combined-surgery promise. BRC accommodation, recovery, coordination and travel are additional unless your quote includes them. The individual recovery and return date follow the surgeon’s instructions.", "sources": ["Public pricing update: 30 September 2026", "Playbook: procedure scope and exclusions"], "answerEs": "Para contorno corporal: honorarios orientativos de clínica de 10.000–15.000 € y planificación de recuperación de 5–15 días. El cirujano define intervención, zonas y etapas. Coordinación, alojamiento, recuperación y viajes son adicionales salvo inclusión expresa."}, {"id": "procedures", "questions": ["What procedures do you coordinate?", "Which surgeries can I ask about?"], "aliases": ["procedures", "procedure options", "which surgery", "what surgery", "what surgeries", "operations offered", "surgical options", "breast surgery", "rhinoplasty", "intervenciones", "operaciones", "cirugias"], "answer": "The UK offer currently focuses on lipedema surgery, deep plane facelift and body contouring. You can ask BRC about another procedure, but availability requires confirmation of the appropriate surgeon, clinic and recovery arrangements. Only the surgeon can decide suitability after consultation.", "sources": ["Playbook: three focal pathways"], "answerEs": "La propuesta internacional se centra en lipedema, lifting deep plane y contorno corporal. Puedes consultar otras intervenciones; la disponibilidad del cirujano, clínica y recuperación debe confirmarse. La idoneidad la decide el cirujano."}, {"id": "recovery", "questions": ["What does recovery support include?", "What care sessions do you provide?", "Do you offer lymphatic drainage?", "Is nursing included?"], "aliases": ["recovery support", "care sessions", "treatment sessions", "lymphatic", "drainage", "indiba", "compression", "mobility", "hygiene", "nursing", "wound care", "post op care", "postoperative care", "aftercare", "what included", "recovery program", "recuperacion", "cuidados", "drenaje", "linfatico", "compresion", "enfermeria"], "answer": "Your BRC proposal specifies the apartment, recovery sessions, practical support and check-ins you have selected. Depending on the agreed service and the clinic’s instructions, support may include mobility, hygiene, comfort and compression routines, or named recovery treatments. Session frequency and providers are confirmed for your case. This does not imply nursing or 24-hour clinical care; medical care stays with the clinic.", "sources": ["Main BRC website: recovery programs", "Main BRC pricing: support descriptions", "Playbook: named providers and service scope"], "answerEs": "La propuesta especifica alojamiento, sesiones y apoyo práctico contratados. Según el servicio acordado y las instrucciones de la clínica, puede incluir movilidad, higiene, comodidad, compresión o tratamientos concretos. Se confirma frecuencia y profesional para cada caso. No implica enfermería ni atención clínica las 24 horas."}, {"id": "booking", "questions": ["How do I book?", "How do I get started?", "Can I speak to someone?", "How do I arrange a welcome call?"], "aliases": ["book", "booking", "get started", "start process", "welcome call", "talk to someone", "speak to someone", "first contact", "enquiry form", "intake form", "appointment", "form", "request call", "reservar", "reserva", "como funciona", "como empezar", "formulario", "llamada"], "answer": "You can start with WhatsApp on +34 618 254 217. Complete the private enquiry form before the free 20–30 minute welcome call with Yaron and Susana. Yaron reviews your form within one business day. A suitable enquiry then moves to an online consultation with an English-speaking surgeon, followed by separate clinic and BRC proposals. Submitting a form does not guarantee clinical acceptance.", "sources": ["Main BRC FAQ: booking", "Playbook: enquiry and joint welcome call"], "answerEs": "Empieza por WhatsApp +34 618 254 217 y completa el formulario privado antes de la llamada gratuita de 20–30 minutos con Yaron y Susana. Yaron revisa la solicitud en un día laborable. Después puede organizarse una consulta online con un cirujano que habla inglés y propuestas separadas de clínica y BRC. La aceptación clínica requiere valoración."}, {"id": "payments", "questions": ["How do payments work?", "When do I pay the deposit?", "Who invoices the surgery?"], "aliases": ["pay", "payment", "payments", "deposit", "balance", "invoice", "billing", "installment", "instalment", "charge", "money", "coordination fee", "pago", "pagos", "deposito", "factura"], "answer": "The clinic charges consultation and surgery directly under its own terms. BRC quotes coordination, accommodation and recovery separately. Coordination is paid 50% after surgeon approval and your instruction to proceed, and 50% when the surgery date is fixed. Accommodation and recovery are paid 50% on reservation and 50% on arrival in Barcelona. You receive the amounts, inclusions and cancellation conditions in writing before payment.", "sources": ["Playbook: agreed payment milestones"], "answerEs": "La clínica factura la cirugía según sus propias condiciones. La coordinación BRC se paga en dos hitos del 50%: tras la aceptación del cirujano y tu instrucción de continuar, y al fijar fecha. Para alojamiento y recuperación: 50% al reservar y 50% al llegar. Confirma conceptos e importes en la propuesta escrita."}, {"id": "price", "questions": ["How much does it cost?", "Are you cheaper than UK clinics?", "Is everything included?", "What is the total package price?"], "aliases": ["price", "cost", "budget", "cheaper", "saving", "compare", "quote", "quotation", "all inclusive", "all-inclusive", "total package", "package price", "daily rate", "day rate", "accommodation price", "precio", "precios", "coste", "presupuesto"], "answer": "Indicative clinic fees are €8,000–€12,000 for lipedema, €10,000–€25,000 for deep plane facelift, and €10,000–€15,000 for body contouring. These are not total journey prices. We provide an itemised quote for BRC coordination, accommodation, recovery and agreed extras after discussing your needs. Flights, consultation, transfers and other items are included only if the relevant quote says so. We do not guarantee a fixed saving against UK prices.", "sources": ["Public pricing update: 30 September 2026", "Playbook: separate itemised quotations"], "answerEs": "Los rangos de clínica son: lipedema 8.000–12.000 €, lifting deep plane 10.000–25.000 € y contorno corporal 10.000–15.000 €. No son precios totales. BRC prepara una propuesta personalizada para coordinación, alojamiento y recuperación, con inclusiones y exclusiones claras."}, {"id": "travel", "questions": ["When can I fly home?", "When should I arrive?", "How long should I stay?"], "aliases": ["fly", "flight", "travel", "return home", "return date", "fit to travel", "arrival", "arrive", "how long stay", "minimum stay", "how many days", "recovery time", "recovery period", "vuelo", "volar", "viajar", "llegada", "aeropuerto"], "answer": "BRC plans arrival two days before surgery. Current local recovery-planning ranges are 8–15 days for lipedema and 5–15 days for deep plane facelift or body contouring. These are not a clinical clearance or full recovery timeline. The surgeon confirms your minimum stay, review appointments and fitness to travel, so your actual dates may differ.", "sources": ["Playbook: arrival and clinic travel decision", "Public planning update: 30 September 2026"], "answerEs": "Se planifica llegar a Barcelona dos días antes de la operación. La estancia y la fecha de regreso dependen de la valoración, revisiones e instrucciones del cirujano. Los plazos orientativos no autorizan a volar. Los traslados se acuerdan y presupuestan."}, {"id": "consultation", "questions": ["Can I consult online?", "Does the surgeon speak English?", "Who joins the call?"], "aliases": ["consultation", "consult online", "online consultation", "english", "language", "interpreter", "surgeon speaks", "yaron", "susana", "video call", "consulta", "cirujano", "ingles", "idioma"], "answer": "Yaron and Susana both join your free BRC welcome call. We work with surgeons who can consult directly in English; their clinical consultation is online initially, with any further review arranged by the clinic. Consultation fees are confirmed by the clinic. If Yaron is unavailable, Susana handles written messages and calls are scheduled when he can join.", "sources": ["Playbook: joint calls and English-speaking surgeons"], "answerEs": "Primero hay una llamada de bienvenida gratuita con Yaron y Susana. La consulta clínica inicial puede ser online y se organiza con un cirujano que habla inglés. El cirujano decide idoneidad, pruebas y plan quirúrgico. Confirma por escrito el coste de la consulta y sus condiciones."}, {"id": "privacy", "questions": ["Where do I send my photos?", "Can I upload medical records?", "Is my information private?"], "aliases": ["privacy", "private data", "data", "photos", "photographs", "pictures", "medical records", "health record", "medical history", "upload", "gdpr", "confidential", "share information", "privacidad", "datos", "fotos", "documentos"], "answer": "The enquiry form collects general contact and practical information; do not upload medical records or intimate photographs there or into this chat. The clinic confirms its approved protected route for clinical information before you send it. BRC keeps the minimum operational information needed for coordination and records your authority before sharing. Chat questions stay in this browser and are not stored by this guide.", "sources": ["Playbook: minimum information and clinic-controlled transfer"], "answerEs": "El formulario inicial recoge solo lo necesario para valorar tu solicitud. No envíes fotografías íntimas ni documentación clínica sensible por este chat. El equipo confirma el canal adecuado, permisos y acceso antes de intercambiar documentación clínica."}, {"id": "refunds", "questions": ["What if I cancel?", "Can I change the dates?", "What is the refund policy?"], "aliases": ["cancel", "cancellation", "refund", "change date", "withdraw", "postpone", "reschedule", "unfavourable tests", "unfavorable tests", "failed tests", "cancelacion", "cancelar", "reembolso", "devolucion"], "answer": "Clinic and BRC bookings have separate cancellation and refund conditions. We provide the applicable written terms before you pay. The exact reservation refund calculation is still being finalised, so the guide cannot promise a fixed percentage. Yaron and Susana handle changes and exceptions together; clinic decisions and clinic charges follow the clinic’s terms.", "sources": ["Playbook: refund terms still to clarify"], "answerEs": "Los detalles de cancelación y devolución deben quedar definidos por escrito antes de pagar. Las notas contemplan una devolución parcial hasta 15 días antes y devolución ante pruebas desfavorables, pero importes, conceptos y fechas de referencia están pendientes de concretar. La clínica aplica sus propias condiciones."}, {"id": "extension", "questions": ["What if I need extra nights?", "What happens if I am readmitted?"], "aliases": ["extra nights", "longer stay", "extend stay", "extension", "readmission", "readmitted", "re admitted", "more nights", "noches extra", "ampliar estancia", "estancia adicional", "reingreso"], "answer": "Extra accommodation nights and extra recovery services are charged according to the agreed daily quote and availability. BRC provides additional administrative help for an extended stay or clinic readmission without another coordination fee. Medical assessment, admission and clinical charges remain with the clinic.", "sources": ["Playbook: extended-stay and readmission arrangements"], "answerEs": "Las noches o servicios adicionales se facturan por día según el presupuesto acordado. El apoyo administrativo para una estancia ampliada o reingreso no tiene coste adicional; alojamiento, tratamientos y gastos clínicos se gestionan por separado. La clínica decide el manejo médico."}, {"id": "credentials", "questions": ["How do you choose surgeons?", "Can I check the surgeon credentials?"], "aliases": ["credentials", "registration", "registered", "qualifications", "qualified", "select surgeon", "choose surgeon", "verify surgeon", "surgeon experience", "insurance", "credenciales", "experiencia", "seguro", "colegiacion"], "answer": "You receive the surgeon’s identity and clinic details before deciding. BRC’s partner process gathers professional registration, specialty, relevant experience, clinic setting, professional insurance information and follow-up arrangements. Ask for the evidence and discuss risks directly with the surgeon. The guide does not confirm a particular provider’s credentials or promise insured outcomes.", "sources": ["Main BRC FAQ: clinician relationship", "Playbook: partner evidence"], "answerEs": "Recibes la identidad del cirujano y los datos de la clínica antes de decidir. Solicita evidencia de registro profesional, especialidad, experiencia, seguro profesional y seguimiento. Este asistente no confirma credenciales ni garantiza cobertura de un proveedor concreto."}, {"id": "contact", "questions": ["What is your WhatsApp number?", "How do I contact you?", "How quickly do you reply?"], "aliases": ["whatsapp", "phone", "telephone", "contact", "email", "response time", "reply", "respond", "how quickly", "how soon", "hours", "whatsapp", "telefono", "contacto", "correo", "respuesta"], "answer": "Message BRC on WhatsApp at +34 618 254 217 or email info@bcnrecoverycare.es. General enquiries are reviewed within one business day. The welcome call follows the mandatory form. BRC contact is for coordination; for clinical concerns use your clinic’s urgent contact, and for an emergency in Spain call 112.", "sources": ["Main BRC website: enquiry response", "Playbook: response target", "Current contact instruction"], "answerEs": "WhatsApp: +34 618 254 217. Email: info@bcnrecoverycare.es. Revisamos las consultas generales en un día laborable. Para preocupaciones clínicas, contacta con tu clínica; en una emergencia en España llama al 112."}];
    const normalise = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const stopWords = new Set(['a','an','the','is','are','do','does','can','i','my','me','you','your','we','of','in','on','to','for','with','and','it','this','that','please','would','like','what','how','will']);
    const tokens = s => normalise(s).split(' ').filter(w=>w.length>2&&!stopWords.has(w)).map(w=>w.length>4&&w.endsWith('s')?w.slice(0,-1):w);
    const distance = (a,b) => {let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];};
    const phraseHit = (q,phrase) => (' '+normalise(q)+' ').includes(' '+normalise(phrase)+' ');
    const urgentTerms=['emergency','severe pain','bleeding','cannot breathe','can t breathe','chest pain','fever','infection','something feels wrong','something is wrong','worried after surgery','not feeling well'];
    const urgentAnswer='If something feels wrong after surgery, contact the clinic promptly using its urgent route. BRC pauses affected support, records the facts and helps you contact the clinical team. For an emergency in Spain call 112; in the UK call 999. This guide cannot assess symptoms or decide treatment.';
    const answerGuideEnglish = q => {
      const nq=normalise(q), qt=tokens(q);
      if(urgentTerms.some(t=>phraseHit(nq,t)))return urgentAnswer;
      if(/\b(should i|can i|do i need|am i)\b/.test(nq)&&/\b(take|stop|dose|diagnosis|suitable|eligible|candidate|operated)\b/.test(nq))return 'A surgeon or qualified clinician must answer questions about suitability, medicines or changing treatment. BRC can arrange the direct consultation and practical support. This guide cannot make a clinical decision.';
      if(/^(hi|hello|hey|good morning|good afternoon)$/.test(nq))return 'Hello. Ask me about apartments, a companion, recovery support, clinic-fee ranges, booking or payments. You can also WhatsApp BRC on +34 618 254 217.';
      if(/^(thanks|thank you|thank you very much)$/.test(nq))return 'You’re welcome. For a personal enquiry, WhatsApp +34 618 254 217 and complete the private form before your welcome call.';
      const rank=guideAnswers.map(item=>{
        let score=0;
        if(item.questions.some(x=>normalise(x)===nq))score+=100;
        for(const alias of item.aliases){if(phraseHit(nq,alias))score+=tokens(alias).length>1?8:4;}
        let similarity=0;
        for(const text of [...item.questions,...item.aliases]){const tt=tokens(text);if(!tt.length)continue;const matches=tt.filter(t=>qt.some(w=>w===t||(w.length>=5&&t.length>=5&&distance(w,t)<=1))).length;similarity=Math.max(similarity,matches/Math.max(tt.length,qt.length||1));}
        return {item,score:score+similarity*3};
      }).sort((a,b)=>b.score-a.score);
      // A named pathway takes priority so a procedure's price or stay is answered together.
      const paths=rank.filter(r=>['lipedema','deepplane','body'].includes(r.item.id)&&r.score>=4);
      if(paths.length)return paths.slice(0,3).map(r=>r.item.answer).join('\n\n');
      if(rank[0].score>=3.8||(rank[0].score>=2&&rank[0].score>rank[1].score+.5))return rank[0].item.answer;
      return 'I do not have a confirmed BRC answer to that question. I can help with accommodation, companions, recovery support, booking, clinic-fee ranges, payments, travel and privacy. For a specific request, message +34 618 254 217 or complete the private form. I cannot answer general questions or provide medical advice.';
    };
    
    function answerGuide(q) {
      const nq=normalise(q);
      if(/dolor de pecho|no puedo respirar|sangrado|hemorragia|fiebre|infeccion|emergencia/.test(nq)) return pageLang==='es'?'Contacta con la vía urgente de tu clínica. En una emergencia en España llama al 112; en Reino Unido, al 999. Este chat no evalúa síntomas.':urgentAnswer;
      if(/puedo|debo|soy|necesito/.test(nq)&&/tomar|dejar|dosis|medicamento|apto|apta|candidato|candidata|operarme/.test(nq)) return pageLang==='es'?'La idoneidad quirúrgica, medicación y cambios de tratamiento los decide un cirujano o profesional clínico. BRC puede coordinar la consulta.':'A surgeon or qualified clinician must answer suitability, medicine and treatment questions. BRC can arrange a consultation.';
      let answer=answerGuideEnglish(q);
      const pathway=guideAnswers.find(x=>['lipedema','deepplane','body'].includes(x.id)&&answer.includes(x.answer));
      if(pathway&&/how.*work|how.*start|coming|from the uk|process|como.*funciona|como.*empez|vengo|proceso/.test(nq)) {
        answer+='\n\n'+guideAnswers.find(x=>x.id==='booking').answer+'\n\nInternational pathway: https://bcnrecoverycare.es/uk/';
      }
      if(pageLang==='es') {
        for(const item of guideAnswers) answer=answer.replaceAll(item.answer,item.answerEs);
        if(answer===urgentAnswer) return 'Contacta cuanto antes con la vía urgente de tu clínica. BRC ayuda a contactar y coordinar, pero no evalúa síntomas. En una emergencia en España llama al 112; en Reino Unido, al 999.';
        if(answer.startsWith('A surgeon or qualified')) return 'La idoneidad quirúrgica, medicación y cambios de tratamiento los decide un cirujano o profesional clínico. BRC puede coordinar la consulta y apoyo práctico.';
        if(/^(hi|hello|hey|hola|buenos dias|buenas tardes)$/.test(nq)) return 'Hola. Puedes preguntar sobre apartamentos, acompañantes, recuperación, intervenciones, reservas y pagos. WhatsApp: +34 618 254 217.';
        if(/^(thanks|thank you|gracias|muchas gracias)$/.test(nq)) return 'De nada. Para tu caso, escribe al WhatsApp +34 618 254 217.';
        if(answer.startsWith('I do not have')) return 'No tengo una respuesta confirmada para esa pregunta. Contacta con BRC en WhatsApp +34 618 254 217 o info@bcnrecoverycare.es. Para la propuesta internacional: https://bcnrecoverycare.es/uk/';
        answer=answer.replace('International pathway:', 'Propuesta internacional:');
      }
      return answer;
    }

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
    @media (max-width: 600px) {
      #brc-chat-window {
        right: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        height: 70vh !important;
        max-height: 70vh !important;
        border-radius: 16px 16px 0 0 !important;
      }
      #brc-chat-btn {
        right: 24px !important;
        bottom: 90px !important;
      }
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

    window.setTimeout(function() {
      try {
        const answer=answerGuide(text);
        thinkingMsg.remove();
        appendMessage(answer,'bot');
      } catch(error) {
        thinkingMsg.remove();
        appendMessage(pageLang==='es'?'Contacta con BRC por WhatsApp +34 618 254 217.':'Contact BRC on WhatsApp +34 618 254 217.','bot');
      } finally {
        isWaiting=false;
        sendBtn.disabled=false;
        inputEl.focus();
      }
    },120);
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

