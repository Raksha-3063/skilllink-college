export const mockServices = [
  { id: 1, name: "Priya Sharma", college: "IIT Delhi", avatar: "https://i.pravatar.cc/150?img=1", service: "UI/UX Design", price: 300, description: "Clean Figma designs for apps & websites", rating: 4.8, reviewCount: 23 },
  { id: 2, name: "Rahul Verma", college: "BITS Pilani", avatar: "https://i.pravatar.cc/150?img=3", service: "DSA Tutoring", price: 200, description: "1-on-1 DSA coaching for placements", rating: 4.5, reviewCount: 12 },
  { id: 3, name: "Ananya Gupta", college: "NIT Trichy", avatar: "https://i.pravatar.cc/150?img=5", service: "PPT Design", price: 150, description: "Professional presentation design", rating: 4.2, reviewCount: 8 },
  { id: 4, name: "Karan Singh", college: "VIT Vellore", avatar: "https://i.pravatar.cc/150?img=8", service: "Web Development", price: 500, description: "Full stack web apps in React + Node", rating: 4.9, reviewCount: 31 },
  { id: 5, name: "Sneha Patel", college: "IIIT Hyderabad", avatar: "https://i.pravatar.cc/150?img=9", service: "Resume Review", price: 100, description: "ATS-friendly resume optimization", rating: 4.6, reviewCount: 15 },
  { id: 6, name: "Arjun Das", college: "DTU", avatar: "https://i.pravatar.cc/150?img=11", service: "Python Tutoring", price: 250, description: "Beginner to advanced Python coaching", rating: 4.3, reviewCount: 9 },
];

export const mockInsights = [
  {
    id: 1,
    name: "Priya Sharma",
    college: "IIT Delhi",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just completed my summer internship at Google! Here are 5 things I learned about system design interviews that helped me crack it. Thread 🧵",
    likes: 124,
    comments: 18,
    time: "2h ago",
  },
  {
    id: 2,
    name: "Rahul Verma",
    college: "BITS Pilani",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Won the Smart India Hackathon 2024! Our team built an AI-powered waste management system. The key was starting with user research first. #SIH2024",
    likes: 89,
    comments: 12,
    time: "5h ago",
  },
  {
    id: 3,
    name: "Karan Singh",
    college: "VIT Vellore",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "Exam strategy that got me 9.5 CGPA: Pomodoro technique + Anki flashcards + group study sessions. Consistency > cramming. Here's my full approach 👇",
    likes: 256,
    comments: 34,
    time: "1d ago",
  },
];

export const mockChats = [
  { id: 1, name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Sure, I can help with the UI design!", time: "2m ago", unread: 2 },
  { id: 2, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "When do you want to start the tutoring?", time: "1h ago", unread: 0 },
  { id: 3, name: "Ananya Gupta", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "PPT is ready, check your email!", time: "3h ago", unread: 1 },
];

export const mockMessages = [
  { id: 1, text: "Hi! I saw your UI design service. Can you help with my project?", sent: true, time: "10:30 AM" },
  { id: 2, text: "Hey! Sure, I'd love to help. What kind of project is it?", sent: false, time: "10:32 AM" },
  { id: 3, text: "It's a mobile app for event management at our college.", sent: true, time: "10:33 AM" },
  { id: 4, text: "Sounds interesting! I can do the full UI/UX for ₹300. Want to discuss the details?", sent: false, time: "10:35 AM" },
  { id: 5, text: "That works! Can we start this weekend?", sent: true, time: "10:36 AM" },
  { id: 6, text: "Sure, I can help with the UI design! Let's connect on a call tomorrow.", sent: false, time: "10:38 AM" },
];

export const mockProfile = {
  name: "Priya Sharma",
  college: "IIT Delhi",
  course: "B.Tech Computer Science, 3rd Year",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Passionate about UI/UX design & front-end development. Helping students build beautiful products.",
  about: "I'm a self-taught designer with 2+ years of experience in creating clean, user-friendly interfaces. I specialize in mobile app design, web design, and branding. Currently available for freelance projects.",
  education: { college: "IIT Delhi", degree: "B.Tech Computer Science", year: "2022-2026" },
  experience: [
    { role: "UI/UX Design Intern", company: "Flipkart", duration: "May 2024 - Jul 2024" },
    { role: "Frontend Developer", company: "College Tech Club", duration: "Jan 2023 - Present" },
  ],
  services: [
    { title: "UI/UX Design", description: "Clean Figma designs for apps & websites", price: 300 },
    { title: "Frontend Development", description: "React & Next.js web applications", price: 500 },
    { title: "Logo Design", description: "Modern minimalist logos for startups", price: 200 },
  ],
  skills: ["Figma", "React", "TypeScript", "Tailwind CSS", "Node.js", "Python"],
  rating: 4.6,
  reviewCount: 23,
  connections: 120,
  followers: 340,
  following: 180,
  mutualConnections: [
    { name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Karan Singh", avatar: "https://i.pravatar.cc/150?img=8" },
    { name: "Sneha Patel", avatar: "https://i.pravatar.cc/150?img=9" },
  ],
};

export const mockReviews = [
  {
    id: 1,
    name: "Rahul Verma",
    college: "BITS Pilani",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "Amazing UI designs! Priya delivered my app mockups ahead of schedule. Highly recommend her work.",
    date: "Feb 10, 2026",
  },
  {
    id: 2,
    name: "Karan Singh",
    college: "VIT Vellore",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4,
    comment: "Great frontend work on our club website. Clean code and responsive design. Will hire again!",
    date: "Jan 28, 2026",
  },
  {
    id: 3,
    name: "Sneha Patel",
    college: "IIIT Hyderabad",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    comment: "The logo she designed for our startup was perfect. Very professional and creative.",
    date: "Jan 15, 2026",
  },
  {
    id: 4,
    name: "Arjun Das",
    college: "DTU",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 4,
    comment: "Good communication and delivered quality work. Pricing is very fair for students.",
    date: "Dec 20, 2025",
  },
];
