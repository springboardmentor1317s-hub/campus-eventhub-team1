const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if registration is open
    if (!event.registration_open) {
      return res.status(400).json({ 
        error: event.current_registrations >= event.registration_limit 
          ? 'Event is full' 
          : 'Registration is closed for this event' 
      });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      event_id: eventId,
      user_id: userId
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        error: 'You are already registered for this event',
        status: existingRegistration.status
      });
    }

    // Create new registration
    const registration = await Registration.create({
      event_id: eventId,
      user_id: userId,
      status: 'pending'
    });

    // Update event registration count
    await Event.findByIdAndUpdate(eventId, {
      $inc: { current_registrations: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { registration }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ error: 'You are already registered for this event' });
    }
    res.status(500).json({ error: 'Failed to register for event' });
  }
};

// Get registration status for an event
exports.getRegistrationStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const registration = await Registration.findOne({
      event_id: eventId,
      user_id: userId
    });

    res.status(200).json({
      success: true,
      data: {
        status: registration ? registration.status : 'not_registered'
      }
    });

  } catch (error) {
    console.error('Get registration status error:', error);
    res.status(500).json({ error: 'Failed to get registration status' });
  }
};

// Get all registrations for a user
exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.find({ user_id: userId })
      .populate('event_id')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: { registrations }
    });

  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ error: 'Failed to get user registrations' });
  }
};

// Get all registrations for an event (admin only)
exports.getEventRegistrations = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Check if user is authorized (event creator or admin)
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isAuthorized = event.created_by.toString() === req.user.id || 
                        ['college_admin', 'super_admin'].includes(req.user.role);

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Not authorized to view registrations' });
    }

    const registrations = await Registration.find({ event_id: eventId })
      .populate('user_id', 'name email college')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: { registrations }
    });

  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ error: 'Failed to get event registrations' });
  }
};

// Update registration status (admin only)
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const registration = await Registration.findById(registrationId)
      .populate('event_id');
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Check if user is authorized (event creator or admin)
    const isAuthorized = registration.event_id.created_by.toString() === req.user.id || 
                        ['college_admin', 'super_admin'].includes(req.user.role);

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Not authorized to update registration' });
    }

    // Handle registration count if changing from approved to rejected
    if (registration.status === 'approved' && status === 'rejected') {
      await Event.findByIdAndUpdate(registration.event_id, {
        $inc: { current_registrations: -1 }
      });
    }

    // Update registration status
    registration.status = status;
    await registration.save();

<<<<<<< Updated upstream
=======
    // Log this activity
    const ActivityLog = require('../models/ActivityLog');
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'registration_status_update',
      description: `${status.charAt(0).toUpperCase() + status.slice(1)} registration for ${registration.user_id.name} in event "${registration.event_id.title}"`,
      details: {
        registration_id: registrationId,
        event_id: registration.event_id._id,
        event_title: registration.event_id.title,
        student_name: registration.user_id.name,
        student_email: registration.user_id.email,
        old_status: oldStatus,
        new_status: status
      }
    });

    // Create a notification for the user when their registration status changes
    try {
      const Notification = require('../models/Notification');
      if (status === 'approved' || status === 'rejected') {
        const message = `Your registration for event \"${registration.event_id.title}\" has been ${status}.`;
        await Notification.create({
          user_id: registration.user_id._id || registration.user_id,
          type: 'registration_update',
          message,
          reference: {
            refModel: 'Registration',
            refId: registration._id
          }
        });
      }
    } catch (notifErr) {
      console.error('Failed to create notification:', notifErr);
      // Don't block the main response if notification creation fails
    }

>>>>>>> Stashed changes
    res.status(200).json({
      success: true,
      message: `Registration ${status} successfully`,
      data: { registration }
    });

  } catch (error) {
    console.error('Update registration status error:', error);
    res.status(500).json({ error: 'Failed to update registration status' });
  }
};