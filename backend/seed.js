/**
 * seed.js — Populate the Nexus MongoDB database with demo data.
 *
 * USAGE:
 *   1. Make sure MONGO_URI is set in a .env file in the project root.
 *   2. From the project root, run:  node backend/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');
const Post = require('./models/Post');
const Course = require('./models/Course');
const Company = require('./models/Company');
const Opportunity = require('./models/Opportunity');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexus_db';

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Wipe existing data
    await Promise.all([
        User.deleteMany({}),
        Post.deleteMany({}),
        Course.deleteMany({}),
        Company.deleteMany({}),
        Opportunity.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // ── Users ────────────────────────────────────────────────────────────────
    const users = await User.insertMany([
        {
            name: 'Sarah Chen',
            email: 'sarah@nexus.dev',
            role: 'Senior Frontend Engineer',
            bio: 'Passionate about building beautiful, performant UIs.',
            avatar_url: 'https://i.pravatar.cc/150?u=sarah',
            level: 5,
            skill_points: 1250
        },
        {
            name: 'Marcus Thorne',
            email: 'marcus@nexus.dev',
            role: 'AI Researcher',
            bio: 'Exploring the intersection of LLMs and generative UIs.',
            avatar_url: 'https://i.pravatar.cc/150?u=marcus',
            level: 8,
            skill_points: 3400
        },
        {
            name: 'Aisha Mahmoud',
            email: 'aisha@nexus.dev',
            role: 'AI Engineer',
            bio: 'Building NLP pipelines and vector search systems.',
            avatar_url: 'https://i.pravatar.cc/150?u=aisha',
            level: 4,
            skill_points: 960
        },
        {
            name: 'Jordan Smith',
            email: 'jordan@nexus.dev',
            role: 'Product Designer',
            bio: 'Design systems and accessibility advocate.',
            avatar_url: 'https://i.pravatar.cc/150?u=jordan',
            level: 6,
            skill_points: 1800
        },
    ]);
    console.log(`👤 Seeded ${users.length} users`);

    // ── Posts ─────────────────────────────────────────────────────────────────
    const posts = await Post.insertMany([
        {
            user_id: users[0]._id,
            content: 'Just finished migrating our entire design system to Tailwind v4. The build times are significantly better! 🚀',
            likes_count: 124,
            comments_count: 18,
            tags: 'Frontend,TailwindCSS'
        },
        {
            user_id: users[1]._id,
            content: 'Exploring the intersection of LLMs and SVG generation. We are closer to AI-generated UI than you think.',
            likes_count: 89,
            comments_count: 12,
            tags: 'AI,Innovation'
        },
        {
            user_id: users[2]._id,
            content: 'What is your favorite state management library in 2025?\n\n1. Zustand\n2. TanStack Query\n3. Redux Toolkit\n4. Jotai',
            likes_count: 342,
            comments_count: 156,
            tags: 'SoftwareEngineering'
        },
        {
            user_id: users[3]._id,
            content: 'Shipped a new open-source component library today. Fully accessible, dark-mode first. Check it out!',
            likes_count: 201,
            comments_count: 34,
            tags: 'Design,OpenSource'
        },
    ]);
    console.log(`📝 Seeded ${posts.length} posts`);

    // ── Courses ───────────────────────────────────────────────────────────────
    const courses = await Course.insertMany([
        {
            title: 'Modern Frontend Mastery',
            description: 'Master React 19, Tailwind v4, and performance optimization.',
            icon_name: 'Globe',
            level: 'Advanced',
            total_modules: 12,
            duration: '24h',
            color_class: 'text-blue-400'
        },
        {
            title: 'System Design for Scale',
            description: 'Learn to build distributed systems that handle millions of users.',
            icon_name: 'Cpu',
            level: 'Expert',
            total_modules: 8,
            duration: '18h',
            color_class: 'text-purple-400'
        },
        {
            title: 'Applied AI Engineering',
            description: 'Integrate LLMs and vector databases into real products.',
            icon_name: 'Sparkles',
            level: 'Intermediate',
            total_modules: 10,
            duration: '30h',
            color_class: 'text-amber-400'
        },
        {
            title: 'Cloud Native Security',
            description: 'Securing modern infrastructure and CI/CD pipelines.',
            icon_name: 'Lock',
            level: 'Intermediate',
            total_modules: 6,
            duration: '12h',
            color_class: 'text-emerald-400'
        },
    ]);
    console.log(`📚 Seeded ${courses.length} courses`);

    // ── Companies ─────────────────────────────────────────────────────────────
    const companies = await Company.insertMany([
        {
            name: 'NexusLabs',
            tagline: 'Building the next generation of AI infrastructure.',
            logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=nexus',
            industry: 'Artificial Intelligence',
            employee_count: '2k+',
            open_roles: 42,
            is_verified: true,
            website: 'https://nexuslabs.dev'
        },
        {
            name: 'CloudScale',
            tagline: 'Serverless infrastructure for the modern web.',
            logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=cloud',
            industry: 'Cloud Computing',
            employee_count: '500+',
            open_roles: 15,
            is_verified: true,
            website: 'https://cloudscale.io'
        },
        {
            name: 'SecureFlow',
            tagline: 'Enterprise security simplified.',
            logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=secure',
            industry: 'Cybersecurity',
            employee_count: '1.2k+',
            open_roles: 28,
            is_verified: true,
            website: 'https://secureflow.io'
        },
        {
            name: 'FinTech Hub',
            tagline: 'The future of decentralized finance.',
            logo_url: 'https://api.dicebear.com/7.x/identicon/svg?seed=fintech',
            industry: 'FinTech',
            employee_count: '300+',
            open_roles: 10,
            is_verified: false,
            website: 'https://fintechhub.io'
        },
    ]);
    console.log(`🏢 Seeded ${companies.length} companies`);

    // ── Opportunities ─────────────────────────────────────────────────────────
    const opportunities = await Opportunity.insertMany([
        {
            company_id: companies[0]._id,
            title: 'Senior Full Stack Engineer',
            location: 'Remote / Madrid',
            salary_range: '$120k - $160k',
            type: 'Full-time',
            tags: 'React,Go,Kubernetes',
            match_percentage: 98
        },
        {
            company_id: companies[0]._id,
            title: 'AI Product Designer',
            location: 'New York, USA',
            salary_range: '$110k - $140k',
            type: 'Full-time',
            tags: 'Figma,AI,Design Systems',
            match_percentage: 92
        },
        {
            company_id: companies[1]._id,
            title: 'Cloud Infrastructure Intern',
            location: 'Remote',
            salary_range: '$4k / month',
            type: 'Internship',
            tags: 'AWS,Terraform,CI/CD',
            match_percentage: 85
        },
        {
            company_id: companies[2]._id,
            title: 'Security Researcher',
            location: 'Dublin / Hybrid',
            salary_range: '$90k - $130k',
            type: 'Contract',
            tags: 'Security,WASM,Rust',
            match_percentage: 88
        },
        {
            company_id: companies[3]._id,
            title: 'Blockchain Developer',
            location: 'Remote',
            salary_range: '$100k - $150k',
            type: 'Full-time',
            tags: 'Solidity,Web3,TypeScript',
            match_percentage: 76
        },
    ]);
    console.log(`💼 Seeded ${opportunities.length} opportunities`);

    console.log('\n🎉 Database seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    mongoose.disconnect();
    process.exit(1);
});
