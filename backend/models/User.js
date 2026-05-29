const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'Developer' },
    bio: { type: String },
    avatar_url: { type: String },
    level: { type: Number, default: 1 },
    skill_points: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('User', UserSchema);
