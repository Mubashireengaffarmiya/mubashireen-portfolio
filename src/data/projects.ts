import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sih-smart-lm',
    title: 'SMART-LM: Legal Metrology Compliance Inspection System',
    subtitle: 'AI/OCR-Assisted Packaged Commodities Regulatory Screening (SIH26034)',
    description: 'A digital inspection-assistance system for Legal Metrology officers that analyzes packaged commodity label images and automatically screens whether mandatory statutory declarations are present and legible under the Legal Metrology (Packaged Commodities) Rules, 2011.',
    problemSolved: 'Manual inspection of packaging declarations (MRP, net quantity, manufacturer/packer/importer details, dates, consumer care) is labor-intensive, slow, and prone to human oversight across thousands of retail items. SMART-LM assists officers with fast, consistent preliminary screening.',
    category: 'AI & ML',
    technologies: ['Python', 'TypeScript', 'FastAPI', 'React', 'Tailwind CSS', 'Vite', 'OpenCV', 'PaddleOCR', 'Tesseract 5', 'NumPy', 'Pillow'],
    features: [
      'Accepts product label images and assesses visual quality before recognition',
      'Image preprocessing with OpenCV (adaptive thresholding, deskewing, noise reduction)',
      'Dual-engine OCR support (PaddleOCR & Tesseract 5 with pytesseract)',
      'Automated extraction of MRP, net quantity, manufacturer, dates, country of origin, and consumer care',
      'Configurable Legal Metrology Rules Engine comparing extracted text against statutory requirements',
      'Compliance screening dashboard displaying status, confidence score, and visual evidence',
      'Human-in-the-loop review queue for uncertain or low-confidence extractions',
      'Inspection history logging and automated PDF/DOCX audit report generation'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/SIH_PROJECT',
    image: '/projects/sih-smart-lm.png',
    architecture: {
      frontend: 'React + TypeScript + Vite + Tailwind CSS dashboard with image preview and review queue',
      backend: 'FastAPI (Python) REST API with asynchronous request handlers and validation',
      aiEngine: 'OpenCV image preprocessing + PaddleOCR / Tesseract 5 + Custom regex and rule evaluators',
      database: 'Inspection audit log and configurable rule storage',
      deployment: 'Uvicorn ASGI server with modular client interface'
    },
    metrics: [
      'Addresses SIH 2026 Problem Statement SIH26034',
      'Configurable screening against Legal Metrology Rules, 2011',
      'Supports human-in-the-loop review for high-accuracy decision support'
    ],
    isFeatured: true,
    idea: 'Develop an AI/OCR-assisted software system that accelerates packaging compliance screening without replacing the inspector\'s legal judgement.',
    approach: 'User captures or uploads product label image → Frontend sends to FastAPI backend → OpenCV enhances image → OCR extracts text → Rule engine matches declarations against legal norms → Results shown with confidence metrics → Review queue handles borderline cases.',
    solution: 'A transparent decision-support system that provides officers with immediate preliminary verification, visual proof overlays, and structured documentation.',
    myContribution: 'Collaborated on end-to-end technical implementation including frontend interface in React, backend API integration with FastAPI, and OCR pipeline experimentation.',
    currentResult: 'Functional prototype with running FastAPI backend, interactive React client, OCR processing pipeline, and rule verification engine.',
    challenges: [
      'Dealing with curved, wrinkled, and reflective packaging surfaces',
      'Balancing OCR precision across diverse multilingual Indian product labels',
      'Designing an intuitive review queue so officers can quickly approve or flag discrepancies'
    ]
  },
  {
    id: 'ai-complaint-management-system',
    title: 'AI Complaint Management System',
    subtitle: 'Modern Reactive Complaint Tracking & Resolution Platform',
    description: 'An AI-powered complaint management web application built with React and modern CSS to streamline grievance filing, priority categorization, and resolution workflows.',
    problemSolved: 'Traditional complaint portals often suffer from clunky user interfaces, lack of transparent status tracking, and inefficient manual routing of issues.',
    category: 'Web',
    technologies: ['React', 'JavaScript', 'Vite', 'CSS', 'Oxlint'],
    features: [
      'Interactive grievance submission interface with form validation',
      'Automated issue categorization and priority classification',
      'Real-time status tracking workflow from submission to resolution',
      'Clean modular React component hierarchy with fast Vite HMR',
      'Accessible responsive layout optimized for desktop and mobile devices'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/AI-Complaint-Management-System',
    image: '/projects/complaint-system.png',
    architecture: {
      frontend: 'React with Vite runtime and modular CSS styling',
      deployment: 'Static client-side web application'
    },
    metrics: [
      'Production-ready Vite bundle',
      'Full responsive support across viewports'
    ],
    isFeatured: true,
    idea: 'Build an intuitive, modern grievance management portal that enhances communication between users and administrators.',
    approach: 'Designed a component-driven architecture with clean state management to provide responsive feedback during complaint creation and tracking.',
    solution: 'A fast, lightweight web interface allowing users to submit issues, view current resolution status, and manage inquiries seamlessly.',
    myContribution: 'Built the complete React web application, created UI components, configured Vite build tooling, and structured application routing.',
    currentResult: 'Published repository on GitHub with active codebase and responsive interface.'
  },
  {
    id: '2d-graphics-editor',
    title: '2D Graphics Editor & Canvas',
    subtitle: 'Menu-Driven Character-Based Computer Graphics System in C',
    description: 'A menu-driven graphics application developed in C implementing fundamental computer graphics algorithms including Bresenham Line Drawing and Midpoint Circle algorithms on an 80x25 character canvas.',
    problemSolved: 'Understanding how low-level rasterization and geometric drawing algorithms operate without relying on modern high-level graphics APIs.',
    category: 'Graphics',
    technologies: ['C', 'GCC', 'MinGW', 'Algorithms', 'Data Structures'],
    features: [
      'Bresenham Line Drawing Algorithm implementation using integer arithmetic for fast rendering',
      'Midpoint Circle Algorithm implementation for accurate circle generation',
      'Geometric shape creation: Line, Circle, Rectangle, and Triangle',
      'Object management system supporting adding, modifying, and deleting up to 100 shapes',
      'Dynamic canvas redrawing on an 80x25 character virtual buffer',
      'Console menu-driven user interface with interactive commands'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/2D-Graphics-editor',
    image: '/projects/2d-graphics.png',
    architecture: {
      backend: 'Pure C application compiled with GCC / MinGW',
      deployment: 'Console executable with 2D character array buffer'
    },
    metrics: [
      '80x25 character grid canvas',
      'Up to 100 simultaneous graphical objects',
      'Zero external graphics library dependencies'
    ],
    isFeatured: true,
    idea: 'Demonstrate fundamental computer graphics rendering principles directly within a terminal environment.',
    approach: 'Created an in-memory 2D character array representing screen pixels and implemented mathematical rasterization algorithms to write characters to coordinates.',
    solution: 'A complete educational graphics editor allowing users to create, modify, and render geometric objects interactively.',
    myContribution: 'Implemented the Bresenham line algorithm, midpoint circle algorithm, shape data structures, and menu-driven command loop in C.',
    currentResult: 'Complete compiled C project with full documentation and working executable in GitHub repository.'
  },
  {
    id: '2d-graphics-project',
    title: '2D Graphics Algorithms Project',
    subtitle: 'Fundamental Computer Graphics Implementations',
    description: 'C programming project demonstrating mathematical line generation, coordinate transformations, and rasterization algorithms.',
    problemSolved: 'Exploring mathematical foundations of computer graphics and memory-efficient rendering in C.',
    category: 'Academic',
    technologies: ['C', 'Computer Graphics', 'GCC'],
    features: [
      'Coordinate system mapping and transformation',
      'Geometric shape drawing and manipulation',
      'Performance-optimized integer arithmetic algorithms'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/2D-Graphics-Project',
    image: '/projects/2d-graphics.png',
    isFeatured: false
  },
  {
    id: 'pb-wad',
    title: 'Web Application Development Lab (PB_WAD)',
    subtitle: 'Full Stack Web & Systems Coursework Repository',
    description: 'Practical coursework and laboratory implementations spanning web application fundamentals, Python scripting, Java classes, and C++ utilities.',
    problemSolved: 'Comprehensive laboratory exercises reinforcing core programming paradigms across multiple languages and web technologies.',
    category: 'Academic',
    technologies: ['Python', 'Java', 'C++', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Web application development lab activities and exercises',
      'Multi-language implementations in Python, Java, and C++',
      'Object-oriented programming exercises and testing suites'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/PB_WAD',
    image: '/projects/web-lab.png',
    isFeatured: false
  },
  {
    id: 'leetcode-solutions',
    title: 'LeetCode Algorithmic Solutions',
    subtitle: 'Data Structures & Algorithms Repository in Java',
    description: 'Verified repository of algorithmic problem solutions in Java focusing on clean time and space complexity, core data structures, and edge case handling.',
    problemSolved: 'Systematic practice of algorithmic problem solving and data structure optimization.',
    category: 'Academic',
    technologies: ['Java', 'Algorithms', 'Data Structures'],
    features: [
      'Solutions across arrays, strings, and core data structures',
      'Clean Java implementations adhering to clean code principles'
    ],
    githubUrl: 'https://github.com/Mubashireengaffarmiya/leetcode-solutions',
    image: '/projects/leetcode.png',
    isFeatured: false
  }
];

export const FEATURED_SIH_PROJECT = PROJECTS_DATA[0];
