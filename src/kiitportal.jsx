import { useState, useEffect, useRef } from "react";
import kiitLogo from "./assets/kiit-logo.png";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const STUDENT = {
  name: "Ananya Rao",
  initials: "AR",
  program: "B.Tech",
  branch: "CSE",
  year: 2027,
  rollNo: "21CS3042",
  email: "ananya.rao@university.edu",
  phone: "+91 98765 43210",
  dob: "Mar 14, 2003",
  mentor: "Dr. Mehta",
  hostel: "H-4, Room 214",
  cgpa: 8.62,
  credits: 110,
  totalCredits: 160,
};

const SEMESTERS_LIST = [
  "Spring 2026",
  "Autumn 2025",
  "Spring 2025",
  "Autumn 2024",
  "Spring 2024",
  "Autumn 2023",
];

const ATTENDANCE_DATA = {
  "Spring 2026": {
    overall: 83,
    lowest: 73,
    atRisk: 1,
    attended: 172,
    total: 206,
    subjects: [
      {
        code: "CS3001",
        name: "Operating Systems",
        classes: "38/42",
        pct: 90,
        trend: "+2%",
        trendUp: true,
      },
      {
        code: "CS3022",
        name: "Database Management",
        classes: "34/40",
        pct: 85,
        trend: "+1%",
        trendUp: true,
      },
      {
        code: "CS3043",
        name: "Computer Networks",
        classes: "29/38",
        pct: 76,
        trend: "-3%",
        trendUp: false,
      },
      {
        code: "MA3001",
        name: "Probability & Statistics",
        classes: "31/36",
        pct: 86,
        trend: "0%",
        trendUp: true,
      },
      {
        code: "HS3010",
        name: "Technical Communication",
        classes: "22/30",
        pct: 73,
        trend: "-5%",
        trendUp: false,
      },
      {
        code: "CS3099",
        name: "Minor Project — I",
        classes: "18/20",
        pct: 90,
        trend: "+1%",
        trendUp: true,
      },
    ],
    semTrend: [84, 86, 87, 85, 88, 83],
  },
  "Autumn 2025": {
    overall: 88,
    lowest: 80,
    atRisk: 0,
    attended: 198,
    total: 225,
    subjects: [
      {
        code: "CS3001",
        name: "Operating Systems",
        classes: "42/46",
        pct: 91,
        trend: "+3%",
        trendUp: true,
      },
      {
        code: "CS3005",
        name: "Computer Architecture",
        classes: "38/42",
        pct: 90,
        trend: "+1%",
        trendUp: true,
      },
      {
        code: "CS3010",
        name: "Theory of Computation",
        classes: "36/44",
        pct: 82,
        trend: "-2%",
        trendUp: false,
      },
      {
        code: "MA2001",
        name: "Linear Algebra",
        classes: "40/44",
        pct: 91,
        trend: "+2%",
        trendUp: true,
      },
      {
        code: "HS2010",
        name: "Engineering Ethics",
        classes: "42/50",
        pct: 84,
        trend: "0%",
        trendUp: true,
      },
    ],
    semTrend: [86, 88, 89, 87, 90, 88],
  },
};
const cumTrend = [
  { sem: "Spr 2024", val: 84 },
  { sem: "Aut 2024", val: 86 },
  { sem: "Spr 2025", val: 83 },
  { sem: "Aut 2025", val: 88 },
  { sem: "Spr 2026", val: 83 },
];

const ACADEMICS_DATA = {
  cgpa: 8.62,
  currentSgpa: 8.74,
  credits: 110,
  totalCredits: 160,
  bestSem: "Sem 5",
  semHistory: [
    {
      sem: "Sem 1",
      label: "Autumn 2023",
      sgpa: 7.65,
      credits: 20,
      grade: "B+",
    },
    {
      sem: "Sem 2",
      label: "Spring 2024",
      sgpa: 7.92,
      credits: 22,
      grade: "A-",
    },
    { sem: "Sem 3", label: "Autumn 2024", sgpa: 8.16, credits: 22, grade: "A" },
    { sem: "Sem 4", label: "Spring 2025", sgpa: 8.42, credits: 22, grade: "A" },
    {
      sem: "Sem 5",
      label: "Autumn 2025",
      sgpa: 8.74,
      credits: 24,
      grade: "A+",
    },
    { sem: "Sem 6", label: "Spring 2026", sgpa: null, credits: 24, grade: "—" },
  ],
  detailGrades: {
    "Sem 5": [
      {
        code: "CS3001",
        name: "Operating Systems",
        credits: 4,
        grade: "A+",
        points: 10,
      },
      {
        code: "CS3005",
        name: "Computer Architecture",
        credits: 4,
        grade: "A",
        points: 9,
      },
      {
        code: "CS3010",
        name: "Theory of Computation",
        credits: 3,
        grade: "A+",
        points: 10,
      },
      {
        code: "MA2001",
        name: "Linear Algebra",
        credits: 4,
        grade: "A",
        points: 9,
      },
      {
        code: "HS2010",
        name: "Engineering Ethics",
        credits: 2,
        grade: "B+",
        points: 8,
      },
      {
        code: "CS3098",
        name: "Mini Project",
        credits: 2,
        grade: "O",
        points: 10,
      },
    ],
    "Sem 4": [
      {
        code: "CS2011",
        name: "Algorithms",
        credits: 4,
        grade: "A+",
        points: 10,
      },
      {
        code: "CS2012",
        name: "Data Structures",
        credits: 4,
        grade: "A",
        points: 9,
      },
      {
        code: "CS2020",
        name: "Software Engineering",
        credits: 3,
        grade: "B+",
        points: 8,
      },
      {
        code: "MA2002",
        name: "Probability Theory",
        credits: 4,
        grade: "A",
        points: 9,
      },
      { code: "HS2005", name: "Economics", credits: 2, grade: "B+", points: 8 },
      {
        code: "CS2099",
        name: "Mini Project",
        credits: 2,
        grade: "A",
        points: 9,
      },
    ],
  },
};

const FEES_DATA = {
  amountDue: 12450,
  paidLifetime: 565750,
  nextDue: "Jun 14, 2026",
  currentSem: {
    tuition: 95000,
    exam: 3500,
    lab: 6500,
    hostelMess: 42000,
    library: 1200,
    paid: 135750,
    balance: 12450,
  },
  pastSems: [
    {
      sem: "Sem 5 · Autumn 2025",
      date: "Aug 02, 2025",
      ref: "RC-2025-3201",
      amount: 147000,
    },
    {
      sem: "Sem 4 · Spring 2025",
      date: "Jan 18, 2025",
      ref: "RC-2025-0911",
      amount: 141500,
    },
    {
      sem: "Sem 3 · Autumn 2024",
      date: "Aug 05, 2024",
      ref: "RC-2024-3088",
      amount: 141500,
    },
    {
      sem: "Sem 2 · Spring 2024",
      date: "Jan 10, 2024",
      ref: "RC-2024-0234",
      amount: 138000,
    },
  ],
  transactions: [
    {
      ref: "TXN84211",
      date: "Apr 12, 2026",
      mode: "UPI · HDFC",
      status: "SUCCESS",
      amount: 135750,
    },
    {
      ref: "TXN79034",
      date: "Aug 02, 2025",
      mode: "Net Banking",
      status: "SUCCESS",
      amount: 147000,
    },
    {
      ref: "TXN70112",
      date: "Jan 18, 2025",
      mode: "UPI · SBI",
      status: "SUCCESS",
      amount: 141500,
    },
    {
      ref: "TXN61890",
      date: "Aug 05, 2024",
      mode: "UPI · HDFC",
      status: "SUCCESS",
      amount: 141500,
    },
  ],
};

const RESULTS_DATA = [
  { sem: "Sem 5 · Autumn 2025", sgpa: 8.74, credits: 24, status: "published" },
  { sem: "Sem 4 · Spring 2025", sgpa: 8.42, credits: 22, status: "published" },
  { sem: "Sem 3 · Autumn 2024", sgpa: 8.16, credits: 22, status: "published" },
  { sem: "Sem 2 · Spring 2024", sgpa: 7.92, credits: 22, status: "published" },
  { sem: "Sem 1 · Autumn 2023", sgpa: 7.65, credits: 20, status: "published" },
];

const TIMETABLE_DATA = {
  today: [
    {
      time: "08:30",
      end: "09:30",
      subject: "Operating Systems",
      code: "CS3001",
      room: "LH-204",
      faculty: "Dr. Mehta",
      live: false,
    },
    {
      time: "09:45",
      end: "10:45",
      subject: "Probability & Stats",
      code: "MA3001",
      room: "LH-112",
      faculty: "Prof. Iyer",
      live: false,
    },
    {
      time: "11:00",
      end: "12:00",
      subject: "Database Mgmt",
      code: "CS3022",
      room: "Lab-3",
      faculty: "Dr. Singh",
      live: true,
    },
    {
      time: "14:00",
      end: "15:30",
      subject: "Computer Networks",
      code: "CS3043",
      room: "LH-301",
      faculty: "Dr. Rao",
      live: false,
    },
    {
      time: "15:45",
      end: "17:15",
      subject: "Minor Project",
      code: "CS3099",
      room: "Lab-7",
      faculty: "Dr. Banerjee",
      live: false,
    },
  ],
  week: {
    MON: [
      {
        time: "08:30",
        subject: "Operating Systems",
        code: "CS3001",
        room: "LH-204",
        color: "blue",
      },
      {
        time: "09:45",
        subject: "Probability & Stats",
        code: "MA3001",
        room: "LH-112",
        color: "violet",
      },
      {
        time: "11:00",
        subject: "Database Mgmt",
        code: "CS3022",
        room: "Lab-3",
        color: "emerald",
      },
      {
        time: "14:00",
        subject: "Computer Networks",
        code: "CS3043",
        room: "LH-301",
        color: "orange",
      },
    ],
    TUE: [
      {
        time: "08:30",
        subject: "Operating Systems",
        code: "CS3001",
        room: "LH-204",
        color: "blue",
      },
      {
        time: "09:45",
        subject: "Probability & Stats",
        code: "MA3001",
        room: "LH-112",
        color: "violet",
      },
      {
        time: "11:00",
        subject: "Database Mgmt",
        code: "CS3022",
        room: "LH-205",
        color: "emerald",
      },
      {
        time: "15:45",
        subject: "Minor Project",
        code: "CS3099",
        room: "Lab-7",
        color: "rose",
      },
    ],
    WED: [
      {
        time: "08:30",
        subject: "Tech Communication",
        code: "HS3010",
        room: "LH-110",
        color: "amber",
      },
      {
        time: "09:45",
        subject: "Database Mgmt",
        code: "CS3022",
        room: "LH-205",
        color: "emerald",
      },
      {
        time: "11:00",
        subject: "Computer Networks",
        code: "CS3043",
        room: "LH-301",
        color: "orange",
      },
      {
        time: "14:00",
        subject: "Tech Communication",
        code: "HS3010",
        room: "LH-110",
        color: "amber",
      },
    ],
    THU: [
      {
        time: "08:30",
        subject: "Probability & Stats",
        code: "MA3001",
        room: "LH-112",
        color: "violet",
      },
      {
        time: "09:45",
        subject: "Tech Communication",
        code: "HS3010",
        room: "LH-110",
        color: "amber",
      },
      {
        time: "11:00",
        subject: "Operating Systems",
        code: "CS3001",
        room: "LH-204",
        color: "blue",
      },
      {
        time: "14:00",
        subject: "Computer Networks",
        code: "CS3043",
        room: "Lab-3",
        color: "orange",
      },
    ],
    FRI: [
      {
        time: "08:30",
        subject: "Computer Networks",
        code: "CS3043",
        room: "LH-301",
        color: "orange",
      },
      {
        time: "09:45",
        subject: "Operating Systems",
        code: "CS3001",
        room: "LH-204",
        color: "blue",
      },
      {
        time: "11:00",
        subject: "Minor Project",
        code: "CS3099",
        room: "Lab-7",
        color: "rose",
      },
      {
        time: "14:00",
        subject: "Probability & Stats",
        code: "MA3001",
        room: "LH-112",
        color: "violet",
      },
    ],
    SAT: [
      {
        time: "08:30",
        subject: "Tech Communication",
        code: "HS3010",
        room: "LH-110",
        color: "amber",
      },
      {
        time: "09:45",
        subject: "Database Mgmt",
        code: "CS3022",
        room: "Lab-3",
        color: "emerald",
      },
    ],
  },
};

