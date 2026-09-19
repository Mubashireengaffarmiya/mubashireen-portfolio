import { PROFILE } from '../data/profile';
import { AIResponse } from '../types';

export const EXACT_GREETING = "Hi, I am Mubashireen's Personal AI Assistant. Ask me about Mubashireen.";

export const MUBA_VOICE_SYSTEM_PROMPT = `
You are MUBA AI, verbally introducing yourself as "Mubashireen's Personal AI Assistant".
You are a true voice-only personal AI assistant.

CRITICAL INSTRUCTIONS:
1. Keep ALL responses short, natural, and conversational: 1 to 3 spoken sentences.
2. For questions about MUBASHIREEN:
   - Strictly use the verified facts below.
   - NEVER invent or hallucinate any jobs, internships, companies, awards, or contact details.
   - If information is not in the portfolio, say: "I don't have that information about Mubashireen yet."
3. For GENERAL KNOWLEDGE questions (e.g. Science, Programming, Technology, Math, History, Geography, Concept explanations):
   - You MUST answer general questions accurately, clearly, and concisely in 1-3 spoken sentences.
   - NEVER say "I only know about Mubashireen." You are an intelligent general-purpose AI assistant as well.
4. For COMBINED questions (e.g., "What is OCR and how is it used in her SIH project?"):
   - Explain the concept and link it to SMART-LM.

VERIFIED FACTS ABOUT MUBASHIREEN:
- Name: ${PROFILE.name}
- Role: ${PROFILE.role}
- Degree: ${PROFILE.degree}
- University: ${PROFILE.university}, Bengaluru, India
- Semester: ${PROFILE.semester}
- Expected Graduation: ${PROFILE.graduationYear}
- Location: ${PROFILE.location}
- GitHub: ${PROFILE.github} (Username: ${PROFILE.githubUsername})
- Verified Projects: SIH_PROJECT (SMART-LM / SIH26034), AI-Complaint-Management-System, 2D-Graphics-Project, 2D-Graphics-editor, PB_WAD.
- Flagship SIH Project (SIH26034): SMART-LM: Software System to check compliance of Packaged Commodities under Legal Metrology Rules, 2011. Uses OpenCV, PaddleOCR/Tesseract, and FastAPI to support inspector decisions.
- Verified Certificates:
  • Data Visualization with Python (IBM SkillsBuild, Dec 17, 2025)
  • Data Analysis with Python (IBM SkillsBuild, Dec 14, 2025)
  • Python 101 for Data Science (IBM SkillsBuild, Dec 14, 2025)
  • Ignite Full Program (42 Hours, Wadhwani Foundation, June 30, 2026)
- Skills: Python, C, C++, Java, React, FastAPI, MySQL, OpenCV, Data Visualization.
`;

