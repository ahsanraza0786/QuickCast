const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send notification email to admin if configured
    if (process.env.CONTACT_ADMIN_EMAIL && process.env.CONTACT_ADMIN_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.CONTACT_ADMIN_EMAIL,
          pass: process.env.CONTACT_ADMIN_PASS
        }
      });

      const mailOptions = {
        from: process.env.CONTACT_ADMIN_EMAIL,
        to: process.env.CONTACT_ADMIN_EMAIL,
        subject: `QuickCast Contact: ${subject || 'No subject'}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject || ''}</p>
               <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
      };

      transporter.sendMail(mailOptions).catch(err => console.error('Contact mail error:', err));
    }

    res.json({ message: 'Message received' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
