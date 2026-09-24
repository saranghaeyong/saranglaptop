export interface ProjectData {
  title: string;
  institution: string;
  date: string;
  credits: number;
  grade: string;
  technologies: string[];
  keyAreas: string[];
  description: string[];
}

export interface EducationData {
  degree: string;
  period: string;
  institution: string;
  score: string;
  division: string;
}

export interface CertificationData {
  title: string;
  year: string;
  issuer: string;
}

export interface PortfolioContent {
  identity: {
    name: string;
    tagline: string[];
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  project: ProjectData;
  education: EducationData[];
  skills: {
    programming: string[];
    database: string[];
    webTechnologies: string[];
    tools: string[];
  };
  certifications: CertificationData[];
  contact: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  credits: {
    name: string;
    disciplines: string[];
    byline: string;
    year: string;
    copyright: string;
  };
}

export const PORTFOLIO_DATA: PortfolioContent = {
  identity: {
    name: "SARANG R N",
    tagline: [
      "MCA GRADUATE",
      "SOFTWARE DEVELOPMENT",
      "PYTHON",
      "MACHINE LEARNING"
    ],
    email: "rnsarang@gmail.com",
    phone: "7994963196",
    location: "KAKKAND, ERNAKULAM, KERALA"
  },
  summary: "MCA graduate from Cochin University of Science and Technology with a CGPA of 7.66/10 (First Class), with a foundation in Python, Java, C, SQL/MySQL, and web technologies. Strong academic project experience in machine learning, deep learning, cybersecurity, and web automation, with hands-on exposure to Python-based data processing and model development.",
  project: {
    title: "TOWARDS THE DETECTION OF PHISHING WEBSITES USING LLM & CNN",
    institution: "Cochin University of Science and Technology",
    date: "April 2026",
    credits: 16,
    grade: "S — Highest",
    technologies: [
      "Python",
      "PyTorch",
      "CNN",
      "LLM",
      "NumPy",
      "Pandas",
      "Selenium",
      "Playwright"
    ],
    keyAreas: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing (NLP)",
      "Large Language Models (LLM)",
      "Computer Vision",
      "Cybersecurity",
      "Web Automation"
    ],
    description: [
      "Worked on a hybrid phishing detection approach combining webpage content analysis with CNN-based URL classification.",
      "Applied brand recognition, brand-domain matching, logo analysis, and credential-taking intention detection for webpage assessment.",
      "Worked with character-level CNN and attention mechanisms for URL-based phishing classification and evaluated models using: Accuracy, Precision, Recall, F1-score."
    ]
  },
  education: [
    {
      degree: "MASTER OF COMPUTER APPLICATIONS (PG)",
      period: "2024 — 2026",
      institution: "COCHIN UNIVERSITY OF SCIENCE AND TECHNOLOGY, KALAMASSERY",
      score: "CGPA: 7.66/10",
      division: "FIRST CLASS"
    },
    {
      degree: "BACHELOR OF COMPUTER APPLICATIONS (UG)",
      period: "2019 — 2022",
      institution: "BHARATA MATA COLLEGE OF SCIENCE AND ARTS",
      score: "CCPA: 6.24/10",
      division: "B CLASS"
    },
    {
      degree: "PLUS TWO, SCIENCE BIOLOGY",
      period: "2017 — 2019",
      institution: "CARDINAL HIGHER SECONDARY, THRIKKAKARA",
      score: "HIGHER SECONDARY",
      division: "SCIENCE BIOLOGY"
    },
    {
      degree: "TENTH HIGH SCHOOL",
      period: "2012 — 2017",
      institution: "ST ALBERTS HS, ERNAKULAM",
      score: "SECONDARY SCHOOL",
      division: "MATRICULATION"
    }
  ],
  skills: {
    programming: ["C", "PYTHON", "JAVA", "OBJECT ORIENTED PROGRAMMING"],
    database: ["SQL / MYSQL"],
    webTechnologies: ["HTML", "CSS", "JAVASCRIPT", "PHP", "BOOTSTRAP"],
    tools: ["VS CODE", "ADOBE PHOTOSHOP", "COREL DRAW", "DREAMWEAVER"]
  },
  certifications: [
    {
      title: "DIPLOMA IN WEB DESIGNING",
      year: "2019",
      issuer: "SOFTMEDIA COMPUTER TRAINING"
    },
    {
      title: "DESKTOP PUBLISHING (DTP)",
      year: "2018",
      issuer: "SOFTMEDIA COMPUTER TRAINING"
    },
    {
      title: "DIPLOMA IN COMPUTER APPLICATIONS",
      year: "2017",
      issuer: "SOFTMEDIA COMPUTER TRAINING"
    }
  ],
  contact: {
    name: "SARANG R N",
    email: "rnsarang@gmail.com",
    phone: "7994963196",
    location: "Kakkand, Ernakulam, Kerala"
  },
  credits: {
    name: "SARANG R N",
    disciplines: [
      "SOFTWARE DEVELOPMENT",
      "MACHINE LEARNING",
      "PYTHON",
      "CYBERSECURITY",
      "WORLD CINEMA"
    ],
    byline: "Made by Sarang R N",
    year: "2026",
    copyright: "© 2026 SARANG R N"
  }
};

export type ComponentSectionId = 
  | 'identity' 
  | 'skills' 
  | 'project' 
  | 'education' 
  | 'certifications' 
  | 'contact';

export interface ComponentAnnotation {
  id: ComponentSectionId;
  label: string;
  sublabel: string;
  hardwarePart: string;
  targetPosition: [number, number, number]; // 3D anchor position in exploded state
}

export const COMPONENT_ANNOTATIONS: ComponentAnnotation[] = [
  {
    id: 'identity',
    label: 'IDENTITY',
    sublabel: 'PROFILE & SUMMARY',
    hardwarePart: 'RETINA DISPLAY',
    targetPosition: [0, 2.2, -1.2]
  },
  {
    id: 'skills',
    label: 'SKILLS',
    sublabel: 'STACK & FRAMEWORKS',
    hardwarePart: 'KEYBOARD DECK',
    targetPosition: [-1.8, 1.2, 0.4]
  },
  {
    id: 'project',
    label: 'FEATURE PROJECT',
    sublabel: 'ML / LLM & CNN',
    hardwarePart: 'MOTHERBOARD & SOC',
    targetPosition: [0, 0.6, 1.2]
  },
  {
    id: 'education',
    label: 'EDUCATION',
    sublabel: 'CUSAT & ACADEMICS',
    hardwarePart: 'BATTERY CELL',
    targetPosition: [1.8, -1.0, 0.8]
  },
  {
    id: 'certifications',
    label: 'CERTIFICATIONS',
    sublabel: 'CREDENTIALS & DIPLOMAS',
    hardwarePart: 'NVME M.2 STORAGE',
    targetPosition: [-1.8, -0.6, 0.6]
  },
  {
    id: 'contact',
    label: 'CONTACT & CREDITS',
    sublabel: 'DIRECT LINE & INQUIRIES',
    hardwarePart: 'BASE CHASSIS',
    targetPosition: [0, -1.6, -0.4]
  }
];
