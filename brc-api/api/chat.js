const OpenAI = require('openai');

const KNOWLEDGE_BASE = `
BCN Recovery Care is a premium post-operative and aesthetic recovery service based in L'Hospitalet de Llobregat, Barcelona, Spain.

ABOUT SUSANA:
Susana is the founder with 15+ years of nursing and post-operative care experience. She trained as a registered nurse in Spain and specialised in aesthetic and reconstructive surgery recovery. She speaks Spanish, Catalan, and English fluently. Her philosophy: recovery is not just physical — emotional support and a calm environment matter as much as medical monitoring.

RECOVERY APARTMENTS:
- Private rooms with adjustable hospital-grade beds
- Private bathroom with walk-in shower and non-slip flooring
- 24/7 nursing supervision and on-call care
- Daily wound dressing changes and medication management
- Compression garment fitting and management
- Nutritious recovery-adapted meals
- Free Wi-Fi, TV, daily housekeeping
- 5 minutes by taxi from major Barcelona clinics
- 15 minutes from El Prat airport

APARTMENT TYPES:
- Standard Recovery Room: single procedure recoveries (rhinoplasty, blepharoplasty, minor lipo)
- Premium Recovery Suite: complex recoveries (abdominoplasty, breast surgery, combined procedures), includes recliner chair
- Family Companion Suite: patient + companion, private terrace

PROGRAMS:
- Basic Recovery (3-4 nights): minor procedures, 1-2 care sessions
- Surgical Recovery (7-9 nights): most popular, breast/rhinoplasty/liposuction, 3-5 care sessions
- Intensive/Premium (10-14 nights): combined surgeries, 6-10 care sessions
- Lipedema Recovery (10-21 days): specialised, higher frequency care

RECOVERY TYPES SUPPORTED:
Rhinoplasty, Breast Augmentation, Breast Reduction/Mastopexy, Abdominoplasty, Liposuction, Brazilian Butt Lift (BBL), Facelift, Blepharoplasty, Combined procedures, Lipedema surgery.

SERVICES INCLUDE:
Vital signs monitoring, wound dressing changes, drain management, lymphatic drainage massage, compression garment management, pain coordination, nutrition, mobility assistance, airport transfer coordination, family updates.

FAQ:
- No referral needed, can book directly
- Family companion can stay in Companion Suite
- Languages: Spanish, Catalan, English
- Not a hospital: nursing-level care, serious complications transferred to hospital
- Visitors allowed with restrictions in first 48h
- Lymphatic drainage included in some packages or added individually
- Book at least 2 weeks before procedure

CONTACT: bcnrecoverycare.es | L'Hospitalet de Llobregat, Barcelona | WhatsApp available
`;

module.exports = async function handler(req, res) {
  // Allow requests from your website
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, language } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for BCN Recovery Care, a post-operative recovery service in Barcelona. Answer questions warmly and professionally based only on the information below. If the answer is not in the information, recommend contacting the team directly via the website or WhatsApp. Respond in the same language the user writes in. If unclear, respond in English.\n\nKNOWLEDGE BASE:\n${KNOWLEDGE_BASE}`
        },
        {
          role: 'user',
          content: question
        }
      ]
    });

    return res.status(200).json({
      answer: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
};
