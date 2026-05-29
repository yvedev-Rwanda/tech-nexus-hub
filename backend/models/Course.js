const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    icon_name: { type: String },
    level: { type: String, default: 'Intermediate' },
    total_modules: { type: Number, default: 0 },
    duration: { type: String },
    color_class: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Course', CourseSchema);
