const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  // Hierarchy
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member', 
    default: null 
  },
  // New: Link to a spouse/partner for more complex trees
  spouse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member', 
    default: null 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Unknown'], 
    default: 'Unknown' 
  },
  isAlive: { 
    type: Boolean, 
    default: true 
  },
  attributes: {
    birthYear: { type: Number },
    deathYear: { type: Number }, // Added for deceased members
    birthPlace: { type: String },
    role: { type: String }, // e.g., "Grandfather", "Cousin"
    bio: { type: String, maxLength: 500 } // Brief description
  },
  // New: Track when the profile was added
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

// Middleware: Prevent a member from being their own parent
MemberSchema.pre('save', function(next) {
  if (this.parent && this.parent.equals(this._id)) {
    next(new Error('A member cannot be their own parent.'));
  }
  next();
});

module.exports = mongoose.model('Member', MemberSchema);
