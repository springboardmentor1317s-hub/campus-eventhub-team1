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

    // Handle payment for paid events
    if (event.price > 0) {
      try {
        if (!process.env.STRIPE_SECRET_KEY) {
          console.error('Missing STRIPE_SECRET_KEY');
          return res.status(500).json({ error: 'Payment is not configured.' });
        }

        const frontendBase = process.env.FRONTEND_URL || 'http://localhost:5173';

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [{
            price_data: {
              currency: 'inr',
              product_data: {
                name: event.title,
                description: `Registration for ${event.title}`,
              },
              unit_amount: Math.round(event.price * 100), // integer paise
            },
            quantity: 1,
          }],
          metadata: {
            eventId: event._id.toString(),
            userId: req.user.id,
          },
          success_url: `${frontendBase}/event-register/${eventId}?payment_success=true`,
          cancel_url: `${frontendBase}/event-register/${eventId}?payment_cancelled=true`,
        });

        return res.status(200).json({
          success: true,
          paymentUrl: session.url
        });

      } catch (stripeError) {
        console.error('Stripe session creation error:', {
          type: stripeError.type,
          code: stripeError.code,
          message: stripeError.message,
          raw: stripeError.raw
        });
        return res.status(500).json({ error: 'Failed to create payment session.' });
      }
    }

    // Create new registration with pending status for free events
    const registration = await Registration.create({
      event_id: eventId,
      user_id: userId,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Awaiting approval.',
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

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Add this to your .env

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { eventId, userId } = session.metadata;

    try {
      // Check if registration already exists to prevent duplicates
      const existingRegistration = await Registration.findOne({ event_id: eventId, user_id: userId });
      if (!existingRegistration) {
        await Registration.create({
          event_id: eventId,
          user_id: userId,
          status: 'pending', // Still requires admin approval
          stripe_payment_id: session.payment_intent,
        });
        console.log(`Registration created for user ${userId} for event ${eventId}`);
      }
    } catch (err) {
      console.error('Error creating registration after payment:', err);
    }
  }

  res.json({ received: true });
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

    // Filter out registrations where user has been deleted
    const validRegistrations = registrations.filter(reg => reg.user_id !== null);

    res.status(200).json({
      success: true,
      data: { registrations: validRegistrations }
    });

  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ error: 'Failed to get event registrations' });
  }
};

