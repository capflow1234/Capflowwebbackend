const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
  type: { type: String,  },
  text: { type: String,  },
  items: [String] // Only required if type is "list"
});

const CaseStudySchema = new Schema({
  slug: { type: String, required: true },
  showDescription: { type: Boolean, default: true },
  title: { type: String, required: true },
  description: { type: String,  },
  thumbnail: { type: String,  },
  content: [contentSchema]
});

const CaseStudy = mongoose.model('CaseStudy', CaseStudySchema);

module.exports = CaseStudy;