const NOTICES_DATA = [
  {
    id: 1,
    category: "EXAM",
    title: "Mid-semester exam schedule published",
    body: "The mid-semester examination schedule for Spring 2026 has been officially published. Exams begin May 26, 2026.",
    time: "2h ago",
    pinned: true,
  },
  {
    id: 2,
    category: "ACADEMIC",
    title: "Course registration opens for Autumn 2026",
    body: "Course registration window for Autumn 2026 opens May 22, 2026. All students must register by June 5.",
    time: "Yesterday",
    pinned: true,
  },
  {
    id: 3,
    category: "LIBRARY",
    title: "Return overdue books before May 25",
    body: "All overdue library books must be returned by May 25, 2026 to avoid penalty fees.",
    time: "2d ago",
    pinned: false,
  },
  {
    id: 4,
    category: "HOSTEL",
    title: "Mess menu revision — feedback form",
    body: "Submit your feedback for mess menu revision for June 2026. Forms available at mess office.",
    time: "3d ago",
    pinned: false,
  },
  {
    id: 5,
    category: "ACADEMIC",
    title: "Anti-ragging declaration submission",
    body: "All students must submit the anti-ragging declaration form by May 30, 2026.",
    time: "4d ago",
    pinned: false,
  },
  {
    id: 6,
    category: "EXAM",
    title: "Hall ticket download now available",
    body: "Mid-semester hall tickets are available for download from the portal.",
    time: "5d ago",
    pinned: false,
  },
  {
    id: 7,
    category: "ADMIN",
    title: "Campus Wi-Fi maintenance — May 21",
    body: "Campus Wi-Fi will be unavailable on May 21, 2026 from 2:00 AM to 6:00 AM for maintenance.",
    time: "6d ago",
    pinned: false,
  },
];

const LEAVE_DATA = [
  {
    id: "LV2026-014",
    type: "Medical",
    from: "May 5",
    to: "May 7",
    days: 3,
    reason: "Viral fever — doctor prescribed rest",
    status: "approved",
    approvedBy: "Dr. Mehta",
    date: "May 3, 2026",
  },
  {
    id: "LV2026-009",
    type: "Personal",
    from: "Apr 12",
    to: "Apr 12",
    days: 1,
    reason: "Family function",
    status: "approved",
    approvedBy: "Dr. Mehta",
    date: "Apr 10, 2026",
  },
  {
    id: "LV2026-003",
    type: "Academic",
    from: "Mar 18",
    to: "Mar 19",
    days: 2,
    reason: "Conference participation — IIT Delhi",
    status: "approved",
    approvedBy: "Dr. Mehta",
    date: "Mar 15, 2026",
  },
  {
    id: "LV2025-041",
    type: "Medical",
    from: "Dec 10",
    to: "Dec 12",
    days: 3,
    reason: "Surgery follow-up",
    status: "approved",
    approvedBy: "Dr. Mehta",
    date: "Dec 8, 2025",
  },
  {
    id: "LV2025-038",
    type: "Personal",
    from: "Nov 25",
    to: "Nov 25",
    days: 1,
    reason: "Personal emergency",
    status: "rejected",
    approvedBy: "—",
    date: "Nov 23, 2025",
  },
];

