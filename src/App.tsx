import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Star,
  ArrowUpRight,
  X,
  Code,
  GraduationCap,
  Globe,
  Wrench,
  Cloud,
  RotateCcw,
  Smartphone,
  Cpu,
  ShieldCheck,
  Sparkles,
  Layers,
  Volume2,
  Award,
  Briefcase,
  Terminal,
  Scroll,
  Feather,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import InteractiveBackground from './components/InteractiveBackground';
import PortfolioEyes from './components/PortfolioEyes';
import { RobotAvatar } from './components/ui/robot-avatar';

// Relative/base asset URL resolver for GitHub Pages & custom domains
const asset = (p: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = p.startsWith('/') ? p.slice(1) : p;
  return `${cleanBase}${cleanPath}`;
};

const portfolioData = {
  profile: {
    name: "M Kaushal Maran",
    handle: "@kaushalboii",
    title: "Mobile App Developer · Systems Architect",
    bio: "Final-year B.Tech IT student at SIMATS Engineering College (CGPA 8.1) & Mobile App Developer from Tamil Nadu. I architect native iOS (Swift, SwiftUI) and Android (Kotlin, Jetpack Compose) applications, low-level macOS utilities, and 120 FPS high-performance systems.",
    location: "Vellore & Chennai, Tamil Nadu, India",
    education: "B.Tech Information Technology (CGPA 8.1) · SIMATS Engineering College",
    roles: [
      "Mobile App Developer @ SIMATS Engineering College",
      "Former Mobile App Intern @ Redback IT Solutions",
      "Independent iOS & Android Application Architect"
    ],
    links: {
      github: "https://github.com/kaushalboii",
      linkedin: "https://www.linkedin.com/in/kaushal-maran-m-9572622b1/",
      email: "kaushalmaranm@gmail.com",
      portfolio: "https://kaushalboii.github.io/Kaushal-s-Portfolio/",
      appStore: "https://apps.apple.com/in/app/zenlife-stress-sound-relief/id6753105286",
      playStore: "https://play.google.com/store/apps/details?id=com.velloreads.app&hl=en"
    }
  },
  flagship: {
    name: "ZenLife: Stress & Sound Relief",
    spec: "432 Hz Solfeggio · iOS 17+ · App Store",
    desc: "Acoustic psychoacoustic sound engine & stress relief app",
    link: "https://apps.apple.com/in/app/zenlife-stress-sound-relief/id6753105286"
  },
  openSource: [
    {
      name: "MyDiary: 3D Memory Library",
      repo: "kaushalboii/MyDiary",
      stars: 18,
      license: "MIT",
      desc: "Editorial 3D physical memory library & interactive flipbook diary with procedural walnut shelf, Three.js page flips, AES-256-GCM vault, and Book Studio."
    },
    {
      name: "CleanYourMac Keyboard",
      repo: "kaushalboii/CleanYourMacKeyboard",
      stars: 12,
      license: "MIT",
      desc: "Native macOS menu bar utility that locks keyboard and touch bar input with one click for sanitizing without accidental keystrokes. Swift & AppKit."
    },
    {
      name: "ZenLife: Sound-Based Relief",
      repo: "kaushalboii/Zenlife-Stress-relief-app-using-sound-and-music",
      stars: 8,
      license: "MIT",
      desc: "Native iOS 17+ sound-based stress relief app with 432 Hz Solfeggio frequency synthesis, AVAudioEngine, and CoreData persistence."
    },
    {
      name: "CodeShift Collaborative Editor",
      repo: "kaushalboii/codeshift",
      stars: 15,
      license: "MIT",
      desc: "Real-time collaborative browser code editor powered by Monaco Engine, client-side AES-GCM encryption, peer cursors, and Firebase sync."
    },
    {
      name: "India News Radar",
      repo: "kaushalboii/Live-news-updated-India",
      stars: 9,
      license: "MIT",
      desc: "Real-time geotagged intelligence web platform with pulsating incident coordinates and multi-source event correlation across India."
    },
    {
      name: "Computer Vision Labs",
      repo: "kaushalboii/COMPUTER-VISION",
      stars: 7,
      license: "MIT",
      desc: "40+ OpenCV & Python experimental spatial intelligence pipelines: Canny edge filtering, contour approximation, and Haar cascades."
    }
  ],
  projects: [
    {
      name: "ZenLife: Stress & Sound Relief",
      desc: "Native iOS sound-based stress relief application live on the Apple App Store. Delivers calming mood-tailored acoustic soundscapes and 432 Hz Solfeggio frequency sessions with CoreData persistence, biometrics, and fluid SwiftUI micro-interactions.",
      link: "https://apps.apple.com/in/app/zenlife-stress-sound-relief/id6753105286",
      image: "/assets/apps/zenlife-screen-1.jpg",
      layout: "portrait",
      platform: "Apple App Store",
      tags: ["SwiftUI", "AVAudioEngine", "CoreData", "Combine", "App Store"]
    },
    {
      name: "Viana 360",
      desc: "Enterprise telemetry and industrial IoT monitoring application live on the Apple App Store. Provides 360-degree real-time data visualization, telemetry alert notifications, and multi-sensor dashboard analytics via WebSockets.",
      link: "https://apps.apple.com/in/app/viana-360/id6760163659",
      image: "/assets/apps/viana360-screen-1.jpg",
      layout: "portrait",
      platform: "Apple App Store",
      tags: ["Swift", "Combine", "WebSockets", "Telemetry", "App Store"]
    },
    {
      name: "Viana Buy",
      desc: "High-performance iOS lifestyle quick-commerce application live on the Apple App Store. Streamlines grocery and daily essentials purchases with local cart persistence, responsive catalog caching, and express Vellore logistics.",
      link: "https://apps.apple.com/in/app/viana-buy/id6772468488",
      image: "/assets/apps/vianabuy-screen-1.jpg",
      layout: "portrait",
      platform: "Apple App Store",
      tags: ["SwiftUI", "REST APIs", "Cart Engine", "E-Commerce", "App Store"]
    },
    {
      name: "CleanYourMac Keyboard",
      desc: "Free & open-source native macOS utility that locks all keyboard and touch bar input with a single click, allowing effortless keyboard sanitization without triggering accidental keystrokes. Built with Swift, AppKit, and CGEventTap.",
      link: "https://kaushalboii.github.io/CleanYourMacKeyboard/",
      image: "/assets/apps/cleanmac-web-hero.jpg",
      layout: "horizontal",
      platform: "macOS Universal",
      tags: ["macOS", "Swift", "AppKit", "CGEventTap", "Open Source"]
    },
    {
      name: "Vellore Ads Platform",
      desc: "Commercial listing and advertising directory application live on the Google Play Store. Features instant location filtering, high-density listing catalogues, verified merchant profiles, and localized classified ad management in Vellore, Tamil Nadu.",
      link: "https://play.google.com/store/apps/details?id=com.velloreads.app&hl=en",
      image: "/assets/apps/velloreads-screen-1.jpg",
      layout: "portrait",
      platform: "Google Play Store",
      tags: ["Kotlin", "Jetpack Compose", "Coroutines", "Material 3", "Google Play"]
    },
    {
      name: "Constitution of India (REF)",
      desc: "Comprehensive bilingual legal reference application live on Google Play Store featuring all 395 Articles, Schedules, and 106+ Amendments. Engineered with lightning-fast offline SQLite FTS5 full-text search.",
      link: "https://play.google.com/store/apps/details?id=com.kaushal.constitutionindia&hl=en",
      image: "/assets/apps/constitution-screen-1.jpg",
      layout: "portrait",
      platform: "Google Play Store",
      tags: ["Kotlin", "SQLite FTS5", "Offline-First", "Material You", "Google Play"]
    },
    {
      name: "BNS & BNSS 2023 Statutory Suite",
      desc: "Instant statutory reference suite for India's landmark criminal code reforms: Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA. Includes an IPC/CrPC cross-conversion matrix, Room DB persistence, and instant section lookup.",
      link: "https://play.google.com/store/apps/details?id=com.bns.pocketreference&hl=en",
      image: "/assets/apps/bns-screen-1.jpg",
      layout: "portrait",
      platform: "Google Play Store",
      tags: ["Kotlin", "Room DB", "IPC Cross-Matrix", "Material 3", "Google Play"]
    },
    {
      name: "MyDiary — 3D Memory Library & FlipBook",
      desc: "Editorial 3D physical memory library and interactive flipbook diary built with Next.js 16, React 19, Three.js, and Tailwind CSS v4. Features clothbound hardcovers resting on a continuous walnut shelf, synchronized 3D flipbook page turning, real-time Book Studio customizer, client-side AES-256-GCM vault security, offline IndexedDB sync, and a Verlet rope theme toggle.",
      link: "https://kaushalboii.github.io/MyDiary/",
      image: "/assets/apps/mydiary-preview.png",
      layout: "horizontal",
      platform: "Web Platform · Open Source",
      tags: ["Next.js 16", "React 19", "Three.js", "Tailwind CSS v4", "AES-256-GCM Vault", "WebGL"]
    },
    {
      name: "CodeShift Collaborative Editor",
      desc: "High-performance open-source real-time collaborative code editor powered by Microsoft Monaco engine. Features zero-login instant room sharing, client-side AES-GCM encryption with LZW compression, and live peer cursor presence.",
      link: "https://kaushalboii.github.io/codeshift/",
      image: "/assets/apps/codeshift-preview.svg",
      layout: "horizontal",
      platform: "Web Platform",
      tags: ["Monaco Editor", "AES-GCM", "Firebase", "Real-Time Web", "Open Source"]
    },
    {
      name: "India News Radar",
      desc: "Interactive real-time news radar delivering geotagged intelligence across India. Features an interactive SVG map with pulsating incident coordinates, multi-source live event correlation, and real-time category bulletins.",
      link: "https://kaushalboii.github.io/Live-news-updated-India/",
      image: "/assets/apps/radar-preview.jpg",
      layout: "horizontal",
      platform: "Web Platform",
      tags: ["SVG Maps", "Live News API", "Real-Time Web", "JavaScript ES6+"]
    }
  ],
  skills: {
    "iOS Native": ["Swift", "SwiftUI", "Combine", "AVAudioEngine", "CoreData", "AppKit"],
    "Android Native": ["Kotlin", "Jetpack Compose", "Coroutines", "Room SQLite", "Material 3"],
    "Web & Full Stack": ["React 19", "Next.js 16", "Three.js / WebGL", "TypeScript", "Tailwind CSS v4", "Monaco Editor", "WebSockets"],
    "AI & DSP": ["PyTorch", "DCGAN", "OpenCV", "Audio DSP (432 Hz)", "NumPy / SciPy", "FFT"],
    "Persistence & Cloud": ["SQLite FTS5", "Firebase Realtime", "CoreData", "Docker", "Vercel"],
    "Engineering Tooling": ["Xcode", "Android Studio", "Git & GitHub", "Instruments", "Postman"]
  },
  systemsArchitecture: {
    philosophy: "Software is an architectural craft. Clean design, offline reliability, and deterministic 120 FPS performance compound into products people love using.",
    platforms: ["Apple App Store", "Google Play Store", "macOS Universal", "Vercel", "Firebase", "GitHub Pages"],
    engines: [
      { name: "Three.js & WebGL", desc: "Procedural 3D physical walnut bookshelf, synchronized flipbook physics & clothbound generative textures" },
      { name: "AVAudioEngine", desc: "432 Hz Solfeggio acoustic frequency synthesizer & psychoacoustic filter bank" },
      { name: "CGEventTap", desc: "macOS low-level kernel event tapping for instantaneous keyboard input lockout" },
      { name: "SQLite FTS5", desc: "Sub-16ms tokenized offline full-text statutory search for constitutional bare acts" },
      { name: "Monaco Editor", desc: "Real-time collaborative code workspace with client-side AES-GCM encryption" },
      { name: "DCGAN PyTorch", desc: "Deep convolutional generative adversarial narrative synthesis & comic art generation" },
      { name: "OpenCV Spatial", desc: "40+ spatial intelligence pipelines with Canny filtering and contour estimation" }
    ],
    principles: [
      "Zero frame drops at 120 FPS with hardware-accelerated GPU rendering",
      "Offline-first caching: all primary data accessible with zero network latency",
      "Type-safe concurrency via Swift async/await and Kotlin Coroutines",
      "Zero telemetry bloat: privacy-respecting local persistence"
    ]
  },
  timeline: [
    {
      year: "2026",
      period: "Feb 2026 — Present",
      role: "Mobile App Developer",
      org: "SIMATS Engineering College · Chennai, Tamil Nadu",
      bullets: [
        "Leading architecture and production delivery of scalable mobile platforms for academic and research ecosystems.",
        "Engineering high-performance native iOS applications with SwiftUI and Android platforms with Jetpack Compose."
      ]
    },
    {
      year: "2025",
      period: "Nov 2025 — Dec 2025",
      role: "Mobile App Development Intern",
      org: "Redback IT Solutions Private Ltd · Vellore, Tamil Nadu",
      bullets: [
        "Engineered native Android applications in Kotlin and iOS applications using Swift & WKWebView.",
        "Delivered client platforms end-to-end: UI implementation, secure WebView bridging, and APK/IPA signing."
      ]
    },
    {
      year: "2024",
      period: "2024 — 2025",
      role: "Independent Application Architect",
      org: "App Store & Google Play",
      bullets: [
        "Architected and deployed ZenLife, Viana 360, Viana Buy to Apple App Store.",
        "Published Vellore Ads and 4 statutory reference applications to Google Play Store."
      ]
    },
    {
      year: "2022",
      period: "2022 — 2026",
      role: "B.Tech, Information Technology",
      org: "SIMATS Engineering College · CGPA 8.1",
      bullets: [
        "Four years of software engineering: mobile architecture, database optimization, and artificial intelligence.",
        "Published multiple live commercial applications on the App Store and Google Play during study."
      ]
    }
  ]
};