// Comprehensive offline general knowledge & portfolio dictionary
const OFFLINE_KNOWLEDGE: Record<string, string> = {
  // --- General Programming & Technology ---
  'python': "Python is a high-level, readable programming language widely used in data science, artificial intelligence, automation, and backend development.",
  'java': "Java is a class-based, object-oriented programming language designed for platform independence via the Java Virtual Machine.",
  'react': "React is a popular JavaScript library created by Meta for building dynamic, reusable user interfaces using a component architecture and virtual DOM.",
  'javascript': "JavaScript is the core programming language of the web, enabling interactive web pages and modern full-stack web applications.",
  'typescript': "TypeScript is a strongly typed superset of JavaScript developed by Microsoft that adds static typing and compile-time error checking.",
  'c++': "C++ is a high-performance, compiled programming language offering low-level memory manipulation and object-oriented capabilities, ideal for systems and graphics.",
  'artificial intelligence': "Artificial Intelligence is the field of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence.",
  'ai': "Artificial Intelligence refers to computer systems engineered to simulate human intelligence, including learning, reasoning, and problem-solving.",
  'machine learning': "Machine Learning is a branch of AI where algorithms learn patterns from data to make predictions or decisions without explicit rule programming.",
  'deep learning': "Deep Learning is a subset of machine learning based on multi-layered artificial neural networks that excel at image, audio, and language recognition.",
  'ocr': "OCR, or Optical Character Recognition, is computer vision technology that reads text from images or scanned physical documents and converts it into digital text.",
  'fastapi': "FastAPI is a modern, high-performance web framework for building REST APIs with Python 3.8+ based on standard Python type hints.",
  'opencv': "OpenCV is an open-source computer vision library containing optimized algorithms for image processing, filtering, and real-time visual analysis.",
  'rest': "A REST API is an architectural style for network communications using standard HTTP methods like GET and POST for stateless client-server data exchange.",
  'database': "A database is an organized collection of structured data stored electronically and managed by a Database Management System like MySQL or PostgreSQL.",
  'sql': "SQL, or Structured Query Language, is the domain-specific language used to store, manipulate, and query relational databases.",
  'blockchain': "Blockchain is a decentralized, distributed digital ledger that securely records transactions across multiple computers in an immutable chain.",
  'cpu': "A CPU, or Central Processing Unit, is the primary processor of a computer that executes program instructions and coordinates hardware operations.",
  'ram': "RAM is fast, volatile computer memory used to store active data temporarily while the computer is running, unlike permanent ROM or SSD storage.",
  'rom': "ROM, or Read-Only Memory, is non-volatile memory that permanently stores essential firmware instructions required to boot a computer system.",
  'recursion': "Recursion is a programming technique where a function solves a problem by calling itself with smaller inputs until reaching a base termination condition.",
  'internet': "The internet is a global network of interconnected computers communicating via standardized protocols like TCP/IP to share information.",
  'cloud': "Cloud computing is the on-demand delivery of computing services including storage, databases, servers, and software over the internet.",
  'operating system': "An operating system is system software that manages computer hardware, system resources, and provides common services for software applications.",

  // --- General Science & Mathematics ---
  'physics': "Physics is the fundamental science that studies matter, energy, motion, and the universal laws governing space and time.",
  'chemistry': "Chemistry is the scientific discipline that investigates the composition, structure, properties, and reactions of substances and matter.",
  'mathematics': "Mathematics is the science of numbers, quantities, structures, patterns, and logical reasoning.",
  'math': "Mathematics is the science of numbers, quantities, structures, patterns, and logical reasoning.",
  'gravity': "Gravity is the fundamental force of attraction that pulls objects with mass toward one another, keeping planets in orbit around stars.",
  'space': "Space is the boundless three-dimensional expanse containing all celestial bodies, stars, galaxies, dark matter, and cosmic radiation.",
  'climate change': "Climate change refers to long-term shifts in global temperatures and weather patterns, predominantly driven by human fossil fuel emissions.",
  'telephone': "Alexander Graham Bell is widely credited with patenting the first practical telephone in 1876.",
  'japan': "The capital of Japan is Tokyo, a bustling global hub of technology, culture, and commerce.",
  'world war': "World War II was a devastating global conflict lasting from 1939 to 1945, fought between the Allied and Axis powers."
};

/**
 * Voice-first local query engine ensuring 100% reliable, zero-latency spoken responses.
 */
