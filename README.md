# RaiderAid-Tutorial-Management
This repository contains the files and programs for the Email Reminder, a tutorial management tool that lets teachers set up notifications for student groups through email.

## No-Blaze Email Sending Setup (EmailJS)

The Sender page now sends reminders using EmailJS from the browser, so you do not need Firebase Blaze for this.

### 1. Create an EmailJS account

1. Sign in at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.).
3. Create an email template.

### 2. Configure template variables

Your EmailJS template should include these variables used by `sender.html`:

- `{{to_email}}`
- `{{location}}`
- `{{sender_email}}`
- `{{confirm_link}}`

Set your template's To Email to `{{to_email}}` so each learner receives their own reminder.

### 3. Add a confirmation link/button in reminder template

Add this to the email body:

```html
<a href="{{confirm_link}}">Confirm Attendance</a>
```

### 4. Create a response template (for learner confirmations)

Create another EmailJS template that sends to `{{to_email}}` and includes:

- `{{learner_email}}`
- `{{location}}`
- `{{response_status}}`
- `{{response_time}}`

### 5. Add your EmailJS IDs to files

Edit the `EMAILJS_CONFIG` object in `sender.html` and replace placeholders:

- `publicKey`
- `serviceId`
- `templateId`

Edit `EMAILJS_RESPONSE_CONFIG` in `confirm-attendance.html`:

- `responseTemplateId`

Use a different template ID than the reminder template.

### 6. Test in app

1. Log in with a verified account.
2. Go to `sender.html`.
3. Select learners, enter location, click **Send Reminder**.
4. Open one reminder email and click the confirmation link.

## Confirmation Link Hardening (Current)

- Confirmation links now carry encoded payload data with an expiration window.
- Expired or malformed confirmation links are rejected on the confirmation page.
- Duplicate responses from the same device are blocked per reminder token.

Note: This improves safety but is not full anti-forgery protection. Full trust-level protection requires a backend-issued signed token or server-side verification.

## Optional Firebase Functions Path

If you later upgrade to Blaze, the repository also contains a Firebase Functions + Gmail SMTP option under `functions/`.