// Get all registrations across all events (admin only)
exports.getAllRegistrations = async (req, res) => {
  try {
    // Check if user is admin
    if (!['college_admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const registrations = await Registration.find()
      .populate('user_id', 'name email college')
      .populate('event_id', 'title category college_name')
      .sort({ timestamp: -1 });

    // Filter out registrations where user has been deleted
    const validRegistrations = registrations.filter(reg => reg.user_id !== null);

    // Format the data to include event information
    const formattedRegistrations = validRegistrations.map(reg => ({
      _id: reg._id,
      user_id: reg.user_id,
      event_id: reg.event_id,
      eventTitle: reg.event_id?.title,
      eventType: reg.event_id?.category,
      status: reg.status,
      timestamp: reg.timestamp,
      created_at: reg.created_at
    }));

    res.status(200).json({
      success: true,
      data: { registrations: formattedRegistrations }
    });

  } catch (error) {
    console.error('Get all registrations error:', error);
    res.status(500).json({ error: 'Failed to get all registrations' });
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
      .populate('event_id')
      .populate('user_id', 'name email');
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Check if user is authorized (event creator or admin)
    const isAuthorized = registration.event_id.created_by.toString() === req.user.id || 
                        ['college_admin', 'super_admin'].includes(req.user.role);

    if (!isAuthorized) {
      return res.status(403).json({ error: 'Not authorized to update registration' });
    }

    const oldStatus = registration.status;
    
    // Handle registration count changes based on status transitions
    if (oldStatus !== status) {
      // Pending -> Approved: Increment count
      if (oldStatus === 'pending' && status === 'approved') {
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: 1 }
        });
      }
      // Approved -> Rejected/Pending: Decrement count
      else if (oldStatus === 'approved' && (status === 'rejected' || status === 'pending')) {
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: -1 }
        });
      }
      // Rejected -> Approved: Increment count
      else if (oldStatus === 'rejected' && status === 'approved') {
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: 1 }
        });
      }
    }
       

    // Update registration status
    registration.status = status;
    await registration.save();

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

    // Send notification to student about registration status change
    try {
      const { createNotification } = require('./notificationController');
      let message = '';
      let notificationType = '';
      
      if (status === 'approved') {
        message = `Your registration for "${registration.event_id.title}" has been approved! See you at the event.`;
        notificationType = 'registration_approved';
      } else if (status === 'rejected') {
        message = `Your registration for "${registration.event_id.title}" was not approved.`;
        notificationType = 'registration_rejected';
      }
      
      if (message) {
        await createNotification(
          registration.user_id._id,
          message,
          notificationType,
          registration.event_id._id,
          registration._id
        );
      }
    } catch (notifError) {
      console.error('Failed to send registration status notification:', notifError);
      // Continue even if notification fails
    }

    // Send email with ticket for approved registrations
    if (status === 'approved') {
      try {
        const { sendTicketApprovalEmail } = require('../utils/emailService');
        const emailResult = await sendTicketApprovalEmail(
          registration.user_id,
          registration.event_id,
          registration
        );
        
        if (!emailResult.success) {
          console.log('Ticket approval email not sent:', emailResult.message || emailResult.error);
        }
      } catch (emailError) {
        console.error('Failed to send ticket approval email:', emailError);
        // Continue even if email fails
      }
    } else if (status === 'rejected') {
      // Send rejection email
      try {
        const { sendRejectionEmail } = require('../utils/emailService');
        const emailResult = await sendRejectionEmail(
          registration.user_id,
          registration.event_id,
          req.body.reason || ''
        );
        
        if (emailResult.success) {
          console.log('Rejection email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Continue even if email fails
      }
    }

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


//  Generate Ticket PDF

async function generateTicketPDF(registration) {
  const qrData = JSON.stringify({
    registrationId: registration._id,
    eventId: registration.event_id._id,
    userId: registration.user_id._id,
    name: registration.user_id.name,
    eventTitle: registration.event_id.title,
  });

  const qrImage = await QRCode.toDataURL(qrData);
  const qrBuffer = Buffer.from(qrImage.split(',')[1], 'base64');

  const doc = new PDFDocument({ margin: 50 });
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(22).text('🎟️ Campus Event Ticket', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Event: ${registration.event_id.title}`);
  doc.text(`Name: ${registration.user_id.name}`);
  doc.text(`Email: ${registration.user_id.email}`);
  doc.text(`Date: ${new Date(registration.event_id.start_date).toLocaleString()}`);
  doc.text(`Location: ${registration.event_id.location}`);
  doc.moveDown();
  doc.fontSize(14).text('Scan this QR code at the entry gate:', { align: 'left' });
  doc.image(qrBuffer, { fit: [150, 150], align: 'center' });
  doc.end();

  await new Promise(resolve => doc.on('end', resolve));
  return Buffer.concat(buffers);
}


//  Send Ticket Email

async function sendTicketEmail(registration) {
  const pdfData = await generateTicketPDF(registration);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CampusEventHub" <${process.env.EMAIL_USER}>`,
    to: registration.user_id.email,
    subject: `Your Ticket for ${registration.event_id.title}`,
    text: `Hi ${registration.user_id.name},\n\nYour registration for "${registration.event_id.title}" has been approved. Your ticket is attached below.\n\nSee you at the event!`,
    attachments: [
      {
        filename: `ticket_${registration._id}.pdf`,
        content: pdfData,
      },
    ],
  });

  console.log(`✅ Ticket email sent to ${registration.user_id.email}`);
}

// Register for Event

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (!event.registration_open) {
      return res.status(400).json({
        error:
          event.current_registrations >= event.registration_limit
            ? 'Event is full'
            : 'Registration is closed for this event',
      });
    }

    const existing = await Registration.findOne({ event_id: eventId, user_id: userId });
    if (existing)
      return res.status(400).json({
        error: 'You are already registered for this event',
        status: existing.status,
      });

    const registration = await Registration.create({
      event_id: eventId,
      user_id: userId,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Awaiting approval.',
      data: { registration },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
};


// Get Registration Status

exports.getRegistrationStatus = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      event_id: req.params.eventId,
      user_id: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: {
        status: registration ? registration.status : 'not_registered',
      },
    });
  } catch (error) {
    console.error('Get registration status error:', error);
    res.status(500).json({ error: 'Failed to get registration status' });
  }
};