const MESSAGES_DATA = [
  {
    id: 1,
    name: "Dr. Mehta",
    role: "Mentor · CSE",
    avatar: "DM",
    unread: 2,
    preview: "Please submit your minor project progress report by Friday.",
    messages: [
      {
        from: "Dr. Mehta",
        text: "Hi Ananya, hope your mid-sems are going well!",
        time: "May 17",
        self: false,
      },
      {
        from: "me",
        text: "Thank you sir, preparing well for the exams.",
        time: "May 17",
        self: true,
      },
      {
        from: "Dr. Mehta",
        text: "Great. Also, please submit your minor project progress report by Friday.",
        time: "May 18",
        self: false,
      },
      {
        from: "Dr. Mehta",
        text: "Attach the code repository link as well.",
        time: "May 18",
        self: false,
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Singh",
    role: "Faculty · DBMS",
    avatar: "DS",
    unread: 0,
    preview: "Assignment 3 deadline extended to May 23.",
    messages: [
      {
        from: "Dr. Singh",
        text: "Assignment 3 deadline has been extended to May 23 due to mid-sem clash.",
        time: "May 16",
        self: false,
      },
      {
        from: "me",
        text: "Thank you for the extension, Dr. Singh!",
        time: "May 16",
        self: true,
      },
    ],
  },
  {
    id: 3,
    name: "Prof. Iyer",
    role: "Faculty · Mathematics",
    avatar: "PI",
    unread: 1,
    preview: "Bayesian inference problem set is now available on portal.",
    messages: [
      {
        from: "Prof. Iyer",
        text: "The Bayesian inference problem set is now available on the portal. Due May 27.",
        time: "May 15",
        self: false,
      },
    ],
  },
  {
    id: 4,
    name: "Department Notice",
    role: "CSE Department",
    avatar: "CSE",
    unread: 0,
    preview:
      "Internship cell briefing on May 22 at 3pm — mandatory for 3rd year.",
    messages: [
      {
        from: "Department Notice",
        text: "Internship cell briefing session on May 22 at 3:00 PM in Seminar Hall. Attendance mandatory for all 3rd year students.",
        time: "May 14",
        self: false,
      },
    ],
  },
];

const ELECTIVES_DATA = [
  {
    id: "CS4E01",
    name: "Machine Learning",
    dept: "CSE",
    credits: 4,
    seats: 60,
    enrolled: 52,
    instructor: "Dr. Sharma",
    slot: "A",
    days: "MON WED FRI",
    time: "10:00-11:00",
    status: "open",
    prerequisites: "Linear Algebra, Probability",
  },
  {
    id: "CS4E02",
    name: "Blockchain Technology",
    dept: "CSE",
    credits: 3,
    seats: 40,
    enrolled: 39,
    instructor: "Dr. Kumar",
    slot: "B",
    days: "TUE THU",
    time: "11:15-12:45",
    status: "filling",
    prerequisites: "Data Structures",
  },
  {
    id: "CS4E03",
    name: "Cloud Computing",
    dept: "CSE",
    credits: 3,
    seats: 50,
    enrolled: 31,
    instructor: "Prof. Das",
    slot: "C",
    days: "MON WED",
    time: "14:00-15:30",
    status: "open",
    prerequisites: "Computer Networks",
  },
  {
    id: "CS4E04",
    name: "Natural Language Processing",
    dept: "CSE",
    credits: 4,
    seats: 35,
    enrolled: 35,
    instructor: "Dr. Gupta",
    slot: "A",
    days: "MON WED FRI",
    time: "10:00-11:00",
    status: "full",
    prerequisites: "Machine Learning",
  },
  {
    id: "MA4E01",
    name: "Graph Theory",
    dept: "Math",
    credits: 3,
    seats: 45,
    enrolled: 22,
    instructor: "Prof. Nair",
    slot: "D",
    days: "TUE THU SAT",
    time: "08:30-09:30",
    status: "open",
    prerequisites: "Linear Algebra",
  },
  {
    id: "HS4E01",
    name: "Technology & Society",
    dept: "HSS",
    credits: 2,
    seats: 80,
    enrolled: 67,
    instructor: "Dr. Rao",
    slot: "E",
    days: "FRI",
    time: "14:00-15:30",
    status: "open",
    prerequisites: "None",
  },
];

const EXAM_SCHEDULE_DATA = [
  {
    code: "CS3001",
    name: "Operating Systems",
    date: "May 26",
    day: "Mon",
    time: "09:00 AM",
    room: "Block-A, Hall 2",
    seat: "A-142",
    duration: "3 hrs",
    registered: true,
  },
  {
    code: "CS3022",
    name: "Database Management",
    date: "May 28",
    day: "Wed",
    time: "02:00 PM",
    room: "Block-B, Hall 1",
    seat: "B-087",
    duration: "3 hrs",
    registered: true,
  },
  {
    code: "CS3043",
    name: "Computer Networks",
    date: "May 30",
    day: "Fri",
    time: "09:00 AM",
    room: "Block-A, Hall 3",
    seat: "A-219",
    duration: "3 hrs",
    registered: true,
  },
  {
    code: "MA3001",
    name: "Probability & Statistics",
    date: "Jun 2",
    day: "Mon",
    time: "02:00 PM",
    room: "Block-C, Hall 1",
    seat: "C-056",
    duration: "2.5 hrs",
    registered: true,
  },
  {
    code: "HS3010",
    name: "Technical Communication",
    date: "Jun 4",
    day: "Wed",
    time: "09:00 AM",
    room: "Block-B, Hall 3",
    seat: "B-198",
    duration: "2 hrs",
    registered: true,
  },
  {
    code: "CS3099",
    name: "Minor Project Viva",
    date: "Jun 7",
    day: "Sat",
    time: "10:00 AM",
    room: "CSE Seminar Hall",
    seat: "—",
    duration: "30 min/student",
    registered: false,
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => "₹" + n.toLocaleString("en-IN");
const pctColor = (p) =>
  p >= 85 ? "text-emerald-500" : p >= 75 ? "text-amber-500" : "text-red-500";
const pctBg = (p) =>
  p >= 85 ? "bg-emerald-500" : p >= 75 ? "bg-amber-500" : "bg-red-500";
const gradeColor = (g) =>
  ["O", "A+"].includes(g)
    ? "text-emerald-500"
    : g === "A"
      ? "text-blue-500"
      : g === "B+"
        ? "text-amber-500"
        : "text-gray-400";

const CAT_COLORS = {
  EXAM: "bg-red-500/10 text-red-400 border-red-500/20",
  ACADEMIC: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  LIBRARY: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  HOSTEL: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  ADMIN: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};
const CAT_COLORS_LIGHT = {
  EXAM: "bg-red-50 text-red-600 border-red-200",
  ACADEMIC: "bg-blue-50 text-blue-600 border-blue-200",
  LIBRARY: "bg-amber-50 text-amber-600 border-amber-200",
  HOSTEL: "bg-violet-50 text-violet-600 border-violet-200",
  ADMIN: "bg-gray-100 text-gray-600 border-gray-200",
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const getTokens = () => ({
  // Backgrounds
  pageBg: "bg-[#fdf9f3]",
  sidebarBg: "bg-[#fbf1e1] border-slate-200",
  cardBg: "bg-[#fffaf4] border-slate-200",
  cardHover: "hover:bg-[#f4efe3] hover:shadow-sm",
  cardElevated: "bg-[#f7f2e7] border-slate-200",
  headerBg: "bg-[#fbf2e5] border-slate-200",
  inputBg: "bg-[#fcf5e8] border-slate-200 text-slate-950",
  // Text
  textPrimary: "text-slate-950",
  textSecondary: "text-slate-600",
  textMuted: "text-slate-400",
  // Dividers
  divider: "border-slate-200",
  // Nav states
  navActive: "bg-[#e6f7eb] text-slate-950 shadow-sm border border-sky-100",
  navInactive: "text-slate-600 hover:bg-[#ecf8f2] hover:text-slate-950",
  // Accent badge
  catColors: CAT_COLORS_LIGHT,
});

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
function StatCard({ label, value, sub, valueClass = "", dm }) {
  const t = getTokens(dm);
  return (
    <div
      className={`border rounded-xl p-4 transition-shadow ${t.cardBg} ${t.cardHover}`}
    >
      <div
        className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${t.textMuted}`}
      >
        {label}
      </div>
      <div className={`text-2xl font-semibold ${valueClass}`}>{value}</div>
      {sub && <div className={`text-xs mt-1 ${t.textSecondary}`}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ pct }) {
  return (
    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${pctBg(pct)}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SemSelector({ value, onChange, list, dm }) {
  const t = getTokens(dm);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer ${t.inputBg}`}
    >
      {list.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  );
}

function Badge({ text, className = "" }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${className}`}
    >
      {text}
    </span>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${
        value ? "bg-sky-600" : "bg-slate-300"
      }`}
      aria-pressed={value}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Sparkline({ data, width = 200, height = 60, color = "#10b981" }) {
  const min = Math.min(...data),
    max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 14) - 7;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 14) - 7;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

function BarChart({ data, dm }) {
  const max = Math.max(...data.map((d) => d.val));
  const t = getTokens(dm);
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className={`text-[10px] ${t.textSecondary}`}>{d.val}</span>
          <div
            className="w-full rounded-t transition-all duration-300 bg-slate-300"
            style={{ height: `${(d.val / max) * 72}px` }}
          />
          <span
            className={`text-[10px] ${t.textMuted} truncate w-full text-center`}
          >
            {d.sem}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── QUICK ACTIONS ────────────────────────────────────────────────────────────
function QuickActions({ dm, setPage }) {
  const t = getTokens(dm);
  const [loadingId, setLoadingId] = useState(null);
  const [doneId, setDoneId] = useState(null);

  const actions = [
    {
      id: "fees",
      icon: "💳",
      title: "Pay fees",
      sub: "₹12,450 due Jun 14",
      badge: "DUE SOON",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      page: "fees",
    },
    {
      id: "register",
      icon: "📋",
      title: "Register courses",
      sub: "Autumn 2026 window open",
      badge: "OPEN",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      page: "exams",
    },
    {
      id: "admit",
      icon: "🪪",
      title: "Download admit card",
      sub: "Mid-sem · ready",
      badge: "READY",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      page: null,
      download: true,
    },
    {
      id: "results",
      icon: "📊",
      title: "View results",
      sub: "Semester 5 published",
      badge: null,
      page: "results",
    },
    {
      id: "electives",
      icon: "🎯",
      title: "Book electives",
      sub: "4 open slots available",
      badge: "4 OPEN",
      badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
      page: "exams",
    },
    {
      id: "leave",
      icon: "🏥",
      title: "Apply leave",
      sub: "5 medical leaves remaining",
      badge: null,
      page: "leave",
    },
    {
      id: "mentor",
      icon: "💬",
      title: "Contact mentor",
      sub: "Dr. Mehta · CSE",
      badge: null,
      page: "communication",
    },
  ];

  const handleClick = (action) => {
    if (action.download) {
      setLoadingId(action.id);
      setTimeout(() => {
        setLoadingId(null);
        setDoneId(action.id);
        setTimeout(() => setDoneId(null), 1800);
      }, 1200);
      return;
    }
    if (action.page) setPage(action.page);
  };

  return (
    <div className={`border rounded-3xl ${t.cardBg} shadow-sm`}>
      <div
        className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b ${t.divider}`}
      >
        <div>
          <span className={`font-semibold text-sm ${t.textPrimary}`}>
            Quick actions
          </span>
          <p className={`text-xs ${t.textSecondary} mt-1`}>
            Essential academic workflows, now faster to access.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
          Utility hub
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => handleClick(a)}
            className="group flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-left transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                {loadingId === a.id ? "⏳" : doneId === a.id ? "✅" : a.icon}
              </div>
              {a.badge && (
                <Badge text={a.badge} className={`${a.badgeClass} px-2`} />
              )}
            </div>
            <div>
              <div className={`text-sm font-semibold ${t.textPrimary}`}>
                {a.title}
              </div>
              <div className={`text-xs leading-snug ${t.textSecondary} mt-1`}>
                {loadingId === a.id
                  ? "Preparing download…"
                  : doneId === a.id
                    ? "Completed"
                    : a.sub}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Proceed
              </span>
              <span className="text-base">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ darkMode, setPage }) {
  const t = getTokens(darkMode);
  const dm = darkMode;

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            DASHBOARD
          </div>
          <h1 className={`text-2xl sm:text-3xl font-semibold ${t.textPrimary}`}>
            Good afternoon, Ananya
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <p className={`text-sm ${t.textSecondary}`}>
              Spring 2026 · Week 14 of 20
            </p>
            <span className="text-xs text-emerald-500 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              SAP sync · 2 min ago
            </span>
          </div>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            {
              label: "ATTENDANCE",
              val: "87.4%",
              sub: "Threshold 75%",
              badge: "+2.1%",
              valClass: "text-emerald-500",
              pct: 87,
            },
            {
              label: "CGPA",
              val: "8.62",
              sub: "5 of 8 semesters",
              badge: "+0.14",
              valClass: dm ? "text-[#ededed]" : "text-gray-900",
            },
            {
              label: "CURRENT SEMESTER",
              val: "Sem 6",
              sub: "6 courses · 22 credits",
              valClass: dm ? "text-[#ededed]" : "text-gray-900",
            },
            {
              label: "PENDING DUES",
              val: "₹12,450",
              sub: "Due Jun 14, 2026",
              valClass: "text-amber-500",
            },
          ].map((c, i) => (
            <div
              key={i}
              className={`border rounded-xl p-4 transition-all duration-150 ${t.cardBg} ${t.cardHover}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}
                >
                  {c.label}
                </span>
                {c.badge && (
                  <span
                    className={`text-xs font-semibold ${i === 3 ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {i === 3 ? "↘" : "↗"} {c.badge}
                  </span>
                )}
              </div>
              <div className={`text-2xl font-semibold mb-1 ${c.valClass}`}>
                {c.val}
              </div>
              <div className={`text-xs ${t.textSecondary}`}>{c.sub}</div>
              {c.pct && (
                <div
                  className={`mt-3 h-1 rounded-full ${dm ? "bg-white/5" : "bg-gray-100"}`}
                >
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subject attendance + schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          <div className={`col-span-3 border rounded-xl ${t.cardBg}`}>
            <div
              className={`flex items-center justify-between px-5 py-3.5 border-b ${t.divider}`}
            >
              <div>
                <div className={`font-semibold text-sm ${t.textPrimary}`}>
                  Subject attendance
                </div>
                <div className={`text-xs ${t.textSecondary}`}>
                  Spring 2026 · 6 courses
                </div>
              </div>
              <button
                onClick={() => setPage("attendance")}
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-medium"
              >
                View all →
              </button>
            </div>
            <div className="p-0">
              <div
                className={`grid grid-cols-4 text-[10px] font-bold uppercase tracking-widest ${t.textMuted} py-2.5 px-5 border-b ${t.divider}`}
              >
                <span className="col-span-2">COURSE</span>
                <span className="text-center">CLASSES</span>
                <span className="text-right">%</span>
              </div>
              {ATTENDANCE_DATA["Spring 2026"].subjects.map((s, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-4 items-center py-3 px-5 border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
                >
                  <div className="col-span-2">
                    <div className={`text-sm font-medium ${t.textPrimary}`}>
                      {s.name}
                    </div>
                    <div className={`text-xs ${t.textMuted}`}>{s.code}</div>
                  </div>
                  <div className={`text-sm text-center ${t.textSecondary}`}>
                    {s.classes}
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${pctColor(s.pct)}`}>
                      {s.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`col-span-2 border rounded-xl ${t.cardBg}`}>
            <div
              className={`flex items-center justify-between px-5 py-3.5 border-b ${t.divider}`}
            >
              <div>
                <div className={`font-semibold text-sm ${t.textPrimary}`}>
                  Today · Tue, May 19
                </div>
                <div className={`text-xs ${t.textSecondary}`}>
                  5 classes scheduled
                </div>
              </div>
            </div>
            <div className="p-4 space-y-1.5">
              {TIMETABLE_DATA.today.map((c, i) => (
                <div
                  key={i}
                  className={`flex gap-3 items-start p-2.5 rounded-lg transition-colors ${c.live ? (dm ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-100") : t.cardHover}`}
                >
                  <div className="text-right min-w-[38px]">
                    <div className={`text-xs font-semibold ${t.textPrimary}`}>
                      {c.time}
                    </div>
                    <div className={`text-[10px] ${t.textMuted}`}>{c.end}</div>
                  </div>
                  <div
                    className={`w-0.5 self-stretch rounded-full mt-1 ${c.live ? "bg-emerald-500" : dm ? "bg-white/10" : "bg-gray-200"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-xs font-semibold ${t.textPrimary}`}
                      >
                        {c.subject}
                      </span>
                      {c.live && (
                        <Badge
                          text="LIVE"
                          className={
                            dm
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          }
                        />
                      )}
                    </div>
                    <div className={`text-[10px] ${t.textSecondary}`}>
                      {c.code} · {c.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notices + Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className={`border rounded-xl ${t.cardBg}`}>
            <div
              className={`flex items-center justify-between px-5 py-3.5 border-b ${t.divider}`}
            >
              <div
                className={`font-semibold text-sm flex items-center gap-2 ${t.textPrimary}`}
              >
                <span>Notices</span>
                <Badge
                  text="2 new"
                  className={
                    dm
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }
                />
              </div>
              <button
                onClick={() => setPage("notices")}
                className="text-xs text-blue-500 hover:text-blue-400 font-medium"
              >
                All →
              </button>
            </div>
            <div className="p-2">
              {NOTICES_DATA.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className={`flex gap-3 p-2.5 rounded-lg ${t.cardHover} cursor-pointer transition-colors`}
                >
                  <Badge
                    text={n.category}
                    className={t.catColors[n.category]}
                  />
                  <div>
                    <div className={`text-xs font-semibold ${t.textPrimary}`}>
                      {n.title}
                    </div>
                    <div className={`text-[10px] ${t.textMuted} mt-0.5`}>
                      {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`border rounded-xl ${t.cardBg}`}>
            <div
              className={`flex items-center justify-between px-5 py-3.5 border-b ${t.divider}`}
            >
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Upcoming deadlines
              </div>
              <Badge
                text="1 urgent"
                className={
                  dm
                    ? "bg-red-500/15 text-red-400 border-red-500/25"
                    : "bg-red-50 text-red-700 border-red-200"
                }
              />
            </div>
            <div className="p-4 space-y-3">
              {[
                {
                  title: "DBMS Assignment 3 — Normalization",
                  course: "CS3022 · Due May 21",
                  urgency: "in 2 days",
                  color: "bg-red-500",
                  urgClass: dm
                    ? "bg-red-500/10 text-red-400"
                    : "bg-red-50 text-red-600",
                },
                {
                  title: "Networks Lab Report — Wk 9",
                  course: "CS3043 · Due May 24",
                  urgency: "in 5 days",
                  color: "bg-amber-400",
                  urgClass: dm
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-amber-50 text-amber-600",
                },
                {
                  title: "Problem set: Bayesian inference",
                  course: "MA3001 · Due May 27",
                  urgency: "in 8 days",
                  color: dm ? "bg-white/20" : "bg-gray-400",
                  urgClass: dm
                    ? "bg-white/5 text-[#888]"
                    : "bg-gray-100 text-gray-500",
                },
                {
                  title: "OS quiz — Process scheduling",
                  course: "CS3001 · Due May 29",
                  urgency: "in 10 days",
                  color: dm ? "bg-white/10" : "bg-gray-300",
                  urgClass: dm
                    ? "bg-white/5 text-[#888]"
                    : "bg-gray-100 text-gray-500",
                },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.color}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-semibold truncate ${t.textPrimary}`}
                    >
                      {d.title}
                    </div>
                    <div className={`text-[10px] ${t.textSecondary}`}>
                      {d.course}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold flex-shrink-0 ${d.urgClass}`}
                  >
                    {d.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions dm={dm} setPage={setPage} />
      </div>
    </div>
  );
}

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────
function Attendance({ darkMode }) {
  const [sem, setSem] = useState("Spring 2026");
  const [search, setSearch] = useState("");
  const dm = darkMode;
  const t = getTokens(dm);
  const data = ATTENDANCE_DATA[sem] || ATTENDANCE_DATA["Spring 2026"];
  const filtered = data.subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
            >
              RECORDS
            </div>
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
            >
              Attendance
            </h1>
            <p className={`text-sm ${t.textSecondary}`}>
              Track your class attendance and monitor low-attendance subjects.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SemSelector
              value={sem}
              onChange={setSem}
              list={SEMESTERS_LIST}
              dm={dm}
            />
            <button
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm ${t.inputBg} ${t.cardHover} transition-colors`}
            >
              ↓ Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatCard
            dm={dm}
            label="OVERALL"
            value={`${data.overall}%`}
            sub={`${data.subjects.length} courses`}
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
          <StatCard
            dm={dm}
            label="LOWEST"
            value={`${data.lowest}%`}
            sub={data.subjects.find((s) => s.pct === data.lowest)?.name}
            valueClass="text-red-500"
          />
          <StatCard
            dm={dm}
            label="AT RISK"
            value={data.atRisk}
            sub="Below 75% threshold"
            valueClass="text-amber-500"
          />
          <StatCard
            dm={dm}
            label="CLASSES ATTENDED"
            value={data.attended}
            sub={`of ${data.total}`}
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className={`col-span-3 border rounded-xl ${t.cardBg}`}>
            <div
              className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b ${t.divider}`}
            >
              <div>
                <div className={`font-semibold text-sm ${t.textPrimary}`}>
                  Subject breakdown
                </div>
                <div className={`text-xs ${t.textSecondary}`}>
                  {sem} · {filtered.length} courses
                </div>
              </div>
              <div
                className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm ${t.inputBg}`}
              >
                <span className={t.textMuted}>🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject…"
                  className={`outline-none text-sm w-32 bg-transparent ${t.textPrimary}`}
                />
              </div>
            </div>
            <div>
              <div
                className={`grid grid-cols-5 text-[10px] font-bold uppercase tracking-widest ${t.textMuted} py-2.5 px-5 border-b ${t.divider}`}
              >
                <span className="col-span-2">COURSE</span>
                <span className="text-center">CLASSES</span>
                <span className="text-center">%</span>
                <span className="text-center">TREND</span>
              </div>
              {filtered.map((s, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 items-center py-3 px-5 border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
                >
                  <div className="col-span-2">
                    <div className={`text-sm font-semibold ${t.textPrimary}`}>
                      {s.name}
                    </div>
                    <div className={`text-xs ${t.textMuted}`}>{s.code}</div>
                  </div>
                  <div className={`text-sm text-center ${t.textSecondary}`}>
                    {s.classes}
                  </div>
                  <div className="px-2">
                    <span className={`text-sm font-bold ${pctColor(s.pct)}`}>
                      {s.pct}%
                    </span>
                    <ProgressBar pct={s.pct} />
                  </div>
                  <div
                    className={`text-xs text-center font-semibold ${s.trendUp ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {s.trendUp ? "↗" : "↘"} {s.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 space-y-4">
            <div className={`border rounded-xl p-5 ${t.cardBg}`}>
              <div className={`font-semibold text-sm mb-1 ${t.textPrimary}`}>
                Cumulative trend
              </div>
              <div className={`text-xs ${t.textSecondary} mb-4`}>
                Last 5 semesters
              </div>
              <Sparkline
                data={cumTrend.map((d) => d.val)}
                width={280}
                height={70}
                color="#10b981"
              />
              <div className="flex justify-between mt-2">
                {cumTrend.map((d) => (
                  <span key={d.sem} className={`text-[10px] ${t.textMuted}`}>
                    {d.sem}
                  </span>
                ))}
              </div>
            </div>

            {data.subjects.filter((s) => s.pct < 75).length > 0 && (
              <div className={`border rounded-xl p-5 ${t.cardBg}`}>
                <div className={`font-semibold text-sm mb-1 ${t.textPrimary}`}>
                  At-risk subjects
                </div>
                <div className={`text-xs ${t.textSecondary} mb-3`}>
                  Below 75% required
                </div>
                {data.subjects
                  .filter((s) => s.pct < 75)
                  .map((s, i) => (
                    <div
                      key={i}
                      className={`border rounded-lg p-3 ${dm ? "border-red-500/20 bg-red-500/10" : "border-red-200 bg-red-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 text-sm">⚠</span>
                          <span
                            className={`text-sm font-semibold ${dm ? "text-red-300" : "text-red-800"}`}
                          >
                            {s.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-red-500">
                          {s.pct}%
                        </span>
                      </div>
                      <div
                        className={`text-xs mt-1 ml-5 ${dm ? "text-red-400" : "text-red-600"}`}
                      >
                        Attend next 2 classes to recover.
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className={`border rounded-xl p-5 ${t.cardBg}`}>
              <div className={`font-semibold text-sm mb-3 ${t.textPrimary}`}>
                Semester history
              </div>
              <div className="space-y-1">
                {SEMESTERS_LIST.slice(0, 5).map((s, i) => {
                  const d = ATTENDANCE_DATA[s];
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-2 border-b last:border-0 ${t.divider}`}
                    >
                      <span className={`text-sm ${t.textSecondary}`}>{s}</span>
                      {d ? (
                        <span
                          className={`text-sm font-bold ${pctColor(d.overall)}`}
                        >
                          {d.overall}%
                        </span>
                      ) : (
                        <span className={`text-sm ${t.textMuted}`}>—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACADEMICS ────────────────────────────────────────────────────────────────
function Academics({ darkMode }) {
  const [selectedSem, setSelectedSem] = useState(null);
  const dm = darkMode;
  const t = getTokens(dm);
  const d = ACADEMICS_DATA;

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
            >
              RECORDS
            </div>
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
            >
              Academic performance
            </h1>
            <p className={`text-sm ${t.textSecondary}`}>
              Your grades, semester GPAs and cumulative progress towards
              graduation.
            </p>
          </div>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm ${t.inputBg} ${t.cardHover} transition-colors`}
          >
            ↓ Transcript
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatCard
            dm={dm}
            label="CGPA"
            value={d.cgpa}
            sub={`${d.semHistory.filter((s) => s.sgpa).length} semesters`}
            valueClass="text-emerald-500"
          />
          <StatCard
            dm={dm}
            label="CURRENT SGPA"
            value={d.currentSgpa}
            sub="Sem 5"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
          <StatCard
            dm={dm}
            label="CREDITS EARNED"
            value={d.credits}
            sub={`of ${d.totalCredits} required`}
            valueClass="text-blue-500"
          />
          <StatCard
            dm={dm}
            label="BEST SEMESTER"
            value={d.currentSgpa}
            sub={d.bestSem}
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          <div className={`col-span-3 border rounded-xl p-5 ${t.cardBg}`}>
            <div className={`font-semibold text-sm mb-1 ${t.textPrimary}`}>
              SGPA timeline
            </div>
            <div className={`text-xs ${t.textSecondary} mb-4`}>
              Completed semesters
            </div>
            <BarChart
              data={d.semHistory
                .filter((s) => s.sgpa)
                .map((s) => ({ sem: s.sem, val: s.sgpa }))}
              dm={dm}
            />
          </div>

          <div className={`col-span-2 border rounded-xl p-5 ${t.cardBg}`}>
            <div className={`font-semibold text-sm mb-1 ${t.textPrimary}`}>
              Credit progress
            </div>
            <div className={`text-xs ${t.textSecondary} mb-4`}>
              {d.credits} / {d.totalCredits} credits
            </div>
            <div
              className={`w-full rounded-full h-2.5 mb-4 ${dm ? "bg-white/5" : "bg-gray-100"}`}
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${(d.credits / d.totalCredits) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-3 text-center gap-2">
              <div>
                <div className={`text-xl font-bold ${t.textPrimary}`}>
                  {Math.round((d.credits / d.totalCredits) * 100)}%
                </div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}
                >
                  COMPLETE
                </div>
              </div>
              <div>
                <div className={`text-xl font-bold ${t.textPrimary}`}>
                  {d.totalCredits - d.credits}
                </div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}
                >
                  REMAINING
                </div>
              </div>
              <div>
                <div className={`text-xl font-bold ${t.textPrimary}`}>3</div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}
                >
                  SEMS LEFT
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`border rounded-xl ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Semester history
            </div>
            <div className={`text-xs ${t.textSecondary}`}>
              Click a semester to view grades
            </div>
          </div>
          {d.semHistory.map((s, i) => (
            <div key={i}>
              <button
                onClick={() =>
                  setSelectedSem(selectedSem === s.sem ? null : s.sem)
                }
                className={`w-full flex items-center justify-between px-5 py-3.5 border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-semibold ${t.textPrimary}`}>
                    {s.sem} · {s.label}
                  </span>
                  <span className={`text-xs ${t.textMuted}`}>
                    {s.credits} cr
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {s.sgpa ? (
                    <span className={`text-sm font-bold ${t.textPrimary}`}>
                      {s.sgpa}
                    </span>
                  ) : (
                    <span className={t.textMuted}>—</span>
                  )}
                  <span
                    className={`text-xs transition-transform duration-200 ${selectedSem === s.sem ? "rotate-180" : ""} ${t.textMuted}`}
                  >
                    ▾
                  </span>
                </div>
              </button>
              {selectedSem === s.sem && d.detailGrades[s.sem] && (
                <div
                  className={`px-5 py-3 border-b ${t.divider} ${dm ? "bg-[#0a0a0b]" : "bg-gray-50"}`}
                >
                  <div
                    className={`grid grid-cols-5 text-[10px] font-bold uppercase tracking-widest ${t.textMuted} mb-2 px-2`}
                  >
                    <span className="col-span-2">SUBJECT</span>
                    <span className="text-center">CREDITS</span>
                    <span className="text-center">GRADE</span>
                    <span className="text-center">POINTS</span>
                  </div>
                  {d.detailGrades[s.sem].map((g, j) => (
                    <div
                      key={j}
                      className={`grid grid-cols-5 items-center py-2.5 px-2 border-b last:border-0 ${t.divider}`}
                    >
                      <div className="col-span-2">
                        <div className={`text-sm ${t.textPrimary}`}>
                          {g.name}
                        </div>
                        <div className={`text-xs ${t.textMuted}`}>{g.code}</div>
                      </div>
                      <div className={`text-sm text-center ${t.textSecondary}`}>
                        {g.credits}
                      </div>
                      <div
                        className={`text-sm text-center font-bold ${gradeColor(g.grade)}`}
                      >
                        {g.grade}
                      </div>
                      <div className={`text-sm text-center ${t.textPrimary}`}>
                        {g.points}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FEES ─────────────────────────────────────────────────────────────────────
function Fees({ darkMode }) {
  const dm = darkMode;
  const t = getTokens(dm);
  const d = FEES_DATA;

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
            >
              RECORDS
            </div>
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
            >
              Fees & payments
            </h1>
            <p className={`text-sm ${t.textSecondary}`}>
              Manage your semester fees, view dues and download receipts.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm">
            💳 Pay ₹12,450
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatCard
            dm={dm}
            label="AMOUNT DUE"
            value={fmt(d.amountDue)}
            sub="By Jun 14, 2026"
            valueClass="text-amber-500"
          />
          <StatCard
            dm={dm}
            label="CURRENT SEMESTER"
            value="Sem 6"
            sub="Partially paid"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
          <StatCard
            dm={dm}
            label="PAID LIFETIME"
            value={fmt(d.paidLifetime)}
            sub="4 transactions"
            valueClass="text-emerald-500"
          />
          <StatCard
            dm={dm}
            label="NEXT DUE"
            value={d.nextDue}
            sub="Late fee ₹500/week"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          <div className={`col-span-3 border rounded-xl ${t.cardBg}`}>
            <div className={`px-5 py-3.5 border-b ${t.divider}`}>
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Current semester breakdown
              </div>
              <div className={`text-xs ${t.textSecondary}`}>
                Sem 6 · Spring 2026
              </div>
            </div>
            {[
              { label: "Tuition fee", amt: d.currentSem.tuition },
              { label: "Examination fee", amt: d.currentSem.exam },
              { label: "Lab fee", amt: d.currentSem.lab },
              { label: "Hostel & mess", amt: d.currentSem.hostelMess },
              { label: "Library", amt: d.currentSem.library },
            ].map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3 border-b ${t.divider}`}
              >
                <span className={`text-sm ${t.textSecondary}`}>{r.label}</span>
                <span className={`text-sm font-medium ${t.textPrimary}`}>
                  {fmt(r.amt)}
                </span>
              </div>
            ))}
            <div
              className={`flex items-center justify-between px-5 py-3 border-b ${t.divider}`}
            >
              <span className={`text-sm ${t.textMuted}`}>Paid (Apr 12)</span>
              <span className="text-sm font-semibold text-emerald-500">
                − {fmt(d.currentSem.paid)}
              </span>
            </div>
            <div className={`flex items-center justify-between px-5 py-3.5`}>
              <span className={`text-sm font-bold ${t.textPrimary}`}>
                Balance due
              </span>
              <span className="text-sm font-bold text-amber-500">
                {fmt(d.currentSem.balance)}
              </span>
            </div>
          </div>

          <div className={`col-span-2 border rounded-xl ${t.cardBg}`}>
            <div className={`px-5 py-3.5 border-b ${t.divider}`}>
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Past semesters
              </div>
            </div>
            <div className="p-4 space-y-2">
              {d.pastSems.map((p, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 border-b last:border-0 ${t.divider}`}
                >
                  <div>
                    <div className={`text-sm font-semibold ${t.textPrimary}`}>
                      {p.sem}
                    </div>
                    <div className={`text-xs ${t.textMuted}`}>
                      Paid {p.date} · {p.ref}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${t.textPrimary}`}>
                      {fmt(p.amount)}
                    </span>
                    <button
                      className={`${t.textMuted} hover:text-blue-500 text-sm transition-colors`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`border rounded-xl ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Transaction history
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr
                  className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted} border-b ${t.divider}`}
                >
                  {[
                    "REFERENCE",
                    "DATE",
                    "MODE",
                    "STATUS",
                    "AMOUNT",
                    "RECEIPT",
                  ].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.transactions.map((tx, i) => (
                  <tr
                    key={i}
                    className={`border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
                  >
                    <td
                      className={`px-5 py-3 text-xs font-mono ${t.textSecondary}`}
                    >
                      {tx.ref}
                    </td>
                    <td className={`px-5 py-3 text-sm ${t.textMuted}`}>
                      {tx.date}
                    </td>
                    <td className={`px-5 py-3 text-sm ${t.textSecondary}`}>
                      {tx.mode}
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        text={tx.status}
                        className={
                          dm
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }
                      />
                    </td>
                    <td
                      className={`px-5 py-3 text-sm font-semibold ${t.textPrimary}`}
                    >
                      {fmt(tx.amount)}
                    </td>
                    <td className="px-5 py-3">
                      <button className="text-xs text-blue-500 hover:underline font-medium">
                        📄 PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function Results({ darkMode }) {
  const [selected, setSelected] = useState("Sem 5");
  const dm = darkMode;
  const t = getTokens(dm);

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
            >
              RECORDS
            </div>
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
            >
              Results
            </h1>
            <p className={`text-sm ${t.textSecondary}`}>
              Semester-wise results, marksheets and SGPA/CGPA overview.
            </p>
          </div>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm ${t.inputBg} ${t.cardHover} transition-colors`}
          >
            ↓ Marksheet
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatCard
            dm={dm}
            label="CGPA"
            value="8.62"
            sub="5 semesters"
            valueClass="text-emerald-500"
          />
          <StatCard
            dm={dm}
            label="LATEST SGPA"
            value="8.74"
            sub="Sem 5 · Autumn 2025"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
          <StatCard
            dm={dm}
            label="CREDITS EARNED"
            value="110"
            sub="of 160 required"
            valueClass="text-blue-500"
          />
          <StatCard
            dm={dm}
            label="RANK"
            value="12 / 180"
            sub="Department rank"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="col-span-2 space-y-2">
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${t.textMuted}`}
            >
              SEMESTER RESULTS
            </div>
            {RESULTS_DATA.map((r, i) => {
              const key = r.sem.split(" ·")[0];
              const active = selected === key;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left border rounded-xl p-4 transition-all duration-150 ${active ? (dm ? "bg-[#1e1e22] border-[#303036]" : "bg-gray-900 border-gray-900") : dm ? `${t.cardBg} ${t.cardHover}` : `${t.cardBg} hover:bg-gray-50`}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${active ? (dm ? "text-white" : "text-white") : t.textPrimary}`}
                    >
                      {r.sem}
                    </span>
                    <span
                      className={`text-sm font-bold ${active ? "text-emerald-400" : "text-emerald-500"}`}
                    >
                      {r.sgpa}
                    </span>
                  </div>
                  <div
                    className={`text-xs mt-1 ${active ? "text-gray-400" : t.textMuted}`}
                  >
                    {r.credits} credits · Published
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`col-span-3 border rounded-xl ${t.cardBg}`}>
            <div
              className={`px-5 py-3.5 border-b ${t.divider} flex items-center justify-between`}
            >
              <div>
                <div className={`font-semibold text-sm ${t.textPrimary}`}>
                  {selected} — Detailed Marksheet
                </div>
                <div className={`text-xs ${t.textSecondary}`}>
                  Official grade record
                </div>
              </div>
              <Badge
                text="PUBLISHED"
                className={
                  dm
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }
              />
            </div>
            <div className="p-5">
              {ACADEMICS_DATA.detailGrades[selected] ? (
                <>
                  <div
                    className={`grid grid-cols-5 text-[10px] font-bold uppercase tracking-widest ${t.textMuted} mb-3 px-2`}
                  >
                    <span className="col-span-2">SUBJECT</span>
                    <span className="text-center">CREDITS</span>
                    <span className="text-center">GRADE</span>
                    <span className="text-center">POINTS</span>
                  </div>
                  {ACADEMICS_DATA.detailGrades[selected].map((g, j) => (
                    <div
                      key={j}
                      className={`grid grid-cols-5 items-center py-3 px-2 border-b last:border-0 ${t.divider}`}
                    >
                      <div className="col-span-2">
                        <div
                          className={`text-sm font-semibold ${t.textPrimary}`}
                        >
                          {g.name}
                        </div>
                        <div className={`text-xs ${t.textMuted}`}>{g.code}</div>
                      </div>
                      <div className={`text-sm text-center ${t.textSecondary}`}>
                        {g.credits}
                      </div>
                      <div
                        className={`text-sm text-center font-bold ${gradeColor(g.grade)}`}
                      >
                        {g.grade}
                      </div>
                      <div className={`text-sm text-center ${t.textPrimary}`}>
                        {g.points}
                      </div>
                    </div>
                  ))}
                  <div
                    className={`mt-4 pt-3 border-t ${t.divider} flex items-center justify-between`}
                  >
                    <span className={`text-sm font-bold ${t.textPrimary}`}>
                      SGPA
                    </span>
                    <span className="text-xl font-bold text-emerald-500">
                      {
                        RESULTS_DATA.find((r) => r.sem.startsWith(selected))
                          ?.sgpa
                      }
                    </span>
                  </div>
                </>
              ) : (
                <div className={`text-center py-12 ${t.textMuted}`}>
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-sm">
                    Select a semester to view the marksheet
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TIMETABLE ────────────────────────────────────────────────────────────────
function Timetable({ darkMode }) {
  const [view, setView] = useState("today");
  const dm = darkMode;
  const t = getTokens(dm);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const times = ["08:30", "09:45", "11:00", "14:00", "15:45"];

  const SUBJECT_COLORS_DM = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-300",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-300",
  };
  const SUBJECT_COLORS_LT = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    violet: "bg-violet-50 border-violet-200 text-violet-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
  };
  const subjectColors = dm ? SUBJECT_COLORS_DM : SUBJECT_COLORS_LT;

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
            >
              SCHEDULE
            </div>
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
            >
              Timetable
            </h1>
            <p className={`text-sm ${t.textSecondary}`}>
              Spring 2026 weekly class schedule.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setView("today")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === "today" ? "bg-gray-900 text-white" : `border ${t.inputBg} ${t.cardHover}`}`}
            >
              Today
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === "week" ? "bg-gray-900 text-white" : `border ${t.inputBg} ${t.cardHover}`}`}
            >
              Week
            </button>
          </div>
        </div>

        {view === "today" ? (
          <div className={`border rounded-xl ${t.cardBg}`}>
            <div className={`px-5 py-3.5 border-b ${t.divider}`}>
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Today · Tuesday, May 19
              </div>
              <div className={`text-xs ${t.textSecondary}`}>
                {TIMETABLE_DATA.today.length} classes scheduled
              </div>
            </div>
            <div className="p-4 space-y-2">
              {TIMETABLE_DATA.today.map((c, i) => (
                <div
                  key={i}
                  className={`flex gap-4 p-3.5 rounded-xl border transition-colors ${c.live ? (dm ? "border-emerald-500/25 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50") : `${t.divider} ${t.cardHover}`}`}
                >
                  <div className="text-right min-w-[44px] pt-0.5">
                    <div className={`text-sm font-semibold ${t.textPrimary}`}>
                      {c.time}
                    </div>
                    <div className={`text-[10px] ${t.textMuted}`}>{c.end}</div>
                  </div>
                  <div
                    className={`w-0.5 self-stretch rounded-full ${c.live ? "bg-emerald-500" : dm ? "bg-white/10" : "bg-gray-200"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-bold ${t.textPrimary}`}>
                        {c.subject}
                      </span>
                      {c.live && (
                        <Badge
                          text="LIVE"
                          className={
                            dm
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          }
                        />
                      )}
                    </div>
                    <div className={`text-xs mt-0.5 ${t.textSecondary}`}>
                      {c.code} · 📍 {c.room} · {c.faculty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`border rounded-xl overflow-hidden ${t.cardBg}`}>
            <div className={`px-5 py-3.5 border-b ${t.divider}`}>
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Weekly schedule
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr
                    className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted} border-b ${t.divider}`}
                  >
                    <th
                      className={`text-left px-3 py-2.5 w-16 border-r ${t.divider}`}
                    >
                      TIME
                    </th>
                    {days.map((d) => (
                      <th
                        key={d}
                        className={`text-left px-2 py-2.5 ${d === "TUE" ? `font-extrabold ${t.textPrimary}` : ""}`}
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time} className={`border-b ${t.divider}`}>
                      <td
                        className={`px-3 py-1.5 text-xs font-semibold ${t.textMuted} border-r ${t.divider} align-top pt-2 whitespace-nowrap`}
                      >
                        {time}
                      </td>
                      {days.map((day) => {
                        const slot = TIMETABLE_DATA.week[day]?.find(
                          (s) => s.time === time,
                        );
                        return (
                          <td key={day} className="px-1 py-1 align-top">
                            {slot ? (
                              <div
                                className={`rounded-lg p-2 border text-xs leading-snug ${subjectColors[slot.color]}`}
                              >
                                <div className="font-semibold truncate">
                                  {slot.subject}
                                </div>
                                <div className="opacity-60 text-[10px]">
                                  {slot.code} · {slot.room}
                                </div>
                              </div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NOTICES ──────────────────────────────────────────────────────────────────
function Notices({ darkMode }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const dm = darkMode;
  const t = getTokens(dm);
  const cats = ["All", "EXAM", "ACADEMIC", "LIBRARY", "HOSTEL", "ADMIN"];
  const filtered = NOTICES_DATA.filter(
    (n) => filter === "All" || n.category === filter,
  ).filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));
  const pinned = filtered.filter((n) => n.pinned);
  const rest = filtered.filter((n) => !n.pinned);

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            RECORDS
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
          >
            Notices
          </h1>
          <p className={`text-sm ${t.textSecondary}`}>
            Academic, exam, and institutional announcements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div
            className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 flex-1 min-w-[160px] max-w-xs ${t.inputBg}`}
          >
            <span className={t.textMuted}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notices…"
              className={`outline-none text-sm flex-1 bg-transparent ${t.textPrimary}`}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === c ? "bg-gray-900 text-white" : `border ${t.inputBg} ${t.cardHover} ${t.textSecondary}`}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {pinned.length > 0 && (
          <div className="mb-4">
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${t.textMuted}`}
            >
              📌 PINNED
            </div>
            <div className="space-y-2">
              {pinned.map((n) => (
                <div key={n.id} className={`border rounded-xl p-4 ${t.cardBg}`}>
                  <div className="flex items-start gap-3">
                    <Badge
                      text={n.category}
                      className={t.catColors[n.category]}
                    />
                    <div className="flex-1">
                      <div
                        className={`text-sm font-bold mb-1 ${t.textPrimary}`}
                      >
                        {n.title}
                      </div>
                      <div className={`text-xs ${t.textSecondary} mb-2`}>
                        {n.body}
                      </div>
                      <div className={`text-xs ${t.textMuted}`}>{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {rest.map((n) => (
            <div
              key={n.id}
              className={`border rounded-xl p-4 ${t.cardBg} ${t.cardHover} transition-colors cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <Badge text={n.category} className={t.catColors[n.category]} />
                <div className="flex-1">
                  <div
                    className={`text-sm font-semibold mb-0.5 ${t.textPrimary}`}
                  >
                    {n.title}
                  </div>
                  <div className={`text-xs ${t.textMuted}`}>{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className={`text-center py-16 ${t.textMuted}`}>
            <div className="text-3xl mb-2">🔔</div>
            <div>No notices found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LEAVE ────────────────────────────────────────────────────────────────────
function Leave({ darkMode }) {
  const [tab, setTab] = useState("history");
  const [form, setForm] = useState({
    type: "Medical",
    from: "",
    to: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dm = darkMode;
  const t = getTokens(dm);

  const statusStyle = (s) => {
    if (dm)
      return s === "approved"
        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
        : s === "pending"
          ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
          : "bg-red-500/15 text-red-400 border-red-500/25";
    return s === "approved"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : s === "pending"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-700 border-red-200";
  };

  const handleSubmit = () => {
    if (form.from && form.to && form.reason) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setTab("history");
        setForm({ type: "Medical", from: "", to: "", reason: "" });
      }, 1600);
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            ACCOUNT
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
          >
            Leave Management
          </h1>
          <p className={`text-sm ${t.textSecondary}`}>
            Apply for leave, track approvals and view your leave history.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatCard
            dm={dm}
            label="LEAVES TAKEN"
            value="10"
            sub="This academic year"
            valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
          />
          <StatCard
            dm={dm}
            label="APPROVED"
            value="9"
            sub="By Dr. Mehta"
            valueClass="text-emerald-500"
          />
          <StatCard
            dm={dm}
            label="AVAILABLE"
            value="5"
            sub="Medical leaves"
            valueClass="text-blue-500"
          />
        </div>

        <div className="flex gap-1 mb-4">
          {["history", "apply"].map((t2) => (
            <button
              key={t2}
              onClick={() => setTab(t2)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t2 ? "bg-gray-900 text-white" : `${t.textSecondary} ${t.cardHover} border ${t.inputBg}`}`}
            >
              {t2 === "history" ? "Leave History" : "Apply for Leave"}
            </button>
          ))}
        </div>

        {tab === "history" ? (
          <div className={`border rounded-xl ${t.cardBg}`}>
            <div className={`px-5 py-3.5 border-b ${t.divider}`}>
              <div className={`font-semibold text-sm ${t.textPrimary}`}>
                Previous applications
              </div>
            </div>
            {LEAVE_DATA.map((l, i) => (
              <div
                key={i}
                className={`px-5 py-4 border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-sm font-semibold ${t.textPrimary}`}
                      >
                        {l.type} Leave
                      </span>
                      <Badge
                        text={l.status}
                        className={statusStyle(l.status)}
                      />
                    </div>
                    <div className={`text-xs ${t.textSecondary} mb-1`}>
                      {l.from} – {l.to} · {l.days} day{l.days > 1 ? "s" : ""}
                    </div>
                    <div className={`text-xs ${t.textMuted}`}>{l.reason}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-xs font-mono ${t.textMuted}`}>
                      {l.id}
                    </div>
                    <div className={`text-xs ${t.textMuted} mt-1`}>
                      {l.status === "approved"
                        ? `Approved by ${l.approvedBy}`
                        : "Rejected"}
                    </div>
                    <div className={`text-xs ${t.textMuted}`}>
                      Applied {l.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`border rounded-xl p-6 ${t.cardBg}`}>
            <div className={`font-semibold text-sm mb-5 ${t.textPrimary}`}>
              Leave Application Form
            </div>
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">✅</div>
                <div className={`text-sm font-semibold ${t.textPrimary}`}>
                  Application submitted successfully!
                </div>
                <div className={`text-xs ${t.textSecondary} mt-1`}>
                  Pending approval from Dr. Mehta
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${t.textMuted}`}
                  >
                    Leave Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${t.inputBg}`}
                  >
                    {[
                      "Medical",
                      "Personal",
                      "Academic",
                      "Family Emergency",
                      "Bereavement",
                    ].map((tt) => (
                      <option key={tt}>{tt}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${t.textMuted}`}
                    >
                      From Date
                    </label>
                    <input
                      type="date"
                      value={form.from}
                      onChange={(e) =>
                        setForm({ ...form, from: e.target.value })
                      }
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${t.inputBg}`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${t.textMuted}`}
                    >
                      To Date
                    </label>
                    <input
                      type="date"
                      value={form.to}
                      onChange={(e) => setForm({ ...form, to: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${t.inputBg}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${t.textMuted}`}
                  >
                    Reason
                  </label>
                  <textarea
                    rows={4}
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    placeholder="Provide a detailed reason for leave…"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none ${t.inputBg} placeholder-gray-400`}
                  />
                </div>
                <div
                  className={`text-xs ${t.textSecondary} border rounded-lg p-3 ${dm ? "border-[#1e1e22] bg-[#18181c]" : "border-gray-100 bg-gray-50"}`}
                >
                  📋 This application will be sent to <strong>Dr. Mehta</strong>{" "}
                  for approval. You will be notified within 24 hours.
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                >
                  Submit Application
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMMUNICATION ────────────────────────────────────────────────────────────
function Communication({ darkMode }) {
  const [activeChat, setActiveChat] = useState(MESSAGES_DATA[0]);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState(MESSAGES_DATA);
  const endRef = useRef(null);
  const dm = darkMode;
  const t = getTokens(dm);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  const sendMsg = () => {
    if (!msg.trim()) return;
    const updated = chats.map((c) =>
      c.id === activeChat.id
        ? {
            ...c,
            messages: [
              ...c.messages,
              { from: "me", text: msg, time: "Now", self: true },
            ],
            unread: 0,
          }
        : c,
    );
    setChats(updated);
    setActiveChat(updated.find((c) => c.id === activeChat.id));
    setMsg("");
  };

  return (
    <div className={`flex-1 overflow-hidden flex flex-col ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full flex-1 flex flex-col min-h-0">
        <div className="mb-3">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            ACCOUNT
          </div>
          <h1 className={`text-2xl font-semibold ${t.textPrimary}`}>
            Communication
          </h1>
        </div>
        <div
          className={`flex-1 flex border rounded-xl overflow-hidden min-h-0 ${t.cardBg}`}
        >
          {/* Sidebar */}
          <div
            className={`w-64 sm:w-72 border-r ${t.divider} flex flex-col flex-shrink-0`}
          >
            <div className={`p-3 border-b ${t.divider}`}>
              <div
                className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 ${t.inputBg}`}
              >
                <span className={`text-xs ${t.textMuted}`}>🔍</span>
                <input
                  placeholder="Search…"
                  className={`outline-none text-xs flex-1 bg-transparent ${t.textPrimary}`}
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {chats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c)}
                  className={`w-full text-left p-3 border-b last:border-0 ${t.divider} flex gap-3 items-start transition-colors ${activeChat?.id === c.id ? (dm ? "bg-[#1e1e22]" : "bg-gray-100") : t.cardHover}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${dm ? "bg-[#252529] text-gray-300" : "bg-gray-200 text-gray-700"}`}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold truncate ${t.textPrimary}`}
                      >
                        {c.name}
                      </span>
                      {c.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center flex-shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] ${t.textMuted}`}>{c.role}</div>
                    <div
                      className={`text-xs ${t.textSecondary} truncate mt-0.5`}
                    >
                      {c.preview}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            <div
              className={`p-4 border-b ${t.divider} flex items-center gap-3`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${dm ? "bg-[#252529] text-gray-300" : "bg-gray-200 text-gray-700"}`}
              >
                {activeChat?.avatar}
              </div>
              <div>
                <div className={`text-sm font-bold ${t.textPrimary}`}>
                  {activeChat?.name}
                </div>
                <div className={`text-xs ${t.textMuted}`}>
                  {activeChat?.role}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat?.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.self ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-3.5 py-2.5 text-sm ${m.self ? `bg-gray-900 text-white rounded-br-md` : `border ${t.divider} ${dm ? "bg-[#18181c]" : "bg-gray-50"} ${t.textPrimary} rounded-bl-md`}`}
                  >
                    {m.text}
                    <div className={`text-[10px] mt-1 text-gray-400`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div
              className={`p-3 border-t ${t.divider} flex gap-2 items-center`}
            >
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Type a message…"
                className={`flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${t.inputBg}`}
              />
              <button
                onClick={sendMsg}
                className="bg-gray-900 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EXAMS & ELECTIVES ────────────────────────────────────────────────────────
function ExamsElectives({ darkMode }) {
  const [tab, setTab] = useState("exams");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [registered, setRegistered] = useState({});
  const [confirming, setConfirming] = useState(null);
  const dm = darkMode;
  const t = getTokens(dm);

  const depts = ["All", "CSE", "Math", "HSS"];
  const filteredElectives = ELECTIVES_DATA.filter(
    (e) => deptFilter === "All" || e.dept === deptFilter,
  ).filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRegister = (id) => {
    setConfirming(id);
    setTimeout(() => {
      setRegistered((r) => ({ ...r, [id]: true }));
      setConfirming(null);
    }, 900);
  };

  const statusBadge = (e) => {
    if (registered[e.id])
      return {
        text: "REGISTERED",
        cls: dm
          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
          : "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    if (e.status === "full")
      return {
        text: "FULL",
        cls: dm
          ? "bg-red-500/15 text-red-400 border-red-500/25"
          : "bg-red-50 text-red-700 border-red-200",
      };
    if (e.status === "filling")
      return {
        text: "FILLING FAST",
        cls: dm
          ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
          : "bg-amber-50 text-amber-700 border-amber-200",
      };
    return {
      text: "OPEN",
      cls: dm
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  };

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            ACADEMIC
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
          >
            Exams & Electives
          </h1>
          <p className={`text-sm ${t.textSecondary}`}>
            Mid-semester exam schedule, elective selection, and slot booking.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-1 mb-5 p-1 border rounded-xl w-fit ${dm ? "border-[#1e1e22] bg-[#111113]" : "border-gray-200 bg-gray-100"}`}
        >
          {[
            ["exams", "📅 Exam Schedule"],
            ["electives", "🎯 Book Electives"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${tab === key ? (dm ? "bg-[#1e1e22] text-white shadow-sm" : "bg-white text-gray-900 shadow-sm") : dm ? "text-[#777] hover:text-[#ccc]" : "text-gray-500 hover:text-gray-700"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "exams" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <StatCard
                dm={dm}
                label="TOTAL EXAMS"
                value="6"
                sub="Spring 2026"
                valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
              />
              <StatCard
                dm={dm}
                label="REGISTERED"
                value="5"
                sub="1 pending"
                valueClass="text-emerald-500"
              />
              <StatCard
                dm={dm}
                label="FIRST EXAM"
                value="May 26"
                sub="Operating Systems"
                valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
              />
              <StatCard
                dm={dm}
                label="HALL TICKET"
                value="Ready"
                sub="Download available"
                valueClass="text-blue-500"
              />
            </div>

            <div className={`border rounded-xl ${t.cardBg} mb-4`}>
              <div
                className={`px-5 py-3.5 border-b ${t.divider} flex flex-wrap items-center justify-between gap-3`}
              >
                <div>
                  <div className={`font-semibold text-sm ${t.textPrimary}`}>
                    Mid-semester schedule
                  </div>
                  <div className={`text-xs ${t.textSecondary}`}>
                    Spring 2026 · 6 subjects
                  </div>
                </div>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold ${t.inputBg} ${t.cardHover} transition-colors`}
                >
                  🪪 Download Hall Ticket
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr
                      className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted} border-b ${t.divider}`}
                    >
                      {[
                        "SUBJECT",
                        "DATE",
                        "TIME",
                        "ROOM",
                        "SEAT",
                        "DURATION",
                        "STATUS",
                      ].map((h) => (
                        <th key={h} className="text-left px-5 py-2.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {EXAM_SCHEDULE_DATA.map((ex, i) => (
                      <tr
                        key={i}
                        className={`border-b last:border-0 ${t.divider} ${t.cardHover} transition-colors`}
                      >
                        <td className="px-5 py-3">
                          <div
                            className={`text-sm font-semibold ${t.textPrimary}`}
                          >
                            {ex.name}
                          </div>
                          <div className={`text-xs ${t.textMuted}`}>
                            {ex.code}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div
                            className={`text-sm font-semibold ${t.textPrimary}`}
                          >
                            {ex.date}
                          </div>
                          <div className={`text-xs ${t.textMuted}`}>
                            {ex.day}
                          </div>
                        </td>
                        <td
                          className={`px-5 py-3 text-sm ${t.textSecondary} whitespace-nowrap`}
                        >
                          {ex.time}
                        </td>
                        <td className={`px-5 py-3 text-sm ${t.textSecondary}`}>
                          {ex.room}
                        </td>
                        <td
                          className={`px-5 py-3 text-sm font-mono ${t.textPrimary}`}
                        >
                          {ex.seat}
                        </td>
                        <td
                          className={`px-5 py-3 text-sm ${t.textSecondary} whitespace-nowrap`}
                        >
                          {ex.duration}
                        </td>
                        <td className="px-5 py-3">
                          {ex.registered ? (
                            <Badge
                              text="CONFIRMED"
                              className={
                                dm
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }
                            />
                          ) : (
                            <Badge
                              text="PENDING"
                              className={
                                dm
                                  ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={`border rounded-xl p-4 ${dm ? "border-amber-500/20 bg-amber-500/5" : "border-amber-200 bg-amber-50"}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">📢</span>
                <div>
                  <div
                    className={`font-semibold text-sm mb-1 ${dm ? "text-amber-300" : "text-amber-800"}`}
                  >
                    Important exam instructions
                  </div>
                  <ul
                    className={`text-xs space-y-1 ${dm ? "text-amber-400" : "text-amber-700"}`}
                  >
                    <li>
                      • Carry your hall ticket and student ID to every exam.
                    </li>
                    <li>• Reporting time is 30 minutes before the exam.</li>
                    <li>
                      • Electronic devices are not permitted in the exam hall.
                    </li>
                    <li>
                      • Minor Project viva slot will be communicated separately.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "electives" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <StatCard
                dm={dm}
                label="AVAILABLE"
                value="6"
                sub="Electives"
                valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
              />
              <StatCard
                dm={dm}
                label="REGISTERED"
                value={Object.keys(registered).length}
                sub="This semester"
                valueClass="text-emerald-500"
              />
              <StatCard
                dm={dm}
                label="MAX ALLOWED"
                value="2"
                sub="Per semester"
                valueClass={dm ? "text-[#ededed]" : "text-gray-900"}
              />
              <StatCard
                dm={dm}
                label="DEADLINE"
                value="Jun 5"
                sub="Registration closes"
                valueClass="text-amber-500"
              />
            </div>

            <div className={`border rounded-xl ${t.cardBg}`}>
              <div
                className={`px-5 py-3.5 border-b ${t.divider} flex flex-wrap items-center justify-between gap-3`}
              >
                <div>
                  <div className={`font-semibold text-sm ${t.textPrimary}`}>
                    Elective catalogue
                  </div>
                  <div className={`text-xs ${t.textSecondary}`}>
                    Autumn 2026 · select up to 2
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 ${t.inputBg}`}
                  >
                    <span className={t.textMuted}>🔍</span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search electives…"
                      className={`outline-none text-sm w-28 bg-transparent ${t.textPrimary}`}
                    />
                  </div>
                  <div className="flex gap-1">
                    {depts.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDeptFilter(d)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${deptFilter === d ? "bg-gray-900 text-white" : `border ${t.inputBg} ${t.cardHover} ${t.textSecondary}`}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x"
                style={{ borderColor: dm ? "#1e1e22" : "#f1f1f1" }}
              >
                {filteredElectives.map((e, i) => {
                  const sb = statusBadge(e);
                  const seatsLeft = e.seats - e.enrolled;
                  const fillPct = (e.enrolled / e.seats) * 100;
                  const isLoading = confirming === e.id;
                  const isDone = registered[e.id];
                  return (
                    <div
                      key={i}
                      className={`p-5 border-b last:border-b-0 ${t.divider} flex flex-col gap-3 transition-colors ${t.cardHover}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div
                            className={`text-sm font-bold ${t.textPrimary} mb-0.5`}
                          >
                            {e.name}
                          </div>
                          <div className={`text-xs ${t.textMuted}`}>
                            {e.id} · {e.dept} · {e.credits} cr
                          </div>
                        </div>
                        <Badge text={sb.text} className={sb.cls} />
                      </div>

                      <div className={`text-xs ${t.textSecondary} space-y-0.5`}>
                        <div>👤 {e.instructor}</div>
                        <div>
                          🕐 Slot {e.slot} · {e.days}
                        </div>
                        <div>⏰ {e.time}</div>
                        <div>📋 Prereq: {e.prerequisites}</div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${t.textMuted}`}
                          >
                            SEATS
                          </span>
                          <span
                            className={`text-[10px] font-semibold ${seatsLeft <= 5 ? "text-red-500" : seatsLeft <= 15 ? "text-amber-500" : "text-emerald-500"}`}
                          >
                            {seatsLeft} left of {e.seats}
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full ${dm ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${fillPct > 90 ? "bg-red-500" : fillPct > 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        disabled={e.status === "full" || isDone || isLoading}
                        onClick={() => handleRegister(e.id)}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-200 ${isDone ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 cursor-default" : e.status === "full" ? `border ${t.divider} ${t.textMuted} cursor-not-allowed opacity-50` : isLoading ? "bg-gray-900/50 text-white/50" : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30"}`}
                      >
                        {isDone
                          ? "✓ Registered"
                          : isLoading
                            ? "Registering…"
                            : e.status === "full"
                              ? "No seats available"
                              : "Register"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredElectives.length === 0 && (
                <div className={`text-center py-12 ${t.textMuted}`}>
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm">No electives match your search.</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings() {
  const t = getTokens();
  const [notifs, setNotifs] = useState({
    attendance: true,
    fees: true,
    exams: true,
    notices: false,
    results: true,
  });
  const [profile, setProfile] = useState({
    name: STUDENT.name,
    email: STUDENT.email,
    phone: STUDENT.phone,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    setBusy(true);
    setStatusMessage("");
    setTimeout(() => {
      setBusy(false);
      setStatusMessage("Profile updated successfully.");
    }, 900);
  };

  const handlePasswordChange = () => {
    if (!password || password.length < 6) {
      setStatusMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setStatusMessage("Passwords do not match.");
      return;
    }
    setBusy(true);
    setStatusMessage("");
    setTimeout(() => {
      setBusy(false);
      setPassword("");
      setConfirmPassword("");
      setStatusMessage("Password updated successfully.");
    }, 900);
  };

  const handlePhotoClick = () => fileInputRef.current?.click();
  const handlePhotoFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setStatusMessage("Profile photo updated.");
  };

  return (
    <div className={`flex-1 overflow-y-auto ${t.pageBg}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
          >
            ACCOUNT
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-semibold mb-1 ${t.textPrimary}`}
          >
            Settings
          </h1>
          <p className={`text-sm ${t.textSecondary}`}>
            Manage your profile, notifications, and preferences.
          </p>
        </div>

        <div className={`border rounded-xl mb-4 ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Profile Information
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-xl bg-slate-100 text-slate-900 text-lg font-bold flex items-center justify-center shadow-sm overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Student avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{STUDENT.initials}</span>
                )}
              </div>
              <div>
                <div className={`text-sm font-bold ${t.textPrimary}`}>
                  {STUDENT.name}
                </div>
                <div className={`text-xs ${t.textSecondary}`}>
                  {STUDENT.rollNo} · {STUDENT.program} {STUDENT.branch} ·{" "}
                  {STUDENT.year}
                </div>
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="text-xs text-sky-600 hover:underline mt-1 font-medium"
                >
                  Change photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoFile}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Full Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
              ].map(([label, key]) => (
                <div key={key} className={key === "email" ? "col-span-2" : ""}>
                  <label
                    className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${t.textMuted}`}
                  >
                    {label}
                  </label>
                  <input
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${t.inputBg}`}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Date of Birth", STUDENT.dob],
                ["Mentor", STUDENT.mentor],
                ["Hostel", STUDENT.hostel],
                ["Roll Number", STUDENT.rollNo],
              ].map(([label, val]) => (
                <div key={label}>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${t.textMuted}`}
                  >
                    {label}
                  </div>
                  <div className={t.textSecondary}>{val}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={busy}
                className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Saving..." : "Save changes"}
              </button>
              {statusMessage && (
                <div className="text-sm text-slate-600">{statusMessage}</div>
              )}
            </div>
          </div>
        </div>

        <div className={`border rounded-xl mb-4 ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Appearance
            </div>
          </div>
          <div className="p-5 space-y-3">
            <div className={`text-sm font-semibold ${t.textPrimary}`}>
              Bright and responsive portal
            </div>
            <div className={`text-xs ${t.textSecondary}`}>
              This portal now keeps a fresh light theme with lively cards,
              subtle motion, and clear visual contrast.
            </div>
            <div
              className={`rounded-xl p-4 ${t.cardHover} border ${t.divider} text-sm ${t.textSecondary}`}
            >
              Try the dashboard shortcuts and quick action buttons for a
              smoother flow.
            </div>
          </div>
        </div>

        <div className={`border rounded-xl mb-4 ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Notification Preferences
            </div>
          </div>
          <div className="p-5 space-y-1">
            {[
              [
                "attendance",
                "Attendance alerts",
                "Get notified when attendance drops below threshold",
              ],
              [
                "fees",
                "Fee reminders",
                "Notifications for upcoming fee deadlines",
              ],
              [
                "exams",
                "Exam notices",
                "Alerts for exam schedules and hall tickets",
              ],
              [
                "notices",
                "General notices",
                "Library, hostel and admin notices",
              ],
              [
                "results",
                "Results published",
                "Notify when new results are declared",
              ],
            ].map(([key, label, desc]) => (
              <div
                key={key}
                className={`flex items-center justify-between py-3 border-b last:border-0 ${t.divider}`}
              >
                <div>
                  <div className={`text-sm font-semibold ${t.textPrimary}`}>
                    {label}
                  </div>
                  <div className={`text-xs ${t.textSecondary}`}>{desc}</div>
                </div>
                <Toggle
                  value={notifs[key]}
                  onChange={(v) => setNotifs({ ...notifs, [key]: v })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`border rounded-xl ${t.cardBg}`}>
          <div className={`px-5 py-3.5 border-b ${t.divider}`}>
            <div className={`font-semibold text-sm ${t.textPrimary}`}>
              Security
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-3">
              <div className={`text-sm font-semibold ${t.textPrimary}`}>
                Update password
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 ${t.inputBg}`}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 ${t.inputBg}`}
                />
              </div>
              <button
                type="button"
                onClick={handlePasswordChange}
                disabled={busy}
                className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Updating…" : "Update password"}
              </button>
            </div>
            <div className={`border-t ${t.divider}`} />
            <button
              type="button"
              onClick={() => setStatusMessage("Signed out from all sessions.")}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sign out of all sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ScholarPortal() {
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(SEMESTERS_LIST[0]);

  const dm = false;
  const t = getTokens();

  const navItemBase =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer w-full text-left";

  const NAV = [
    {
      group: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "⊞" },
        { id: "attendance", label: "Attendance", icon: "📅" },
        { id: "academics", label: "Academics", icon: "🎓" },
        { id: "timetable", label: "Timetable", icon: "📆" },
      ],
    },
    {
      group: "RECORDS",
      items: [
        { id: "fees", label: "Fees", icon: "💳", badge: 1 },
        { id: "results", label: "Results", icon: "📊" },
        { id: "notices", label: "Notices", icon: "🔔", badge: 3 },
      ],
    },
    {
      group: "ACADEMIC",
      items: [
        { id: "exams", label: "Exam & Electives", icon: "🎯", badge: "NEW" },
      ],
    },
    {
      group: "ACCOUNT",
      items: [
        { id: "leave", label: "Leave", icon: "🏥" },
        { id: "communication", label: "Communication", icon: "💬", badge: 3 },
        { id: "settings", label: "Settings", icon: "⚙" },
      ],
    },
  ];

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard setPage={setPage} />;
      case "attendance":
        return <Attendance />;
      case "academics":
        return <Academics />;
      case "timetable":
        return <Timetable />;
      case "fees":
        return <Fees />;
      case "results":
        return <Results />;
      case "notices":
        return <Notices />;
      case "exams":
        return <ExamsElectives />;
      case "leave":
        return <Leave />;
      case "communication":
        return <Communication />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  const SidebarContent = ({ collapsed }) => (
    <>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV.map((group) => (
          <div key={group.group} className="mb-5">
            {!collapsed && (
              <div
                className={`text-[9px] font-extrabold uppercase tracking-[0.12em] px-3 mb-1.5 ${t.textMuted}`}
              >
                {group.group}
              </div>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`${navItemBase} ${page === item.id ? t.navActive : t.navInactive} ${collapsed ? "justify-center gap-0 px-0 text-center" : ""} mb-0.5`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${typeof item.badge === "number" ? (dm ? "bg-[#252529] text-[#888]" : "bg-gray-100 text-gray-500") : "bg-blue-500/15 text-blue-400 border border-blue-500/25"}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className={`p-3 border-t ${t.divider}`}>
        {!collapsed && (
          <div className={`text-[10px] ${t.textMuted} mb-2 px-1`}>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>SAP SLcM v6.0 · synced</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`${navItemBase} ${t.navInactive} ${collapsed ? "justify-center gap-0 px-0" : ""} text-xs`}
        >
          <span className={t.textMuted}>{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </>
  );

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-[#fdf6ef] text-slate-900"
      style={{
        fontFamily: "'DM Sans', 'Inter', system-ui, -apple-system, sans-serif",
      }}
      onClick={() => {
        setShowHelp(false);
        setShowNotifs(false);
      }}
    >
      {/* Desktop Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-20" : "w-[220px]"} flex-shrink-0 border-r flex flex-col transition-all duration-200 ${t.sidebarBg} hidden md:flex`}
      >
        <div
          className={`flex items-center ${sidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-4 border-b ${t.divider}`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-3xl bg-[#f7eedb] shadow-lg overflow-hidden">
            <img
              src={kiitLogo}
              alt="KIIT logo"
              className="w-full h-full object-contain"
            />
          </div>
          {!sidebarCollapsed && (
            <div>
              <div className={`text-sm font-semibold ${t.textPrimary}`}>
                KIIT SAP PORTAL
              </div>
              <div className={`text-[10px] ${t.textMuted}`}>
                University operating system
              </div>
            </div>
          )}
        </div>
        <SidebarContent collapsed={sidebarCollapsed} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 border-b flex-shrink-0 backdrop-blur-sm ${t.headerBg}`}
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-lg ${t.cardHover} transition-colors`}
          >
            <span className={t.textSecondary}>☰</span>
          </button>

          {/* Sem selector */}
          <div className="relative">
            <label className="sr-only">Semester</label>
            <select
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${t.inputBg} ${t.cardHover} focus:outline-none focus:ring-2 focus:ring-sky-200`}
            >
              {SEMESTERS_LIST.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div
            className={`flex items-center gap-2 flex-1 max-w-xl border border-slate-200 rounded-full px-4 py-2 bg-[#fff5e8] shadow-sm`}
          >
            <span className="text-slate-400">🔍</span>
            <input
              placeholder="Search portal…"
              className="flex-1 text-sm outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
            />
            <span className="text-[10px] border rounded-full px-2 py-0.5 font-mono text-slate-400 hidden sm:inline-flex">
              ⌘K
            </span>
          </div>

          <div className="flex-1" />

          {/* Action icons */}
          <div className="flex items-center gap-1">
            {/* Help */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHelp(!showHelp);
                  setShowNotifs(false);
                }}
                title="Help & shortcuts"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-bold text-sm ${showHelp ? (dm ? "bg-[#1e1e22] text-white" : "bg-gray-100 text-gray-900") : t.navInactive}`}
              >
                ?
              </button>
              {showHelp && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute right-0 top-10 w-64 border rounded-xl shadow-xl z-50 p-4 ${dm ? "bg-[#141416] border-[#1e1e22]" : "bg-white border-gray-200"}`}
                >
                  <div
                    className={`font-bold text-xs uppercase tracking-wider mb-3 ${t.textMuted}`}
                  >
                    Keyboard shortcuts
                  </div>
                  {[
                    ["⌘K", "Open search"],
                    ["⌘D", "Dashboard"],
                    ["⌘A", "Attendance"],
                    ["⌘F", "Fees"],
                  ].map(([k, label]) => (
                    <div
                      key={k}
                      className={`flex items-center justify-between py-1.5 border-b last:border-0 ${t.divider}`}
                    >
                      <span className={`text-sm ${t.textSecondary}`}>
                        {label}
                      </span>
                      <kbd
                        className={`text-[10px] px-2 py-0.5 rounded border font-mono ${dm ? "border-[#252529] bg-[#18181c] text-[#888]" : "border-gray-200 bg-gray-50 text-gray-500"}`}
                      >
                        {k}
                      </kbd>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifs(!showNotifs);
                  setShowHelp(false);
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center relative transition-colors ${showNotifs ? (dm ? "bg-[#1e1e22]" : "bg-gray-100") : t.cardHover}`}
              >
                <span className="text-sm">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
              {showNotifs && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute right-0 top-10 w-80 border rounded-xl shadow-xl z-50 ${dm ? "bg-[#141416] border-[#1e1e22]" : "bg-[#fff5e7] border-slate-200"}`}
                >
                  <div
                    className={`px-4 py-3 border-b ${t.divider} flex items-center justify-between`}
                  >
                    <span className={`font-bold text-sm ${t.textPrimary}`}>
                      Notifications
                    </span>
                    <button className="text-xs text-blue-500 font-medium">
                      Mark all read
                    </button>
                  </div>
                  {NOTICES_DATA.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 border-b last:border-0 ${t.divider} ${t.cardHover} cursor-pointer transition-colors`}
                    >
                      <Badge
                        text={n.category}
                        className={t.catColors[n.category]}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-semibold ${t.textPrimary} line-clamp-1`}
                        >
                          {n.title}
                        </div>
                        <div className={`text-[10px] ${t.textMuted} mt-0.5`}>
                          {n.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={`px-4 py-2.5 border-t ${t.divider}`}>
                    <button
                      onClick={() => {
                        setPage("notices");
                        setShowNotifs(false);
                      }}
                      className="text-xs text-blue-500 font-medium"
                    >
                      View all notices →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <button
              onClick={() => setPage("settings")}
              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg transition-colors ${t.cardHover}`}
            >
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <div className={`text-xs font-semibold ${t.textPrimary}`}>
                  Ananya Rao
                </div>
                <div className={`text-[10px] ${t.textMuted}`}>CSE · 2027</div>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile overlay nav */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside
              className={`relative w-64 flex flex-col border-r ${t.sidebarBg}`}
            >
              <div
                className={`flex items-center gap-3 px-4 py-4 border-b ${t.divider}`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-3xl bg-slate-100 shadow-lg overflow-hidden">
                  <img
                    src={kiitLogo}
                    alt="KIIT logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${t.textPrimary}`}>
                    KIIT SAP Portal
                  </div>
                  <div className={`text-[10px] ${t.textMuted}`}>
                    Mobile navigation
                  </div>
                </div>
              </div>
              <SidebarContent collapsed={false} />
            </aside>
          </div>
        )}

        {/* Page content */}
        {renderPage()}

        {/* Footer */}
        <footer
          className={`text-center text-[10px] py-1.5 border-t flex-shrink-0 ${t.divider} ${t.textMuted}`}
        >
          KIIT SAP Portal · SAP SLcM v6.0 · Session timeout in 28 min
        </footer>
      </div>
    </div>
  );
}
