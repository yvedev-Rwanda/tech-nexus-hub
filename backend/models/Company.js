const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String },
    logo_url: { type: String },
    industry: { type: String },
    employee_count: { type: String },
    open_roles: { type: Number, default: 0 },
    is_verified: { type: Boolean, default: false },
    website: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Company', CompanySchema);