// Get User Registrations

exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user_id: req.user.id })
      .populate('event_id')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: { registrations },
    });
  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ error: 'Failed to get user registrations' });
  }
};


// Get All Event Registrations (Admin)

exports.getEventRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const isAuthorized =
      event.created_by.toString() === req.user.id ||
      ['college_admin', 'super_admin'].includes(req.user.role);

    if (!isAuthorized)
      return res.status(403).json({ error: 'Not authorized to view registrations' });

    const registrations = await Registration.find({ event_id: req.params.eventId })
      .populate('user_id', 'name email college')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: { registrations },
    });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ error: 'Failed to get event registrations' });
  }
};

// Get All Registrations (Admin)

exports.getAllRegistrations = async (req, res) => {
  try {
    if (!['college_admin', 'super_admin'].includes(req.user.role))
      return res.status(403).json({ error: 'Admin access required' });

    const registrations = await Registration.find()
      .populate('user_id', 'name email college')
      .populate('event_id', 'title category college_name')
      .sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: { registrations },
    });
  } catch (error) {
    console.error('Get all registrations error:', error);
    res.status(500).json({ error: 'Failed to get all registrations' });
  }
};

// Update Registration Status

exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status))
      return res.status(400).json({ error: 'Invalid status value' });

    const registration = await Registration.findById(registrationId)
      .populate('event_id')
      .populate('user_id', 'name email');
    if (!registration) return res.status(404).json({ error: 'Registration not found' });

    const isAuthorized =
      registration.event_id.created_by.toString() === req.user.id ||
      ['college_admin', 'super_admin'].includes(req.user.role);

    if (!isAuthorized)
      return res.status(403).json({ error: 'Not authorized to update registration' });

    const oldStatus = registration.status;
    registration.status = status;
    await registration.save();

    // Adjust event count
    if (oldStatus !== status) {
      if (oldStatus === 'pending' && status === 'approved')
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: 1 },
        });
      else if (oldStatus === 'approved' && ['rejected', 'pending'].includes(status))
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: -1 },
        });
      else if (oldStatus === 'rejected' && status === 'approved')
        await Event.findByIdAndUpdate(registration.event_id._id, {
          $inc: { current_registrations: 1 },
        });
    }

    // Send ticket if approved
    if (status === 'approved') {
      try {
        await sendTicketEmail(registration);
      } catch (err) {
        console.error('Error sending ticket email:', err);
      }
    }

    res.status(200).json({
      success: true,
      message: `Registration ${status} successfully.`,
      data: { registration },
    });
  } catch (error) {
    console.error('Update registration status error:', error);
    res.status(500).json({ error: 'Failed to update registration status' });
  }
};

// Download Ticket (User)

exports.downloadTicket = async (req, res) => {
  try {
    const registrationId = req.params.id;
    const registration = await Registration.findById(registrationId)
      .populate('event_id user_id');

    if (!registration || registration.status !== 'approved') {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found or not approved.' });
    }

    const pdfData = await generateTicketPDF(registration);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="ticket_${registration._id}.pdf"`
    );
    res.send(pdfData);
  } catch (err) {
    console.error('Download ticket error:', err);
    res.status(500).json({ success: false, message: 'Error generating ticket.' });
  }
};