// Custom easing — smooth deceleration, not default springs
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const Modal = ({ isOpen, onClose, title, jp, children, maxWidth = "max-w-2xl" }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0c0a08]/85 z-50 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1.5rem)] ${maxWidth} max-h-[85vh] flex flex-col bg-sumi-900 border border-washi/10 rounded-3xl z-50 shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-hidden`}
        >
          <div className="flex justify-between items-center shrink-0 bg-sumi-900 py-4 px-6 md:px-8 border-b border-washi/8">
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-washi">{title}</h2>
              {jp && <span className="font-tamil text-xs text-washi-dim tracking-[0.2em]">{jp}</span>}
            </div>
            <button onClick={onClose} aria-label="Close" className="p-2 bg-washi/5 hover:bg-washi/15 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5 text-washi/80" />
            </button>
          </div>
          <div className="flex-1 min-h-0 text-washi/90 space-y-4 p-6 md:p-8 overflow-y-auto hide-scrollbar">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

function DraggableBox({
  children,
  onClick,
  className,
  variants,
  dragRef,
  resetSignal,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  variants: any;
  dragRef?: React.RefObject<HTMLDivElement | null>;
  resetSignal?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const wasDragged = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || window.matchMedia("(hover: none)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!resetSignal) return;
    animate(x, 0, { duration: 0.55, ease: EASE_OUT_QUART });
    animate(y, 0, { duration: 0.55, ease: EASE_OUT_QUART });
  }, [resetSignal, x, y]);

  const dragProps = isMobile ? {} : {
    drag: true,
    dragConstraints: dragRef,
    dragElastic: 0.1,
    dragMomentum: false,
    whileDrag: { scale: 1.04, zIndex: 100, boxShadow: '0 24px 60px rgba(0,0,0,0.55)' },
    onDragStart: () => { wasDragged.current = true; },
    onDragEnd: () => { setTimeout(() => { wasDragged.current = false; }, 60); },
  };

  return (
    <motion.div
      variants={variants}
      style={{ x, y }}
      onClickCapture={(e) => { if (wasDragged.current) { e.preventDefault(); e.stopPropagation(); } }}
      onClick={() => { if (!wasDragged.current) onClick?.(); }}
      className={className}
      {...dragProps}
    >
      {children}
    </motion.div>
  );
}

// ==========================================================================
// ANCIENT TAMIL OLAICHUVADI 3D (பண்டைய தமிழ் ஓலைச்சுவடி)
// Authentic Palmyra Palm-Leaf Manuscript with Thirukkural, Stylus Engraving,
// Sacred Red Cord (செங்கயிறு), Carved Rosewood Beams, and Kaushal Maran's Software Edict.
// ==========================================================================

interface PalmLeafItem {
  id: number;
  isCover?: boolean;
  isDedication?: boolean;
  kuralNumber?: number;
  title: string;
  chapterTamil: string;
  chapterEnglish: string;
  line1: string;
  line2: string;
  transliteration?: string;
  meaningTamil: string;
  meaningEnglish: string;
  engineeringParallel: string;
  keyWords?: { word: string; meaning: string }[];
}

const PALM_LEAVES: PalmLeafItem[] = [
  {
    id: 1,
    kuralNumber: 619,
    title: "குறள் ௬௧௯ • விடாமுயற்சி (My Craft & Effort)",
    chapterTamil: "அதிகாரம் 62: ஆள்வினையுடைமை",
    chapterEnglish: "Relentless Effort & Tenacity in Craft",
    line1: "தெய்வத்தான் ஆகா தெனினும் முயற்சிதன்",
    line2: "மெய்வருத்தக் கூலி தரும்.",
    transliteration: "Deivathaan aagaa theninum muyarchithan meyvaruththa kooli tharum.",
    meaningTamil: "விதியால் கூட முடியாது என்று கைவிடப்பட்ட காரியமாயினும், உடலை வருத்திச் செய்யும் இடைவிடாத விடாமுயற்சி அதற்குரிய முழுப் பயனையும் தரும்.",
    meaningEnglish: "Even if fate or circumstances declare a task impossible, persistent, body-straining human effort and dedicated craft will always yield its full reward.",
    engineeringParallel: "Tenacity in Code & Systems: When complex algorithms, race conditions, or memory leaks seem unsolvable, relentless debugging, grit, and craftsmanship will always prevail.",
    keyWords: [
      { word: "தெய்வத்தான் ஆகாது", meaning: "Even if fate denies" },
      { word: "எனினும்", meaning: "Yet, nonetheless" },
      { word: "முயற்சிதன்", meaning: "One's relentless craft" },
      { word: "மெய்வருத்தக் கூலி", meaning: "Full reward of sincere labor" },
    ],
  },
  {
    id: 2,
    kuralNumber: 71,
    title: "குறள் ௭௧ • அன்புடைமை (Love & Empathy)",
    chapterTamil: "அதிகாரம் 8: அன்புடைமை",
    chapterEnglish: "Human-Centered Design & Empathy",
    line1: "அன்பிற்கும் உண்டோ அடைக்குந்தாழ் ஆர்வலர்",
    line2: "புன்கணீர் பூசல் தரும்.",
    transliteration: "Anbirkum undo adaikkundhaazh aarvalar punganeer poosal tharum.",
    meaningTamil: "உள்ளத்தில் உள்ள உண்மையான அன்பை அடைத்து வைக்கக்கூடிய தாழ்ப்பாள் ஏதேனும் உண்டோ? அன்புடையவரின் சிறு கண்ணீரே அதை உலகறிய வெளிப்படுத்திவிடும்.",
    meaningEnglish: "Can any bolt or latch confine true love? The tender tears of the devoted will immediately break through and proclaim it.",
    engineeringParallel: "User-Centered Empathy: Empathy and love for real people using software is the soul that elevates utilitarian code into beloved digital experiences.",
    keyWords: [
      { word: "அடைக்குந்தாழ்", meaning: "A locking bolt or latch" },
      { word: "ஆர்வலர்", meaning: "Those filled with care & affection" },
      { word: "புன்கணீர்", meaning: "Tender, caring tears" },
      { word: "பூசல் தரும்", meaning: "Openly proclaims to the world" },
    ],
  },
  {
    id: 3,
    isDedication: true,
    title: "அர்ப்பணிப்பு • Dedication & Gratitude",
    chapterTamil: "நன்றியுரை • பேரன்பு",
    chapterEnglish: "For You, By You & Forever For You All",
    line1: "உங்களுக்காக, உங்களால்,",
    line2: "என்றும் உங்களுக்காக... எல்லார் மீதும் பேரன்பு!",
    transliteration: "Ungalukkaaga, ungalaal, endrum ungalukkaaga... Ellaar meedhum peranbudan!",
    meaningTamil: "உங்களுக்காக, உங்களால், என்றும் உங்களுக்காக... என் இதயத்தின் ஆழத்திலிருந்து உங்கள் அனைவருக்கும் என் பேரன்பு!",
    meaningEnglish: "For you, by you, and forever for you all. Love you all lots! Dedicated with heartfelt gratitude to every user, mentor, and supporter who inspires my craft.",
    engineeringParallel: "Built With Soul: Software is never built in isolation. It lives, breathes, and matters only because of the people who use it, shape it, and believe in it.",
    keyWords: [
      { word: "உங்களுக்காக", meaning: "For you" },
      { word: "உங்களால்", meaning: "By you / Inspired by you" },
      { word: "என்றும்", meaning: "Forever and always" },
      { word: "பேரன்பு", meaning: "Immense, boundless love" },
    ],
  },
];

function TamilOlaichuvadi3D({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotTilt, setRotTilt] = useState({ x: 0, y: 0 });

  const activeLeaf = PALM_LEAVES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PALM_LEAVES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PALM_LEAVES.length) % PALM_LEAVES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotTilt({
      x: (-y / rect.height) * 8,
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 sm:p-2 select-none w-full max-w-xl mx-auto space-y-4">
      
      {/* Needed Border Mat with the Palm Leaf Bundle */}
      <div
        className="manuscript-desk-mat w-full rounded-3xl p-6 sm:p-8 border border-amber-500/25 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft atmospheric candlelight glow */}
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Traditional Left Jute Twine (சணல் கயிறு) */}
        <div className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <svg className="w-14 sm:w-16 h-14" viewBox="0 0 80 64" fill="none">
            <path d="M 0,18 Q 20,26 42,32" stroke="#b08c58" strokeWidth="4" strokeLinecap="round" />
            <path d="M 0,18 Q 20,26 42,32" stroke="#5d3c16" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M 2,42 Q 22,34 42,33" stroke="#9a7442" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 2,42 Q 22,34 42,33" stroke="#4a2e10" strokeWidth="1" strokeDasharray="2 2" />
            <ellipse cx="44" cy="32" rx="6" ry="5" fill="#a4804c" stroke="#4e3113" strokeWidth="1.5" />
            <path d="M 40,28 Q 44,35 48,30" stroke="#38210b" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Palm Leaf Container */}
        <div className="relative w-full max-w-[480px] h-[85px] sm:h-[90px] flex items-center justify-center">

          {/* Underlying stacked leaves for physical depth */}
          {PALM_LEAVES.map((leaf, idx) => {
            if (idx === activeIdx) return null;
            const offset = (idx - activeIdx + PALM_LEAVES.length) % PALM_LEAVES.length;
            if (offset < 1 || offset > 2) return null;

            return (
              <div
                key={'stacked-' + leaf.id}
                style={{
                  transformOrigin: '28px 50%',
                  transform: 'rotate(' + (offset * 3.5) + 'deg) translate(' + (offset * 6) + 'px, ' + (offset * 3) + 'px)',
                  zIndex: 20 - offset,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.45))',
                }}
                className="absolute inset-0 pointer-events-none transition-transform duration-300"
              >
                <div className="natural-palm-leaf w-full h-[76px] sm:h-[82px] opacity-95">
                  <div
                    className="absolute left-[24px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-20"
                    style={{
                      background: '#120c08',
                      boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.95), 0 0 0 1px rgba(70,35,10,0.6)',
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Active Top Leaf */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={'active-' + activeLeaf.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.45}
              onDragStart={() => setIsDragging(true)}
              onDrag={(e, info) => {
                setDragOffset({ x: info.offset.x, y: info.offset.y });
              }}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                setDragOffset({ x: 0, y: 0 });
                if (info.offset.x > 35 || info.velocity.x > 250) {
                  handleNext();
                } else if (info.offset.x < -35 || info.velocity.x < -250) {
                  handlePrev();
                }
              }}
              onClick={() => {
                if (!isDragging) {
                  if (activeLeaf.isDedication) {
                    onClose();
                  } else {
                    handleNext();
                  }
                }
              }}
              style={{
                transformOrigin: '28px 50%',
                zIndex: 30,
                filter: 'drop-shadow(0 12px 22px rgba(0,0,0,0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
              }}
              initial={{ rotate: -28, opacity: 0, x: -30, scale: 0.98 }}
              animate={{
                rotate: isDragging ? dragOffset.x * 0.15 : rotTilt.y * 0.5,
                x: isDragging ? dragOffset.x : 0,
                y: isDragging ? dragOffset.y * 0.2 : rotTilt.x * 0.3,
                opacity: 1,
                scale: isDragging ? 1.02 : 1,
              }}
              exit={{ rotate: -45, x: 100, opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className="absolute inset-0 cursor-pointer active:cursor-grabbing w-full"
            >
              <div className="natural-palm-leaf w-full h-[76px] sm:h-[82px] flex items-center justify-between px-8 sm:px-12 relative overflow-hidden">
                {/* Left Hole */}
                <div
                  className="absolute left-[24px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-20 pointer-events-none"
                  style={{
                    background: '#120c08',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.95), 0 0 0 1px rgba(70,35,10,0.65)',
                  }}
                />

                {/* Leaf Text */}
                {activeLeaf.isDedication ? (
                  <div className="flex flex-col items-center justify-center text-center w-full px-2">
                    <p className="natural-palm-ink font-bold text-xs sm:text-sm tracking-wide leading-tight">
                      {activeLeaf.line1}
                    </p>
                    <p className="natural-palm-ink font-bold text-xs sm:text-sm tracking-wide leading-tight mt-0.5">
                      {activeLeaf.line2}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-[#4a2410] uppercase mt-1 tracking-wider">
                      அர்ப்பணிப்பு • Click to close ✕
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center w-full px-1">
                    <p className="natural-palm-ink font-bold text-xs sm:text-sm md:text-base tracking-wide leading-tight">
                      {activeLeaf.line1}
                    </p>
                    <p className="natural-palm-ink font-bold text-xs sm:text-sm md:text-base tracking-wide leading-tight mt-0.5">
                      {activeLeaf.line2}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-[#4a2410]/75 uppercase mt-1">
                      குறள் {activeLeaf.kuralNumber} • Tap to turn ({activeIdx + 1}/3)
                    </span>
                  </div>
                )}

                {/* Right Feather Watermark */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
                  <Feather className="w-3.5 h-3.5 text-[#3e1d0a]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal dot indicators to navigate */}
        <div className="flex items-center gap-2 mt-4 z-10">
          {PALM_LEAVES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={'Go to leaf ' + (i + 1)}
              className={'h-1.5 rounded-full transition-all cursor-pointer ' + (
                i === activeIdx
                  ? 'w-6 bg-amber-400'
                  : 'w-1.5 bg-amber-400/30 hover:bg-amber-400/60'
              )}
            />
          ))}
        </div>

      </div>

      {/* Small Note: Crafted by Kaushal Maran M */}
      <div className="pt-2 text-center space-y-2">
        <p className="font-mono text-xs tracking-widest uppercase text-amber-300 font-bold">
          Crafted by Kaushal Maran M
        </p>

        {/* Short Note: Why Tamil is Important */}
        <p className="text-xs text-washi/70 max-w-md mx-auto leading-relaxed">
          <span className="text-amber-300/90 font-medium">Why Tamil?</span> One of humanity's oldest living classical languages (over 2,500 years). Thirukkural embodies timeless, secular wisdom — a reminder that all enduring craft begins with relentless effort (<span className="text-amber-200 font-tamil font-bold">முயற்சி</span>) and deep empathy for people (<span className="text-amber-200 font-tamil font-bold">அன்பு</span>).
        </p>
      </div>

    </div>
  );
}

// Footer one-liners — Tamil classical wisdom & modern craft
const QUIPS = [
  "தமிழ்நாடு · Vellore, India (UTC+5:30)",
  "crafting native iOS & Android at 120 FPS",
  "யாதும் ஊரே யாவரும் கேளிர் — Purananuru 192",
  "the eyes follow your cursor. they judge, too.",
  "drag the cards. rearrange my architecture.",
  "கற்றது கைமண் அளவு — Craftsmanship without limits",
];

function FooterQuip() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % QUIPS.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-koke-400 shrink-0"></span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
        >
          {QUIPS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_QUART } }
};

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>("ZenLife: Stress & Sound Relief");
  const [avatarMode, setAvatarMode] = useState<'photo' | 'robot'>('photo');
  const [resetSignal, setResetSignal] = useState(0);
  const [stars, setStars] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      portfolioData.openSource.filter(r => r.repo && r.stars).map(r => [r.repo as string, r.stars as number])
    )
  );
  const constraintsRef = useRef<HTMLDivElement>(null);

  const totalStars = portfolioData.openSource.reduce(
    (sum, r) => sum + (r.repo ? (stars[r.repo] ?? 0) : 0), 0
  );
  const starLabel = totalStars >= 1000
    ? `${(totalStars / 1000).toFixed(1)}k`
    : String(totalStars);

  // Live star counts from GitHub API & edge cache
  useEffect(() => {
    let alive = true;
    const tracked = portfolioData.openSource.filter(r => r.repo && r.stars);
    const isCount = (v: unknown): v is number => typeof v === 'number' && v >= 0;

    (async () => {
      const fresh: Record<string, number> = {};
      try {
        const res = await fetch('/api/stars');
        if (res.ok) {
          const json = await res.json();
          for (const r of tracked) {
            const v = json?.[r.repo as string];
            if (isCount(v)) fresh[r.repo as string] = v;
          }
        }
      } catch { /* fall through to GitHub */ }

      const missing = tracked.filter(r => fresh[r.repo as string] === undefined);
      await Promise.all(missing.map(async r => {
        try {
          const res = await fetch(`https://api.github.com/repos/${r.repo}`);
          if (!res.ok) return;
          const json = await res.json();
          if (isCount(json.stargazers_count)) fresh[r.repo as string] = json.stargazers_count;
        } catch { /* keep the floor */ }
      }));

      if (alive && Object.keys(fresh).length) setStars(prev => ({ ...prev, ...fresh }));
    })();
    return () => { alive = false; };
  }, []);

  // Resize handler to reset draggable cards
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setResetSignal(s => s + 1), 180);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);

  // Tab-away easter egg in Tamil
  useEffect(() => {
    const original = document.title;
    const onVis = () => { document.title = document.hidden ? 'வணக்கம் — come back' : original; };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); document.title = original; };
  }, []);

  // Console easter egg
  useEffect(() => {
    console.log('%cவணக்கம் · KAUSHAL MARAN', 'font-size:32px;color:#e1532e;font-weight:bold;font-family:sans-serif;');
    console.log('%cMobile App Developer · iOS & Android · kaushalmaranm@gmail.com', 'color:#8a8275;font-size:12px;');
  }, []);

  return (
    <div ref={constraintsRef} className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden font-sans text-washi">
      <InteractiveBackground />

      {/* Vertical gutter signature — Tamil classical craftsmanship */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4 pointer-events-none select-none" aria-hidden="true">
        <span className="font-tamil text-xs text-washi/40 tracking-[0.25em] [writing-mode:vertical-rl]">அன்புடன்</span>
        <span className="font-tamil text-[10px] text-washi/25 tracking-[0.2em] [writing-mode:vertical-rl]">யாதும் ஊரே</span>
        <span className="w-px h-16 bg-gradient-to-b from-washi/25 to-transparent"></span>
      </div>

      {/* Editorial frame — top rule */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
        className="relative z-10 mb-5 w-full max-w-5xl flex items-end justify-between border-b border-washi/10 pb-3"
      >
        <span className="font-mono text-[11px] tracking-[0.25em] text-washi-dim uppercase">PORTFOLIO · M KAUSHAL MARAN</span>
        <button
          onClick={() => setActiveModal('holo')}
          title="Open Palm-Leaf Manuscript · பனை ஓலைச்சுவடி"
          className="font-tamil text-xs text-washi-dim hover:text-amber-300 tracking-[0.3em] pl-4 transition-colors cursor-pointer group flex items-center gap-1.5"
        >
          <span>அன்புடன்</span>
          <span className="font-mono text-[10px] text-washi/40 group-hover:text-amber-400 transition-colors tracking-normal">📜</span>
        </button>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              ease: EASE_OUT_QUART
            }
          }
        }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-4 auto-rows-[190px] gap-4 relative z-10 grid-flow-dense"
      >
        
        {/* Profile Box */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('profile')}
          className="md:col-span-2 md:row-span-1 bg-sumi-900/95 rounded-3xl p-6 border border-washi/10 flex flex-col justify-between relative overflow-hidden shadow-2xl group cursor-pointer hover:border-washi/25 hover:bg-sumi-850 transition-colors duration-300 z-10 hover:z-50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-washi/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <PortfolioEyes size={28} className="bg-sumi-950/80 rounded-2xl p-2 border border-washi/10" />
                <div title="online — crafting at 120 FPS" className="absolute -bottom-1 -right-1 w-4 h-4 bg-koke-400 rounded-full border-2 border-sumi-900"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-washi">{portfolioData.profile.name}</h1>
                <p className="text-sm text-washi-dim font-mono">{portfolioData.profile.handle}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-washi/5 flex items-center justify-center border border-washi/10 group-hover:bg-shu-500 group-hover:border-shu-500 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          
          <div className="relative z-10 mt-2">
            <p className="text-lg md:text-xl font-medium leading-snug text-washi">
              Building what people <span className="font-serif italic text-shu-400 text-xl md:text-2xl whitespace-nowrap">actually use.</span>
            </p>
          </div>
        </DraggableBox>

        {/* Tech Stack Box — compact */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('stack')}
          className="md:col-span-1 md:row-span-1 bg-sumi-900/95 rounded-3xl p-5 border border-washi/10 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer group hover:border-washi/25 hover:bg-sumi-850 transition-colors duration-300 z-10 hover:z-50"
        >
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-washi-dim group-hover:text-shu-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <h2 className="text-2xl font-black leading-none tracking-tight text-washi">STACK</h2>
            </div>
            <ArrowUpRight className="w-4 h-4 text-washi-dim group-hover:text-washi transition-colors" />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
            {['Swift', 'Kotlin', 'SwiftUI', 'Compose', 'Python'].map(item => (
              <div key={item} className="px-2 py-0.5 text-xs font-medium bg-washi/5 border border-washi/10 rounded-md text-washi/75">
                {item}
              </div>
            ))}
            <div className="px-2 py-0.5 text-xs font-medium bg-shu-500/10 border border-shu-500/25 rounded-md text-shu-300">+ more</div>
          </div>
        </DraggableBox>

        {/* Links Box — with LinkedIn integrated */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          className="md:col-span-1 md:row-span-1 flex flex-col gap-2 z-10 hover:z-50"
        >
          <div className="flex items-center justify-center h-1/2 gap-2">
            <div className="flex items-center justify-center w-1/2 h-full font-black text-2xl leading-none tracking-tight text-washi bg-sumi-900/95 rounded-2xl border border-washi/10">
              LIN<br/>KS.
            </div>
            <a
              href={portfolioData.profile.links.github}
              title="GitHub"
              target="_blank"
              rel="noreferrer"
              draggable={false}
              className="w-1/4 h-full bg-sumi-900/95 rounded-2xl border border-washi/10 flex items-center justify-center hover:bg-sumi-850 hover:border-shu-500/50 transition-colors cursor-pointer shadow-lg group"
            >
              <Github className="w-5 h-5 text-washi/70 group-hover:text-shu-400 transition-colors" />
            </a>
            <a
              href={portfolioData.profile.links.linkedin}
              title="LinkedIn Profile"
              target="_blank"
              rel="noreferrer"
              draggable={false}
              className="w-1/4 h-full bg-sumi-900/95 rounded-2xl border border-washi/10 flex items-center justify-center hover:bg-sumi-850 hover:border-shu-500/50 transition-colors cursor-pointer shadow-lg group"
            >
              <Linkedin className="w-5 h-5 text-washi/70 group-hover:text-shu-400 transition-colors" />
            </a>
          </div>
          <div className="flex items-center justify-center h-1/2 gap-2">
            <a
              href={`mailto:${portfolioData.profile.links.email}`}
              title="Email Kaushal"
              draggable={false}
              className="w-1/3 h-full bg-sumi-900/95 rounded-2xl border border-washi/10 flex items-center justify-center hover:bg-sumi-850 hover:border-shu-500/50 transition-colors cursor-pointer shadow-lg group"
            >
              <Mail className="w-5 h-5 text-washi/70 group-hover:text-shu-400 transition-colors" />
            </a>
            <a
              href={portfolioData.profile.links.appStore}
              title="Apple App Store (ZenLife)"
              target="_blank"
              rel="noreferrer"
              draggable={false}
              className="w-1/3 h-full bg-sumi-900/95 rounded-2xl border border-washi/10 flex items-center justify-center hover:bg-sumi-850 hover:border-shu-500/50 transition-colors cursor-pointer shadow-lg group"
            >
              <Smartphone className="w-5 h-5 text-washi/70 group-hover:text-shu-400 transition-colors" />
            </a>
            <a
              href={portfolioData.profile.links.portfolio}
              title="Primary 3D Portfolio"
              target="_blank"
              rel="noreferrer"
              draggable={false}
              className="w-1/3 h-full bg-sumi-900/95 rounded-2xl border border-washi/10 flex items-center justify-center hover:bg-sumi-850 hover:border-shu-500/50 transition-colors cursor-pointer shadow-lg group"
            >
              <Globe className="w-5 h-5 text-washi/70 group-hover:text-shu-400 transition-colors" />
            </a>
          </div>
        </DraggableBox>

        {/* Projects Box */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('projects')}
          className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-sumi-850 to-sumi-900 rounded-3xl p-6 border border-washi/10 relative overflow-hidden group cursor-pointer flex flex-col justify-between shadow-[0_16px_50px_rgba(0,0,0,0.45)] hover:border-shu-500/35 transition-colors duration-300 z-10 hover:z-50"
        >
          {/* Ensō brush circle */}
          <svg viewBox="0 0 200 200" className="absolute -right-12 -bottom-16 w-72 h-72 text-shu-500/15 group-hover:text-shu-500/25 transition-colors duration-700 pointer-events-none" fill="none" aria-hidden="true">
            <path d="M167.7 75.4 A72 72 0 1 0 146.3 155.2" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          </svg>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <svg viewBox="0 0 48 48" className="w-10 h-10 mb-4 text-shu-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 14 Q 24 8 42 14" />
                <line x1="10" y1="13" x2="10" y2="38" />
                <line x1="38" y1="13" x2="38" y2="38" />
                <line x1="7" y1="22" x2="41" y2="22" />
              </svg>
              <h2 className="text-5xl font-black leading-none tracking-tight text-washi mb-2">PROJECTS</h2>
              <p className="text-sm font-medium text-washi-dim mt-1">Native iOS · Android · macOS · Web</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-washi/8 border border-washi/10 flex items-center justify-center group-hover:bg-shu-500 group-hover:border-shu-500 transition-colors">
              <ArrowUpRight className="w-6 h-6 text-washi" />
            </div>
          </div>
          
          <div className="relative z-10 flex justify-between items-end">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-shu-500/15 border border-shu-500/30 rounded-full eyebrow text-shu-300">9 Shipped</span>
              <span className="px-3 py-1.5 bg-washi/8 border border-washi/10 rounded-full eyebrow text-washi/85">App Store & Play Store</span>
            </div>
          </div>
        </DraggableBox>

        {/* Open Source Box — public work, live star count */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('opensource')}
          className="md:col-span-1 md:row-span-1 bg-sumi-900/95 rounded-3xl p-5 border border-washi/10 relative overflow-hidden group cursor-pointer shadow-2xl hover:border-washi/25 hover:bg-sumi-850 transition-colors duration-300 z-10 hover:z-50"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black leading-none text-washi tracking-tight">OPEN<br />SOURCE</h3>
                <p className="eyebrow text-washi-faint mt-1.5">MIT · Public Releases</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-washi/5 flex items-center justify-center group-hover:bg-shu-500 transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4 text-washi" />
              </div>
            </div>
            <div className="mt-4 bg-sumi-950/70 border border-washi/8 rounded-xl p-3">
              <div className="flex items-baseline gap-2">
                <Star className="w-3.5 h-3.5 text-kin-400 shrink-0 self-center" fill="currentColor" />
                <span className="text-lg font-black text-washi leading-none tracking-tight">{starLabel}</span>
                <span className="text-xs text-washi/70 font-medium">stars</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-koke-400"></div>
                <p className="eyebrow text-washi-dim">{portfolioData.openSource.length} Public Repositories</p>
              </div>
            </div>
          </div>
        </DraggableBox>

        {/* Systems Architecture Box — hero card */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('architecture')}
          className="md:col-span-2 md:row-span-1 bg-sumi-900/95 rounded-3xl p-6 border border-washi/10 flex flex-col justify-between relative overflow-hidden shadow-2xl group cursor-pointer hover:border-washi/25 hover:bg-sumi-850 transition-colors duration-300 z-10 hover:z-50"
        >
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 40 40" className="w-10 h-10 shrink-0 text-shu-400 group-hover:text-shu-300 transition-colors" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="4" fill="currentColor" className="animate-pulse" />
              </svg>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-washi self-center">SYSTEMS ARCHITECTURE</h3>
                <p className="text-xs text-washi-dim font-mono">120 FPS · Concurrency · Audio DSP</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-washi/5 flex items-center justify-center group-hover:bg-shu-500 transition-colors">
              <ArrowUpRight className="w-4 h-4 text-washi" />
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-shu-500/12 border border-shu-500/30 rounded-xl p-2 md:p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-shu-400"></div>
                <span className="eyebrow text-shu-300">120 FPS Engine</span>
              </div>
              <div className="bg-washi/5 border border-washi/10 rounded-xl p-2 md:p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-washi/40"></div>
                <span className="eyebrow text-washi/80">AVAudio DSP</span>
              </div>
              <div className="bg-washi/5 border border-washi/10 rounded-xl p-2 md:p-3 hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-washi/40"></div>
                <span className="eyebrow text-washi/80">Offline FTS5</span>
              </div>
            </div>
          </div>
        </DraggableBox>

        {/* Story & Craft Box */}
        <DraggableBox
          variants={itemVariants}
          dragRef={constraintsRef}
          resetSignal={resetSignal}
          onClick={() => setActiveModal('story')}
          className="md:col-span-1 md:row-span-1 bg-sumi-900/95 rounded-3xl p-5 border border-washi/10 flex flex-col justify-between relative overflow-hidden shadow-2xl group cursor-pointer hover:border-washi/25 transition-colors duration-300 z-10 hover:z-50"
        >
          {/* Subtle minimal collage */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px] opacity-25 filter grayscale group-hover:grayscale-0 group-hover:opacity-45 transition-all duration-500 pointer-events-none overflow-hidden rounded-3xl">
            <div className="overflow-hidden bg-sumi-850">
              <img src={asset("assets/apps/zenlife-icon.webp")} alt="ZenLife" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" loading="lazy" decoding="async" />
            </div>
            <div className="overflow-hidden bg-sumi-850">
              <img src={asset("assets/apps/velloreads-icon.webp")} alt="Vellore Ads" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" loading="lazy" decoding="async" />
            </div>
            <div className="overflow-hidden bg-sumi-850">
              <img src={asset("assets/apps/viana360-icon.webp")} alt="Viana 360" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" loading="lazy" decoding="async" />
            </div>
            <div className="overflow-hidden bg-sumi-850">
              <img src={asset("assets/apps/codeshift-preview.svg")} alt="CodeShift" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-sumi-950/90 via-transparent to-sumi-950/60 pointer-events-none rounded-3xl"></div>

          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-2xl font-black tracking-tight text-washi">STORY</h3>
            <div className="w-8 h-8 rounded-full bg-sumi-950/60 border border-washi/10 flex items-center justify-center group-hover:bg-shu-500 transition-colors shadow-xl text-washi">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="relative z-10 mt-auto pb-1">
            <p className="text-sm font-medium text-washi/85">SIMATS '26 · Sound DSP · 10+ Apps</p>
          </div>
        </DraggableBox>

      </motion.div>

      {/* Editorial frame — footer rule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE_OUT_QUART }}
        className="relative z-10 mt-5 w-full max-w-5xl hidden md:flex items-center justify-between border-t border-washi/10 pt-3 font-mono text-[11px] text-washi-dim"
      >
        <span className="flex"><FooterQuip /></span>
        <button
          onClick={() => setResetSignal(s => s + 1)}
          title="put every card back where it belongs"
          className="hidden md:inline-flex items-center gap-1.5 hover:text-washi transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          made a mess? tidy up
        </button>
      </motion.div>

      {/* ================= MODALS ================= */}

      {/* Profile Modal */}
      <Modal isOpen={activeModal === 'profile'} onClose={() => setActiveModal(null)} title="About Kaushal" jp="சுயவிவரம்">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-washi/15 bg-sumi-950 flex items-center justify-center shadow-xl">
              {avatarMode === 'photo' ? (
                <img
                  src={asset("assets/kaushal-opt.webp")}
                  alt="M Kaushal Maran"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              ) : (
                <RobotAvatar size={112} />
              )}
            </div>
            <button
              onClick={() => setAvatarMode(m => m === 'photo' ? 'robot' : 'photo')}
              className="text-[10px] font-mono uppercase tracking-wider text-washi-dim hover:text-shu-300 transition-colors"
            >
              Toggle {avatarMode === 'photo' ? 'Robot Avatar' : 'Real Photo'}
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black tracking-tight text-washi">{portfolioData.profile.name}</h3>
                <span className="px-2 py-0.5 text-xs font-mono bg-shu-500/15 text-shu-300 border border-shu-500/30 rounded-md">
                  {portfolioData.profile.handle}
                </span>
              </div>
              <p className="text-shu-400 font-medium text-sm mt-0.5">{portfolioData.profile.title}</p>
            </div>

            <p className="text-base leading-relaxed text-washi/90">{portfolioData.profile.bio}</p>
            
            <div className="space-y-1.5 pt-2 border-t border-washi/8 text-sm">
              <div className="flex items-center gap-2.5 text-washi-dim">
                <GraduationCap className="w-4 h-4 text-shu-400 shrink-0" />
                <span>{portfolioData.profile.education}</span>
              </div>
              <div className="flex items-center gap-2.5 text-washi-dim">
                <Briefcase className="w-4 h-4 text-kin-400 shrink-0" />
                <span>Mobile App Developer @ SIMATS Engineering College · Ex-Intern @ Redback IT</span>
              </div>
              <div className="flex items-center gap-2.5 text-washi-dim">
                <Globe className="w-4 h-4 text-koke-400 shrink-0" />
                <span>{portfolioData.profile.location} (UTC+5:30)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              <a
                href={`mailto:${portfolioData.profile.links.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-shu-500 hover:bg-shu-600 rounded-xl text-xs font-bold uppercase tracking-wider text-washi transition-colors"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
              <a
                href={portfolioData.profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 rounded-xl text-xs font-bold uppercase tracking-wider text-[#38bdf8] transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn Profile
              </a>
              <button
                onClick={() => { setActiveModal('holo'); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 transition-colors cursor-pointer"
              >
                <Scroll className="w-4 h-4 text-amber-400" /> 3D Palm Leaf (Olaichuvadi)
              </button>
              <a
                href={portfolioData.profile.links.portfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-washi/5 hover:bg-washi/15 border border-washi/10 rounded-xl text-xs font-bold uppercase tracking-wider text-washi transition-colors"
              >
                <Globe className="w-4 h-4" /> 3D Architecture Site ↗
              </a>
            </div>
          </div>
        </div>
      </Modal>

      {/* Tech Stack Modal */}
      <Modal isOpen={activeModal === 'stack'} onClose={() => setActiveModal(null)} title="Tech Stack" jp="தொழில்நுட்பம்" maxWidth="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Mobile Native Core (iOS & Android) */}
          <div className="md:col-span-2 bg-sumi-950/60 border border-washi/8 p-6 rounded-3xl flex flex-col justify-between group hover:border-washi/15 transition-colors">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="w-5 h-5 text-shu-400" />
                <h3 className="text-xl font-bold tracking-tight text-washi">Mobile Native Core</h3>
              </div>
              <p className="text-sm text-washi-dim leading-relaxed max-w-md">
                Production-grade native iOS & Android applications with 120 FPS fluid micro-interactions, hardware acceleration, and clean architecture.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto border-t border-washi/8 pt-6">
              <div>
                <h4 className="eyebrow text-shu-400 mb-3">iOS & Apple Ecosystem</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills["iOS Native"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-washi/5 border border-washi/8 rounded-lg text-xs font-medium text-washi/85">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="eyebrow text-koke-400 mb-3">Android Ecosystem</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills["Android Native"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-washi/5 border border-washi/8 rounded-lg text-xs font-medium text-washi/85">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI, Audio DSP & Neural Nets */}
          <div className="md:col-span-1 bg-gradient-to-b from-shu-500/10 to-sumi-950/60 border border-shu-500/25 p-6 rounded-3xl flex flex-col justify-between group hover:border-shu-500/40 transition-colors relative overflow-hidden">
            <div className="mb-6 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Volume2 className="w-5 h-5 text-shu-400" />
                <h3 className="text-xl font-bold tracking-tight text-washi">AI & Audio DSP</h3>
              </div>
              <p className="text-sm text-washi-dim leading-relaxed">
                Psychoacoustic frequency synthesis, 432 Hz Solfeggio soundscapes, PyTorch DCGAN, and OpenCV vision pipelines.
              </p>
            </div>
            
            <div className="mt-auto relative z-10 border-t border-shu-500/15 pt-6">
              <h4 className="eyebrow text-shu-400/80 mb-3">DSP & Models</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills["AI & DSP"].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-shu-500/12 border border-shu-500/20 rounded-lg text-xs font-medium text-shu-300">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Web & Collaborative Editors */}
          <div className="md:col-span-1 bg-sumi-950/60 border border-washi/8 p-6 rounded-3xl flex flex-col justify-between group hover:border-washi/15 transition-colors">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-washi-dim" />
                <h3 className="text-xl font-bold tracking-tight text-washi">Web & Real-Time</h3>
              </div>
            </div>
            <div className="mt-auto border-t border-washi/8 pt-6">
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills["Web & Full Stack"].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-washi/5 border border-washi/8 rounded-lg text-xs font-medium text-washi/85">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Persistence & Cloud */}
          <div className="md:col-span-1 bg-sumi-950/60 border border-washi/8 p-6 rounded-3xl flex flex-col justify-between group hover:border-washi/15 transition-colors">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="w-5 h-5 text-washi-dim" />
                <h3 className="text-xl font-bold tracking-tight text-washi">Persistence & Cloud</h3>
              </div>
            </div>
            <div className="mt-auto border-t border-washi/8 pt-6">
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills["Persistence & Cloud"].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-washi/5 border border-washi/8 rounded-lg text-xs font-medium text-washi/85">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Tooling */}
          <div className="md:col-span-1 bg-sumi-950/60 border border-washi/8 p-6 rounded-3xl flex flex-col justify-between group hover:border-washi/15 transition-colors">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-5 h-5 text-washi-dim" />
                <h3 className="text-xl font-bold tracking-tight text-washi">Tooling & Ops</h3>
              </div>
            </div>
            <div className="mt-auto border-t border-washi/8 pt-6">
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills["Engineering Tooling"].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-washi/5 border border-washi/8 rounded-lg text-xs font-medium text-washi/85">{s}</span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </Modal>

      {/* Open Source Modal */}
      <Modal isOpen={activeModal === 'opensource'} onClose={() => setActiveModal(null)} title="Open Source & Repositories" jp="பொதுவெளி" maxWidth="max-w-3xl">
        <div className="space-y-5">
          <p className="text-washi/70 text-sm leading-relaxed">
            Public releases, utilities, and research platforms across macOS, iOS, Web, and Computer Vision. Live star counts are fetched directly from GitHub.
          </p>

          <div className="flex flex-col gap-3">
            {portfolioData.openSource.map(item => {
              const href = `https://github.com/${item.repo}`;
              const count = stars[item.repo];
              return (
                <a
                  key={item.name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sumi-950/60 p-5 rounded-2xl border border-washi/10 hover:border-shu-500/40 hover:bg-washi/[0.04] transition-colors group block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold tracking-tight text-washi group-hover:text-shu-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-washi/5 text-washi-dim border border-washi/10">
                          {item.license}
                        </span>
                      </div>
                      <p className="text-washi/70 text-sm leading-relaxed mt-1.5">{item.desc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {count !== undefined ? (
                        <span className="flex items-center gap-1.5 text-washi/90">
                          <Star className="w-3.5 h-3.5 text-kin-400" fill="currentColor" />
                          <span className="text-sm font-bold tabular-nums">{count.toLocaleString()}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-washi-faint">
                          GitHub
                        </span>
                      )}
                      <ExternalLink className="w-4 h-4 text-washi-dim group-hover:text-shu-400 transition-colors" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <a
            href={portfolioData.profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-washi/5 border border-washi/10 hover:border-shu-500 hover:bg-shu-500 rounded-xl text-xs font-bold tracking-wider uppercase text-washi transition-colors"
          >
            All GitHub Repositories <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Modal>

      {/* Projects Showcase Modal — Clean Accordion */}
      <Modal isOpen={activeModal === 'projects'} onClose={() => setActiveModal(null)} title="Projects Craft" jp="படைப்புகள்" maxWidth="max-w-4xl">
        <div className="flex flex-col gap-2 pt-2 pb-6 w-full">
          {portfolioData.projects.map((project, i) => {
            const isPortrait = project.layout === 'portrait';
            const isExpanded = expandedProject === project.name;

            return (
              <div 
                key={project.name} 
                className={`overflow-hidden transition-all duration-500 rounded-[2rem] border ${isExpanded ? 'bg-washi/[0.04] border-washi/20 my-3 shadow-2xl' : 'bg-transparent border-transparent hover:bg-washi/[0.04]'}`}
              >
                {/* Header Row (Clickable) */}
                <div 
                  onClick={() => setExpandedProject(isExpanded ? null : project.name)}
                  className="flex items-center justify-between p-5 md:p-6 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-washi/5 text-washi-faint text-xs font-bold font-mono group-hover:text-shu-400 group-hover:bg-shu-500/10 transition-colors shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-black tracking-tight truncate transition-all duration-500 ${isExpanded ? 'text-2xl md:text-3xl text-washi' : 'text-xl md:text-2xl text-washi/85 group-hover:text-washi'}`}>
                          {project.name}
                        </h4>
                      </div>
                      <span className="text-xs text-washi-dim font-mono">{project.platform}</span>
                    </div>
                  </div>
                  
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${isExpanded ? 'bg-shu-500 border-shu-500 text-washi rotate-45' : 'bg-washi/5 border-washi/10 text-washi/60 group-hover:bg-washi/10 group-hover:text-washi'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                      className="px-5 md:px-6 pb-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch mt-2 mb-2">
                        {/* Text & Meta */}
                        <div className="flex-1 flex flex-col justify-between order-2 md:order-1">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-shu-400"></div>
                              <p className="eyebrow text-washi-dim">VERIFIED PRODUCTION RELEASE</p>
                            </div>
                            <p className="text-base md:text-lg text-washi/85 leading-relaxed font-medium">
                              {project.desc}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {project.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 bg-washi/5 border border-washi/10 rounded-lg text-xs font-mono text-washi/75">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-washi/8">
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-sumi-950 border border-washi/10 hover:border-shu-500 hover:bg-shu-500 transition-colors text-xs font-bold tracking-wider uppercase text-washi group/btn"
                            >
                              Explore Live Platform 
                              <ArrowUpRight className="w-4 h-4 text-washi/60 group-hover/btn:text-washi transition-colors" strokeWidth={2.5} />
                            </a>
                          </div>
                        </div>

                        {/* Image Preview */}
                        <div className={`w-full ${isPortrait ? 'md:w-1/3 max-w-[240px] mx-auto md:mx-0' : 'md:w-[50%]'} shrink-0 relative order-1 md:order-2`}>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="block relative rounded-2xl overflow-hidden border border-washi/10 bg-sumi-950 group/img hover:border-washi/30 transition-all shadow-xl"
                          >
                            <div className={`w-full ${isPortrait ? 'aspect-[9/16]' : 'aspect-[16/9]'} overflow-hidden relative bg-sumi-950`}>
                              <img 
                                src={asset(project.image)} 
                                alt={project.name} 
                                className={`w-full h-full ${isPortrait ? 'object-cover' : 'object-cover object-top'} scale-100 group-hover/img:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] opacity-90 group-hover/img:opacity-100`} 
                                loading="eager"
                                decoding="async"
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20 pointer-events-none bg-sumi-950/30">
                              <div className="w-10 h-10 rounded-full bg-shu-500 flex items-center justify-center text-washi shadow-lg">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </a>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Systems Architecture Modal */}
      <Modal isOpen={activeModal === 'architecture'} onClose={() => setActiveModal(null)} title="Systems Architecture" jp="கட்டமைப்பு" maxWidth="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column (Philosophy & Platforms) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-shu-500/12 to-sumi-950/60 p-6 rounded-3xl border border-shu-500/25 relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-shu-400 mb-4" aria-hidden="true">
                <path d="M10 50 Q 30 10 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M10 50 Q 30 90 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
              </svg>
              <p className="font-serif italic text-washi text-base leading-relaxed">
                “{portfolioData.systemsArchitecture.philosophy}”
              </p>
            </div>

            <div className="bg-sumi-950/60 p-6 rounded-3xl border border-washi/10 relative overflow-hidden">
              <h4 className="text-xs tracking-[0.18em] uppercase font-bold text-washi-dim mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Target Platforms
              </h4>
              <div className="flex flex-wrap gap-2 relative z-10">
                {portfolioData.systemsArchitecture.platforms.map(p => (
                  <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-washi/5 border border-washi/10 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-koke-400"></div>
                    <span className="text-xs font-medium text-washi/90">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Engines & Standards) */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-sumi-950/60 p-6 rounded-3xl border border-washi/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs tracking-[0.18em] uppercase font-bold text-washi-dim flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Core Subsystems & Engines
                </h4>
                <div className="px-3 py-1 bg-shu-500/15 border border-shu-500/25 rounded-full eyebrow text-shu-300">LOW-LEVEL DISCIPLINE</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.systemsArchitecture.engines.map(e => (
                  <div key={e.name} className="bg-washi/5 hover:bg-washi/10 transition-colors p-3.5 rounded-2xl border border-washi/8 border-l-[3px] border-l-transparent hover:border-l-shu-500">
                    <h5 className="text-sm font-bold tracking-tight text-washi">{e.name}</h5>
                    <p className="text-xs text-washi/60 mt-1 leading-snug">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sumi-950/60 p-6 rounded-3xl border border-washi/10">
              <h4 className="text-xs tracking-[0.18em] uppercase font-bold text-washi-dim mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-shu-400" />
                Engineering Benchmarks
              </h4>
              <div className="space-y-2.5">
                {portfolioData.systemsArchitecture.principles.map(item => (
                  <div key={item} className="flex items-center gap-3 bg-washi/5 p-3 rounded-xl border border-washi/8">
                    <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-shu-400"></div>
                    <span className="text-xs md:text-sm font-medium text-washi/90 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </Modal>

      {/* Story & Craft Modal */}
      <Modal isOpen={activeModal === 'story'} onClose={() => setActiveModal(null)} title="Journey & Milestones" jp="பயணம்" maxWidth="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Career Milestones */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="text-sm tracking-[0.18em] uppercase font-bold text-washi-dim flex items-center gap-2">
              <Award className="w-4 h-4 text-shu-400" />
              Career Timeline
            </h4>
            
            <div className="space-y-4 relative border-l border-washi/15 pl-5 ml-2">
              {portfolioData.timeline.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-shu-500 border-2 border-sumi-900"></div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono font-bold text-shu-400">{item.year}</span>
                    <span className="text-xs text-washi-faint font-mono">({item.period})</span>
                  </div>
                  <h5 className="text-base font-bold text-washi mt-0.5">{item.role}</h5>
                  <p className="text-xs text-washi-dim">{item.org}</p>
                  <ul className="mt-2 space-y-1">
                    {item.bullets.map((b, idx) => (
                      <li key={idx} className="text-xs text-washi/75 leading-relaxed">• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Ancient Tamil Olaichuvadi 3D Highlight */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-amber-500/15 via-sumi-950/70 to-sumi-950 p-6 rounded-3xl border border-amber-500/30 text-center">
              <Scroll className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h5 className="text-lg font-black text-washi">Authentic Palm-Leaf Manuscript (ஓலைச்சுவடி)</h5>
              <p className="text-xs text-washi-dim mt-1 mb-4 leading-relaxed">
                Slender Palmyra palm-leaf bookmark bundle tied with natural jute twine. Features swipe/drag leaf animation, fanned arc view, and classical Thirukkural couplets.
              </p>
              <button
                onClick={() => setActiveModal('holo')}
                className="w-full py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Scroll className="w-4 h-4" /> Open Palm-Leaf Manuscript 📜
              </button>
            </div>

            {/* Sound DSP */}
            <div className="bg-sumi-950/60 p-6 rounded-3xl border border-washi/10">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-5 h-5 text-shu-400" />
                <h5 className="text-base font-bold text-washi">Acoustic Soundscapes</h5>
              </div>
              <p className="text-xs text-washi/75 leading-relaxed">
                Composed algorithmic 432 Hz Solfeggio soundscapes for ZenLife. Designed mathematically to stimulate theta waves and promote deep focus.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={portfolioData.flagship.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-shu-400 hover:text-shu-300 transition-colors inline-flex items-center gap-1"
                >
                  Listen in ZenLife on App Store <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </Modal>

      {/* Ancient Tamil Olaichuvadi 3D Modal */}
      <Modal isOpen={activeModal === 'holo'} onClose={() => setActiveModal(null)} title="Palmyra Palm-Leaf (ஓலைச்சுவடி)" jp="திருக்குறள்" maxWidth="max-w-xl">
        <TamilOlaichuvadi3D onClose={() => setActiveModal(null)} />
      </Modal>

    </div>
  );
}
