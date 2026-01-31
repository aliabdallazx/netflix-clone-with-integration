import Joi from 'joi';
import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(100).required(),
  message: Joi.string().min(10).max(1000).required()
});

export const submitContact = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    // Create contact
    const contact = new Contact({
      name: value.name,
      email: value.email,
      subject: value.subject,
      message: value.message,
      userId: req.userId || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Save to database
    await contact.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      contactId: contact._id
    });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { status = 'new', page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return next(new AppError('Contact not found', 404));
    }

    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'closed'].includes(status)) {
      return next(new AppError('Invalid status', 400));
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return next(new AppError('Contact not found', 404));
    }

    res.json({
      success: true,
      message: 'Contact status updated',
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return next(new AppError('Contact not found', 404));
    }

    res.json({
      success: true,
      message: 'Contact deleted'
    });
  } catch (error) {
    next(error);
  }
};
