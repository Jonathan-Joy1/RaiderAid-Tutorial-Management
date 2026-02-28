const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

function getTransporter() {
  const email = functions.config().gmail && functions.config().gmail.email;
  const appPassword = functions.config().gmail && functions.config().gmail.app_password;

  if (!email || !appPassword) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Missing Gmail configuration. Set gmail.email and gmail.app_password in functions config."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: appPassword,
    },
  });
}

exports.sendReminderEmails = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be signed in to send reminders.");
  }

  const recipients = Array.isArray(data.recipients) ? data.recipients : [];
  const location = (data.location || "").toString().trim();

  if (!recipients.length) {
    throw new functions.https.HttpsError("invalid-argument", "At least one recipient is required.");
  }
  if (!location) {
    throw new functions.https.HttpsError("invalid-argument", "Location is required.");
  }

  const validRecipients = recipients
    .map((email) => (email || "").toString().trim())
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

  if (!validRecipients.length) {
    throw new functions.https.HttpsError("invalid-argument", "No valid recipient emails provided.");
  }

  const transporter = getTransporter();
  const senderEmail = (functions.config().gmail && functions.config().gmail.email) || "";
  const senderDisplay = context.auth.token.email || "RaiderAid Reminder";

  const sendTasks = validRecipients.map((recipient) => {
    const mailOptions = {
      from: `RaiderAid Reminder <${senderEmail}>`,
      to: recipient,
      subject: "Tutorial Reminder",
      text: `Hello,\n\nThis is a tutorial reminder.\nLocation: ${location}\n\nSent by: ${senderDisplay}\n\n- RaiderAid Reminder`,
      html: `<p>Hello,</p><p>This is a tutorial reminder.</p><p><strong>Location:</strong> ${location}</p><p>Sent by: ${senderDisplay}</p><p>- RaiderAid Reminder</p>`,
    };

    return transporter.sendMail(mailOptions);
  });

  const results = await Promise.allSettled(sendTasks);
  const failed = results
    .map((result, index) => ({ result, recipient: validRecipients[index] }))
    .filter((entry) => entry.result.status === "rejected")
    .map((entry) => ({
      recipient: entry.recipient,
      error: entry.result.reason && entry.result.reason.message ? entry.result.reason.message : "Unknown send error",
    }));

  return {
    attempted: validRecipients.length,
    sent: validRecipients.length - failed.length,
    failed,
  };
});