export function generateVoiceResponse(query: string): AIResponse {
  const q = query.toLowerCase().trim();

  // 1. Voice Navigation & Action Commands
  if (q.includes('certificate') || q.includes('certification') || q.includes('credentials')) {
    if (q.includes('show') || q.includes('take') || q.includes('open') || q.includes('go to')) {
      return {
        spokenText: "Sure, I'll show you her certificates.",
        voiceCommand: 'navigate_certificates'
      };
    }
    return {
      spokenText: "Mubashireen has four verified certificates: IBM Data Visualization, IBM Data Analysis, IBM Python 101, and the Wadhwani Foundation Ignite Program.",
      voiceCommand: 'navigate_certificates'
    };
  }

  if (q.includes('sih') || q.includes('smart-lm') || q.includes('metrology') || q.includes('main project') || q.includes('flagship')) {
    if (q.includes('show') || q.includes('take') || q.includes('open') || q.includes('go to')) {
      return {
        spokenText: "Sure, I'll take you to the SIH project.",
        voiceCommand: 'navigate_sih'
      };
    }
    return {
      spokenText: "Her flagship project is SMART-LM for Smart India Hackathon 2026. It is an AI and OCR system that screens packaged commodity labels for mandatory legal compliance using OpenCV, PaddleOCR, and FastAPI.",
      voiceCommand: 'navigate_sih'
    };
  }

  if (q.includes('github') || q.includes('repo') || q.includes('code')) {
    if (q.includes('open') || q.includes('show') || q.includes('visit')) {
      return {
        spokenText: "Sure, opening her GitHub profile.",
        voiceCommand: 'navigate_github'
      };
    }
    return {
      spokenText: "Mubashireen's GitHub username is Mubashireengaffarmiya, featuring public repositories in Python, C++, and modern web systems.",
      voiceCommand: 'navigate_github'
    };
  }

  if (q.includes('project') || q.includes('built')) {
    if (q.includes('show') || q.includes('take') || q.includes('open')) {
      return {
        spokenText: "Here are her projects.",
        voiceCommand: 'navigate_projects'
      };
    }
    return {
      spokenText: "Mubashireen has built SMART-LM for SIH 2026, an AI Complaint Management System, a 2D Graphics Editor in C++, and open-source algorithmic repositories.",
      voiceCommand: 'navigate_projects'
    };
  }

  if (q.includes('tour') || q.includes('guide me')) {
    return {
      spokenText: "Welcome! Let me give you a quick tour of Mubashireen's portfolio.",
      voiceCommand: 'tour'
    };
  }

  if (q.includes('contact') || q.includes('reach') || q.includes('hire') || q.includes('message')) {
    return {
      spokenText: "Taking you to the contact section to connect with Mubashireen.",
      voiceCommand: 'navigate_contact'
    };
  }

  // 2. Questions about Mubashireen
  if (q.includes('who is') || q.includes('about mubashireen') || (q.includes('mubashireen') && (q.includes('who') || q.includes('tell me')))) {
    return {
      spokenText: "Mubashireen is a Computer Science Engineering student at REVA University in Bengaluru. She is currently in her third semester and is expected to graduate in 2029."
    };
  }

  if (q.includes('education') || q.includes('study') || q.includes('university') || q.includes('college') || q.includes('degree') || q.includes('semester')) {
    return {
      spokenText: "She is pursuing her B.Tech in Computer Science and Engineering at REVA University in Bengaluru, India, currently in her third semester with expected graduation in 2029."
    };
  }

  if (q.includes('skill') || q.includes('technolog') || q.includes('stack')) {
    return {
      spokenText: "Mubashireen works with Python, C++, Java, React, FastAPI, MySQL, OpenCV, and data visualization tools like Pandas and Matplotlib."
    };
  }

  // 3. Combined Questions (General Concept + Project)
  if (q.includes('ocr') && (q.includes('sih') || q.includes('project') || q.includes('use') || q.includes('why'))) {
    return {
      spokenText: "In SMART-LM, OCR extracts printed packaging declarations like MRP and net quantity from product photos so the rule engine can automatically evaluate compliance."
    };
  }

  if (q.includes('fastapi') && (q.includes('sih') || q.includes('project'))) {
    return {
      spokenText: "FastAPI serves as the backend in SMART-LM, handling image uploads, orchestrating the OCR pipeline asynchronously, and returning compliance results to the React frontend."
    };
  }

  // 4. Broad General Knowledge Lookup
  for (const [key, answer] of Object.entries(OFFLINE_KNOWLEDGE)) {
    if (q.includes(key)) {
      return { spokenText: answer };
    }
  }

  // 5. Default Fallback
  return {
    spokenText: "I don't have that specific information about Mubashireen yet. You can ask me about her education, projects, skills, certificates, or any general technical topic."
  };
}

/**
 * Queries Gemini or OpenAI if configured, otherwise returns local voice response.
 */
export async function queryAIEngine(userPrompt: string): Promise<AIResponse> {
  const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const openaiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY;

  // 1. Try Gemini
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${MUBA_VOICE_SYSTEM_PROMPT}\n\nVisitor: ${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 120
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const localCheck = generateVoiceResponse(userPrompt);
          return {
            spokenText: text.trim(),
            voiceCommand: localCheck.voiceCommand
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  // 2. Try OpenAI
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: MUBA_VOICE_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 120
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const localCheck = generateVoiceResponse(userPrompt);
          return {
            spokenText: text.trim(),
            voiceCommand: localCheck.voiceCommand
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  // 3. Fallback to Local Knowledge
  await new Promise(res => setTimeout(res, 150));
  return generateVoiceResponse(userPrompt);
}
