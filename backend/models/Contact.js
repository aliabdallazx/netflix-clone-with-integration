import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^[\w\.-]+@[\w\.-]+\.\w+$/, 'Please provide a valid email'],
      lowercase: true
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      minlength: [5, 'Subject must be at least 5 characters'],
      maxlength: [100, 'Subject cannot exceed 100 characters'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    ipAddress: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

export default mongoose.model('Contact', contactSchema);
