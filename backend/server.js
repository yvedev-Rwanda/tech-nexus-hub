const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('firebase-admin');

// 1. Firebase Admin Initialization with Safety Guard
let db = null;
let isFirebaseConnected = false;

try {
    const serviceAccount = require('./serviceAccountKey.json');
    if (serviceAccount.project_id !== "YOUR_PROJECT_ID") {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        db = admin.firestore();
        isFirebaseConnected = true;
        console.log('✅ Connected to Firebase (Admin SDK)');
    } else {
        console.warn('⚠️ Firebase: Using placeholder key. Backend will run in MOCK MODE.');
    }
} catch (err) {
    console.error('⚠️ Firebase: Initialization skipped. Backend will run in MOCK MODE.');
}

const app = express();
app.use(cors());
app.use(express.json());

// --- MOCK DATA FOR "GOOD RUN" ---
const MOCK_POSTS = [
    { id: '1', name: "Yve Dev", role: "VEXA Founder", content: "Welcome to the future of the global tech network. Connect, learn, and grow across borders. 🌍✨", likes_count: 24, comments_count: 5, tags: "vxea, global, tech", avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", created_at: new Date().toISOString() },
    { id: '2', name: "Jean de Dieu", role: "Frontend Lead", content: "Our Rwandan talent is now connected to the world hubs. VEXA 2.0 is live!", likes_count: 18, comments_count: 3, tags: "vxea, rwanda, tech", avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", created_at: new Date().toISOString() }
];

const MOCK_COURSES = [
    { id: '1', title: "VEXA 101: Ecosystem Basics", description: "Learn how the unified tech ecosystem works.", level: "Beginner", total_modules: 5, duration: "2h", color_class: "text-blue-400", icon_name: "Globe" },
    { id: '2', title: "Fullstack Architecture", description: "Master the VEXA backend patterns.", level: "Advanced", total_modules: 12, duration: "15h", color_class: "text-purple-400", icon_name: "Cpu" }
];

// --- API ROUTES (Firebase + Mock Fallback) ---

app.get('/api/posts', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const postsSnapshot = await db.collection('posts').orderBy('created_at', 'desc').get();
            const posts = [];
            postsSnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
            return res.status(200).json(posts);
        }
        res.status(200).json(MOCK_POSTS);
    } catch (err) {
        res.status(200).json(MOCK_POSTS); // Fallback to mock on error
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const newPost = { ...req.body, created_at: admin.firestore.FieldValue.serverTimestamp() };
            const docRef = await db.collection('posts').add(newPost);
            return res.status(200).json({ message: "Post created successfully", id: docRef.id });
        }
        res.status(200).json({ message: "Mock Success", id: Date.now().toString() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const snapshot = await db.collection('courses').get();
            const courses = [];
            snapshot.forEach(doc => courses.push({ id: doc.id, ...doc.data() }));
            return res.status(200).json(courses);
        }
        res.status(200).json(MOCK_COURSES);
    } catch (err) {
        res.status(200).json(MOCK_COURSES);
    }
});

app.get('/api/users', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const snapshot = await db.collection('profiles').get();
            const items = [];
            snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            return res.status(200).json(items);
        }
        res.status(200).json([]);
    } catch (err) { res.status(200).json([]); }
});

app.get('/api/companies', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const snapshot = await db.collection('companies').get();
            const items = [];
            snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            return res.status(200).json(items);
        }
        res.status(200).json([]);
    } catch (err) { res.status(200).json([]); }
});

app.get('/api/opportunities', async (req, res) => {
    try {
        if (isFirebaseConnected && db) {
            const snapshot = await db.collection('opportunities').get();
            const items = [];
            snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            return res.status(200).json(items);
        }
        res.status(200).json([]);
    } catch (err) { res.status(200).json([]); }
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 VEXA Backend running on http://localhost:${PORT}`);
    if (!isFirebaseConnected) console.log('💡 TIP: Add real credentials to serviceAccountKey.json to enable Database persistence.');
});
