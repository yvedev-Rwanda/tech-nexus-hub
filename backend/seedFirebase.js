const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const seedData = async () => {
  console.log('🌱 Seeding VEXA Ecosystem data...');

  // 1. Seed Posts
  const posts = [
    {
      name: "Alex Rivera",
      role: "Senior Architect @ VEXALabs",
      content: "Just launched the VEXA unified infrastructure! 🚀 The future of tech growth is finally connected. Check out the roadmap in the Learning Lab.",
      likes_count: 154,
      comments_count: 23,
      tags: "vxea, ecosystem, launch",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      name: "Sarah Chen",
      role: "Lead UI Designer",
      content: "Deep diving into the new VEXA Design System. The glassmorphism and motion components are game-changers for builder productivity.",
      likes_count: 89,
      comments_count: 12,
      tags: "design, ui, ux, vxea",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      name: "Jean-Claude Habimana",
      role: "Fullstack Developer",
      content: "Egosisteme ya VEXA ni nziza cyane! Ishobora gufasha abanyarwanda mu ikoranabuhanga gutera imbere mu buryo bwihuse.",
      likes_count: 210,
      comments_count: 45,
      tags: "tech-rwanda, vxea, community",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      created_at: new Date().toISOString()
    }
  ];

  // 2. Seed Courses
  const courses = [
    {
      title: "Mastering React 19",
      description: "Learn the latest version of React with focus on Server Components and Actions.",
      level: "Advanced",
      total_modules: 12,
      duration: "18h",
      color_class: "bg-blue-500",
      icon_name: "Globe"
    },
    {
      title: "Cloud Native Architecture",
      description: "Build scalable backends using K8s, Docker, and Cloud Native patterns.",
      level: "Intermediate",
      total_modules: 8,
      duration: "24h",
      color_class: "bg-purple-500",
      icon_name: "ShieldCheck"
    }
  ];

  // 3. Seed Companies
  const companies = [
    {
      name: "VEXALabs",
      tagline: "Building the next generation of tech infrastructure.",
      industry: "Software Engineering",
      employee_count: "50-100",
      open_roles: 5,
      is_verified: true,
      website: "https://vexa.io"
    },
    {
      name: "SecureFlow",
      tagline: "Security-first automation for modern dev teams.",
      industry: "Cybersecurity",
      employee_count: "200-500",
      open_roles: 12,
      is_verified: true,
      website: "https://secureflow.dev"
    }
  ];

  try {
    for (const post of posts) await db.collection('posts').add(post);
    for (const course of courses) await db.collection('courses').add(course);
    for (const company of companies) await db.collection('companies').add(company);
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

seedData();
