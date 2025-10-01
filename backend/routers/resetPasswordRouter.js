const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Presenter = require('../models/presenter');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// POST /api/auth/reset-password-request
router.post('/reset-password-request', async (req, res) => {
  try {
    console.log('Received reset-password-request:', req.body && req.body.email);
    const { email } = req.body;

    // Helper to escape regex
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const emailRegex = { email: { $regex: `^${escapeRegExp(email || '')}$`, $options: 'i' } };

    // Try Presenter (case-insensitive)
    let user = await Presenter.findOne(emailRegex);
    console.log('Presenter lookup result:', !!user);

    // Fallback: Try User model (if presenters aren't stored there)
    if (!user) {
      try {
        user = await User.findOne(emailRegex);
        console.log('User model lookup result:', !!user);
      } catch (e) {
        console.error('Error querying User model fallback:', e);
      }
    }

    if (!user) {
      console.log('No presenter or user found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  // Save reset token to presenter
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiry;
  await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // short connection timeout to fail fast in environments blocking SMTP
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'QuickCast Password Reset',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a365d; text-align: center;">Reset Your Password</h1>
          <p>You have requested to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          <p style="color: #718096; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #718096; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    try {
      // Try sending the mail but do not let email sending failure break the API flow
      await transporter.sendMail(mailOptions);
      console.log('Reset email sent to', email);
    } catch (mailErr) {
      // Log and continue — common in hosting environments that block SMTP
      console.error('Reset password request error (email send):', mailErr);
      // Optionally notify admin or capture the error in monitoring here
    }

    // Respond success to the client even if email sending failed so users can continue
    res.json({ message: 'Password reset instructions sent to your email (if reachable)' });
  } catch (err) {
    console.error('Reset password request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/validate-reset-token
router.post('/validate-reset-token', async (req, res) => {
  try {
    console.log('Received validate-reset-token');
    const { token } = req.body;

    const user = await Presenter.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    res.json({ message: 'Valid reset token' });
  } catch (err) {
    console.error('Validate reset token error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    console.log('Received reset-password for token:', req.body && req.body.token);
    const { token, password } = req.body;

    const user = await Presenter.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Set the new (plain) password and let the Presenter's pre-save hook hash it
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Temporary debug endpoint to check which model contains the email
// Enabled only when DEBUG_MODE='true' in env
router.get('/debug-presenter', async (req, res) => {
  if (process.env.DEBUG_MODE !== 'true') {
    return res.status(404).json({ message: 'Not found' });
  }

  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'email query required' });

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  const emailRegex = { email: { $regex: `^${escapeRegExp(email)}$`, $options: 'i' } };

  try {
    const p = await Presenter.findOne(emailRegex);
    if (p) return res.json({ model: 'Presenter', doc: p });
    const u = await User.findOne(emailRegex);
    if (u) return res.json({ model: 'User', doc: u });
    return res.status(404).json({ message: 'Not found in Presenter or User models' });
  } catch (err) {
    console.error('Debug lookup error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
