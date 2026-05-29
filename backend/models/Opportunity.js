const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    location: { type: String },
    salary_range: { type: String },
    type: { type: String },
    tags: { type: String },
    match_percentage: { type: Number }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
